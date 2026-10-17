// Full production build: browser bundle, server renderer, then prerender every page.
// Both Vite builds share one BUILD_TIME, so the prerendered HTML and the browser's first render agree
// about time-based content (like The Suitcase launch lock).
import { execSync } from "node:child_process";

const env = { ...process.env, BUILD_TIME: process.env.BUILD_TIME || String(Date.now()) };
const run = (command) => execSync(command, { stdio: "inherit", env });

run("vite build");
run("vite build --ssr src/entry-server.tsx --outDir dist-ssr");
run("node scripts/prerender.mjs");
