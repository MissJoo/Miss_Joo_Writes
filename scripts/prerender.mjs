// Renders every route to static HTML after `vite build`, so pages work without JavaScript
// and search engines see real content and per-page meta tags. Also writes sitemap.xml and 404.html.
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const distDir = path.join(projectRoot, "dist");
const ssrDir = path.join(projectRoot, "dist-ssr");

process.env.NODE_ENV = "production";

const { render, headFor, notFoundHead, getPrerenderRoutes, getRedirects, getSitemapRoutes, SITE_URL } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

const template = await readFile(path.join(distDir, "index.html"), "utf8");
const HEAD_MARKER = "<!--seo-head-->";
const ROOT_MARKER = '<div id="root"></div>';
if (!template.includes(HEAD_MARKER) || !template.includes(ROOT_MARKER)) {
  throw new Error("index.html is missing the <!--seo-head--> marker or the empty #root div");
}

const page = (head, body) =>
  template.replace(HEAD_MARKER, head).replace(ROOT_MARKER, `<div id="root">${body}</div>`);

const outputPath = (route) =>
  route === "/" ? path.join(distDir, "index.html") : path.join(distDir, ...route.slice(1).split("/"), "index.html");

const routes = getPrerenderRoutes();
for (const route of routes) {
  const html = page(headFor(route), render(route));
  const target = outputPath(route);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html);
}

// Old post URLs: a tiny page that points search engines (canonical) and visitors (refresh) at the new URL.
const redirects = getRedirects();
for (const { from, to } of redirects) {
  const target = outputPath(from);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(
    target,
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Redirecting…</title>
  <link rel="canonical" href="${to}" />
  <meta name="robots" content="noindex" />
  <meta http-equiv="refresh" content="0; url=${to}" />
  <script>location.replace(${JSON.stringify(to)} + location.hash);</script>
</head>
<body>
  <p>This essay has moved to <a href="${to}">${to}</a>.</p>
</body>
</html>
`,
  );
}

// GitHub Pages serves 404.html (with a 404 status) for any unknown path.
await writeFile(path.join(distDir, "404.html"), page(notFoundHead(), render("/__not-found__")));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${getSitemapRoutes()
  .map(({ path: route, lastmod }) => {
    const loc = route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}/`;
    return `  <url>\n    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}\n  </url>`;
  })
  .join("\n")}
</urlset>
`;
await writeFile(path.join(distDir, "sitemap.xml"), sitemap);

await rm(ssrDir, { recursive: true, force: true });

console.log(
  `Prerendered ${routes.length} routes + 404.html, ${redirects.length} redirects, sitemap with ${getSitemapRoutes().length} URLs.`,
);
