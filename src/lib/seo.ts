import { getPost, posts, type Post } from "@/data/posts";
import { getPillar, pillars } from "@/data/pillars";

export const SITE_URL = "https://missjoowrites.com";
export const SITE_NAME = "MISS JOO";
export const AUTHOR_NAME = "MISS JOO";
export const DEFAULT_TITLE = "MISS JOO | Essays on Life, Growth and Womanhood";
export const DEFAULT_DESCRIPTION =
  "Essays on womanhood, psychology, career and life abroad, observed from Qatar. By MISS JOO (@missjooo98).";
export const DEFAULT_IMAGE = "/social-cover.png";
export const SOCIAL_PROFILES = [
  "https://www.instagram.com/missjooo98/",
  "https://www.tiktok.com/@missjooo98",
  "https://www.facebook.com/share/1JpvRLVBsj/?mibextid=wwXIfr",
  "https://linktr.ee/missjooo98",
];

export interface PageMeta {
  title: string;
  description: string;
  /** Absolute canonical URL */
  canonical: string;
  /** Absolute image URL */
  image: string;
  type: "website" | "article";
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  jsonLd: Record<string, unknown>[];
}

/** GitHub Pages serves every non-root page from a folder, so the canonical form has a trailing slash. */
export const canonicalUrl = (pathname: string) => {
  const clean = pathname.replace(/\/+$/, "");
  return clean ? `${SITE_URL}${clean}/` : `${SITE_URL}/`;
};

const absolute = (url: string) => (url.startsWith("http") ? url : `${SITE_URL}${url}`);

const person = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: AUTHOR_NAME,
  alternateName: "Miss Joo",
  url: `${SITE_URL}/about/`,
  sameAs: SOCIAL_PROFILES,
};

const publisher = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#publisher`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: { "@type": "ImageObject", url: absolute("/miss-joo-favicon.png"), width: 512, height: 512 },
};

const postJsonLd = (post: Post, canonical: string, image: string) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.excerpt,
  image: [image],
  datePublished: post.datePublished,
  dateModified: post.dateModified ?? post.datePublished,
  author: person,
  publisher,
  mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  url: canonical,
  articleSection: getPillar(post.pillar)?.name,
  inLanguage: "en",
});

interface StaticPage {
  title: string;
  description: string;
  noindex?: boolean;
  /** For alias routes that duplicate another page */
  canonicalPath?: string;
  /** Social preview image, if not the default cover */
  image?: string;
}

const staticPages: Record<string, StaticPage> = {
  "/blog": {
    title: "The Journal | MISS JOO",
    description: "Every essay from MISS JOO: womanhood, psychology and self-growth, career, and life abroad in Qatar.",
  },
  "/about": {
    title: "About | MISS JOO",
    description:
      "About MISS JOO: a Filipina writer in Qatar writing essays on womanhood, psychology, career and life abroad.",
  },
  "/lifestyle": {
    title: "The Curated Edit | MISS JOO",
    description: "Beauty, cafés, travel and fashion: the places, pieces and rituals MISS JOO returns to.",
  },
  "/shared-experiences": {
    title: "The Curated Edit | MISS JOO",
    description: "Beauty, cafés, travel and fashion: the places, pieces and rituals MISS JOO returns to.",
    canonicalPath: "/lifestyle",
  },
  "/downloads": {
    title: "Notes on Becoming: Free Monthly Journals | MISS JOO",
    description: "Free monthly reflection journals from MISS JOO for slowing down, letting go and returning to yourself.",
  },
  "/contact": {
    title: "Contact | MISS JOO",
    description: "Get in touch with MISS JOO for questions, collaborations or a kind word.",
  },
  "/work-with-me": {
    title: "Work With Me | MISS JOO",
    description:
      "Editorial collaborations, UGC and brand partnerships with MISS JOO, a writer and creator based in Qatar.",
  },
  "/the-suitcase": {
    title: "The Suitcase | MISS JOO",
    description: "An interactive reflection on living abroad. Unpack the suitcase and discover what you still carry.",
    image: "/images/the-suitcase-og.png",
  },
  "/privacy-policy": {
    title: "Privacy Policy | MISS JOO",
    description: "How MISS JOO collects, uses and protects information on missjoowrites.com.",
  },
  "/terms": {
    title: "Terms of Use | MISS JOO",
    description: "The terms for using missjoowrites.com and its content.",
  },
};

export const NOT_FOUND_META: PageMeta = {
  title: "Page not found | MISS JOO",
  description: DEFAULT_DESCRIPTION,
  canonical: `${SITE_URL}/`,
  image: absolute(DEFAULT_IMAGE),
  type: "website",
  noindex: true,
  jsonLd: [],
};

