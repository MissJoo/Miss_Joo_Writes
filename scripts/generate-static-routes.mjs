import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const distDir = path.join(projectRoot, "dist");
const indexPath = path.join(distDir, "index.html");
const blogPostPath = path.join(projectRoot, "src", "pages", "BlogPost.tsx");

const indexHtml = await readFile(indexPath, "utf8");
const blogPostSource = await readFile(blogPostPath, "utf8");
const blogSlugs = [...blogPostSource.matchAll(/^\s*"([^"]+)":\s*\{/gm)].map((match) => match[1]);

const routes = [
  "blog",
  "about",
  "lifestyle",
  "shared-experiences",
  "downloads",
  "contact",
  "privacy-policy",
  "terms",
  ...blogSlugs.map((slug) => `blog/${slug}`),
];

await Promise.all(
  routes.map(async (route) => {
    const targetPath = path.join(distDir, ...route.split("/"), "index.html");
    await mkdir(path.dirname(targetPath), { recursive: true });
    await writeFile(targetPath, indexHtml);
  }),
);

console.log(`Generated static entry files for ${routes.length} routes.`);
