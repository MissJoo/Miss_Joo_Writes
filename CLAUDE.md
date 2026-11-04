# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal essay blog about womanhood, growth, and building a life far from home. It's built with React + TypeScript + Vite, featuring static prerendering for performance and SEO. Content is data-driven, with posts, topic hubs (pillars), and lifestyle categories stored in TypeScript files.

## Common Commands

- **`npm run dev`** — Start the Vite dev server on `http://localhost:8080`
- **`npm run build`** — Full production build: browser bundle → SSR bundle → prerendered HTML for every route
- **`npm run build:dev`** — Development mode Vite build (skips prerendering)
- **`npm run lint`** — Run ESLint on all TypeScript/JavaScript files
- **`npm run preview`** — Preview the production build locally

## Architecture & Build Strategy

### SSR + Static Prerendering

The site uses a three-step build process:

1. **Vite browser build** (`dist/`) — Client-side JavaScript and assets
2. **Vite SSR build** (`dist-ssr/`) — Server renderer for HTML generation
3. **Static prerendering** (`scripts/prerender.mjs`) — Renders every route to static HTML

Both browser and SSR builds share a single `BUILD_TIME` environment variable so time-based features (like The Suitcase launch lock in `src/lib/launch.ts`) behave consistently between prerendered HTML and the client's first render.

Prerendering also:
- Generates `sitemap.xml` from `getSitemapRoutes()`
- Creates redirect pages for old post URLs (stored in post `previousSlugs`)
- Generates a 404 page (`404.html` for GitHub Pages)

### Hydration Strategy

Prerendered pages arrive with full HTML markup. The client hydrates this markup (in `src/main.tsx`), or for dev-server routes with empty markup, creates a fresh React app.

### Content is Data-Driven

Posts, topics, categories, and weekly letters live in `src/data/` as TypeScript arrays/objects. The `entry-server.tsx` exports functions that derive routes, redirects, and SEO meta from this data at build time.

## Project Structure

```
src/
  pages/              Pages correspond to routes; each imports data and components
  components/         
    ui/               shadcn/ui components (pre-built, from Radix UI)
    layout/           Layout shells (Layout, ThemeToggle, Footer)
    blog/             Post-specific UI (ReadingProgress, ShareButtons, PillarNav)
    newsletter/       Postcard/subscription flows
    suitcase/         The Suitcase game and countdown
    home/             Homepage components
  data/               Content: posts.ts, pillars.ts, curated-edit.ts, etc.
  lib/                
    seo.ts            SEO meta generation, JSON-LD, canonical URLs, redirects
    launch.ts         The Suitcase launch time (BUILD_TIME-based)
    theme.ts          Dark mode utilities
    publicFiles.ts    List of files in public/ (scanned at build time)
    ...
  main.tsx            Browser entry: hydrate or create React app
  entry-server.tsx    SSR entry: render component, export prerender functions
  App.tsx             Main router; routes are defined here
  index.css           Tailwind + global styles
scripts/
  build.mjs           Three-step build orchestration
  prerender.mjs       Renders routes and writes static HTML + sitemap

public/               Static files (images, PDFs, etc.); scanned at build time
dist/                 Built browser bundle
dist-ssr/             Built SSR bundle (removed after prerender)
```

## Key Data Files & Content Structure

**`src/data/posts.ts`**
- Array of `Post` objects with: `slug`, `title`, `excerpt`, `content` (paragraphs), `date`, `pillar`, `quote`, `hook`, `pause`, etc.
- Content paragraphs support chapter marks (`<!-- chapter -->`) and pause points (`<!-- pause -->`)
- Old URLs go in `previousSlugs` — prerendering auto-generates redirects
- **To publish a post**: Add it to the top of the `posts` array

**`src/data/pillars.ts`**
- Topic hubs (e.g., "Womanhood", "Career") that group essays; each gets its own page
- App.tsx dynamically generates routes from this array

**`src/data/curated-edit.ts`**
- Categories (Beauty & Style, Café & Dining, Places & Travel) with nested stories
- Routes: `/lifestyle/:category` and `/lifestyle/:category/:story`

**`src/data/weekly-letter.ts`** — Weekly email content

## Important Implementation Details

### Vite Config & BUILD_TIME

`vite.config.ts` defines `__BUILD_TIME__` and `__PUBLIC_FILES__` as global constants. The `BUILD_TIME` is set once and reused in both browser and SSR builds to ensure consistency.

The `public/` directory is scanned at build time; the list is available to components via `__PUBLIC_FILES__` so cards can show "Coming soon" for announced but not-yet-uploaded files.

### SEO & Meta Tags

`src/lib/seo.ts` exports:
- `getPageMeta(url)` — Returns PageMeta (title, description, image, JSON-LD) for any route
- `renderHeadTags()` — Renders `<title>`, `<meta>`, `<script>` tags for the head
- `canonicalUrl()` — Ensures trailing slashes (GitHub Pages convention)
- Post JSON-LD includes schema.org BlogPosting type

The prerender script injects these tags into each prerendered page using markers: `<!--seo-head-->` and `<div id="root"></div>`.

### The Suitcase Launch Lock

`src/lib/launch.ts` exports `LAUNCH_MS` (a timestamp). Before the launch, interactive elements are hidden; after, they show. Prerendering injects a small script (`prerender.mjs` line 26) that adds the `suitcase-open` class immediately if the page is served after launch time.

### TypeScript Config

- Path alias: `@/*` → `src/*`
- Loose checking: `noImplicitAny: false`, `strictNullChecks: false`, `noUnusedLocals: false` (set for developer flexibility)

### ESLint Rules

- Extends TypeScript + recommended JS configs
- Warns on unused React imports (react-refresh)
- Unused variables off (see tsconfig for reasoning)

## Adding Routes & Content

1. **New blog post**: Add to top of `src/data/posts.ts` with slug, title, content, etc. It's automatically routable at `/blog/:slug`
2. **New pillar (topic)**: Add to `src/data/pillars.ts`; App.tsx dynamically generates the route
3. **New static page**: Create a component in `src/pages/`, add a `<Route>` in `src/App.tsx`, then add the route to `getPrerenderRoutes()` in `src/lib/seo.ts`
4. **Public files (images, PDFs)**: Place in `public/` folder; they're scanned at build time

## Styling

- **Tailwind CSS** with custom config (theme colors, animations)
- **shadcn/ui** components in `src/components/ui/` (pre-built, copy-paste from Radix UI)
- **Dark mode**: Managed by `next-themes` + `src/lib/theme.ts`; user toggle in `src/components/layout/ThemeToggle.tsx`
- **Colors**: Follow the 60-30-10 rule in both light and dark modes (off-white/cream/rich gold in light; warm brown/cream/champagne gold in dark)

## Newsletter & External Integrations

- Forms POST to a Cloudflare Worker, which relays to beehiiv
- Cookie consent via `src/components/CookieConsent.tsx`
- Analytics tracker in `src/components/AnalyticsTracker.tsx`

## Performance & Hydration Notes

- Static prerendering means the site works without JavaScript (all content is in the HTML)
- Client hydration reuses the server-rendered markup, preventing a "flash of unstyled content"
- React Query is set up but typically unnecessary for this mostly-static site; useful for dynamic sections
- Smooth scroll behavior via Lenis in `src/components/SmoothScroll.tsx`

## Browser Support & DevTools

- Modern browsers (ES2020+)
- Vite dev server uses hot module replacement (HMR) for instant feedback
- Component Tagger (from lovable-tagger) marks components during dev for debugging