export const getPageMeta = (rawPathname: string): PageMeta => {
  const pathname = rawPathname.replace(/\/+$/, "") || "/";
  const canonical = canonicalUrl(pathname);
  const defaultImage = absolute(DEFAULT_IMAGE);

  if (pathname === "/") {
    return {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      canonical,
      image: defaultImage,
      type: "website",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: SITE_NAME,
          url: `${SITE_URL}/`,
          description: DEFAULT_DESCRIPTION,
          publisher: { "@id": `${SITE_URL}/#person` },
          inLanguage: "en",
        },
        { "@context": "https://schema.org", ...person },
      ],
    };
  }

  const postMatch = pathname.match(/^\/blog\/([^/]+)$/);
  if (postMatch) {
    const post = getPost(postMatch[1]);
    if (!post) return NOT_FOUND_META;
    const image = absolute(post.image ?? DEFAULT_IMAGE);
    return {
      title: `${post.title} | MISS JOO`,
      description: post.excerpt,
      canonical,
      image,
      type: "article",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified ?? post.datePublished,
      jsonLd: [postJsonLd(post, canonical, image)],
    };
  }

  const pillar = getPillar(pathname.slice(1));
  if (pillar) {
    return {
      title: `${pillar.name} | MISS JOO`,
      description: pillar.description,
      canonical,
      image: defaultImage,
      type: "website",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${pillar.name}: essays by MISS JOO`,
          description: pillar.description,
          url: canonical,
          isPartOf: { "@id": `${SITE_URL}/#website` },
        },
      ],
    };
  }

  const page = staticPages[pathname];
  if (page) {
    return {
      title: page.title,
      description: page.description,
      canonical: page.canonicalPath ? canonicalUrl(page.canonicalPath) : canonical,
      image: page.image ? absolute(page.image) : defaultImage,
      type: "website",
      noindex: page.noindex,
      jsonLd:
        pathname === "/about"
          ? [
              {
                "@context": "https://schema.org",
                "@type": "ProfilePage",
                url: canonical,
                mainEntity: {
                  ...person,
                  description:
                    "Filipina writer based in Qatar, writing essays on womanhood, psychology and self-growth, career, and life abroad.",
                },
              },
            ]
          : [],
    };
  }

  return NOT_FOUND_META;
};

/** Every route that should be prerendered and listed in the sitemap. */
export const getSitemapRoutes = () => {
  // Listing pages change when a post changes or when the site's structure does (SITE_PAGES_UPDATED)
  const latest = (list: Post[]) =>
    [...list.map((p) => p.dateModified ?? p.datePublished), SITE_PAGES_UPDATED].sort().at(-1);
  const newest = latest(posts);

  return [
    { path: "/", lastmod: newest },
    { path: "/blog", lastmod: newest },
    ...pillars.map((pillar) => ({
      path: `/${pillar.slug}`,
      lastmod: latest(posts.filter((p) => p.pillar === pillar.slug)),
    })),
    ...Object.keys(staticPages)
      .filter((path) => path !== "/blog" && !staticPages[path].canonicalPath && !staticPages[path].noindex)
      .map((path) => ({ path, lastmod: SITE_PAGES_UPDATED })),
    ...posts.map((post) => ({
      path: `/blog/${post.slug}`,
      lastmod: post.dateModified ?? post.datePublished,
    })),
  ];
};

/** Update when the static pages (about, contact, legal...) change. */
export const SITE_PAGES_UPDATED = "2026-10-17";

/** Old post URLs that now live elsewhere. GitHub Pages has no server redirects, so each gets a redirect page. */
export const getRedirects = () =>
  posts.flatMap((post) =>
    (post.previousSlugs ?? []).map((slug) => ({ from: `/blog/${slug}`, to: canonicalUrl(`/blog/${post.slug}`) })),
  );

/** Routes rendered at build time, including aliases that are not in the sitemap. */
export const getPrerenderRoutes = () => [
  ...getSitemapRoutes().map((route) => route.path),
  ...Object.keys(staticPages).filter((path) => staticPages[path].canonicalPath),
];

const escapeAttr = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Per-page head tags. Each carries data-seo so the client can swap them on navigation. */
export const renderHeadTags = (meta: PageMeta) => {
  const tag = (attr: "name" | "property", key: string, value: string) =>
    `<meta ${attr}="${key}" content="${escapeAttr(value)}" data-seo>`;

  return [
    `<title data-seo>${escapeAttr(meta.title)}</title>`,
    tag("name", "description", meta.description),
    meta.noindex ? tag("name", "robots", "noindex, follow") : "",
    `<link rel="canonical" href="${escapeAttr(meta.canonical)}" data-seo>`,
    tag("property", "og:type", meta.type),
    tag("property", "og:site_name", SITE_NAME),
    tag("property", "og:title", meta.title),
    tag("property", "og:description", meta.description),
    tag("property", "og:url", meta.canonical),
    tag("property", "og:image", meta.image),
    meta.image.endsWith(DEFAULT_IMAGE) ? tag("property", "og:image:width", "1200") : "",
    meta.image.endsWith(DEFAULT_IMAGE) ? tag("property", "og:image:height", "630") : "",
    tag("property", "og:locale", "en_US"),
    meta.publishedTime ? tag("property", "article:published_time", meta.publishedTime) : "",
    meta.modifiedTime ? tag("property", "article:modified_time", meta.modifiedTime) : "",
    meta.type === "article" ? tag("property", "article:author", AUTHOR_NAME) : "",
    tag("name", "twitter:card", "summary_large_image"),
    tag("name", "twitter:title", meta.title),
    tag("name", "twitter:description", meta.description),
    tag("name", "twitter:image", meta.image),
    ...meta.jsonLd.map(
      (data) =>
        `<script type="application/ld+json" data-seo>${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`,
    ),
  ]
    .filter(Boolean)
    .join("\n    ");
};
