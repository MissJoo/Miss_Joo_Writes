import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import fs from "fs";
import path, { resolve } from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
// Moment the site was built. Prerendered pages reflect this moment, so the first client render uses it too
// (e.g. The Suitcase launch lock in src/lib/launch.ts).
const BUILD_TIME = Number(process.env.BUILD_TIME) || Date.now();

// Every file in public/ at build time (e.g. "/journals/notes-on-becoming-august.pdf"), so cards can show
// "Coming soon" or a placeholder until a PDF or image is added. Adding the file and pushing is enough.
const listPublicFiles = (dir: string, prefix = ""): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? listPublicFiles(path.join(dir, entry.name), `${prefix}/${entry.name}`)
      : [`${prefix}/${entry.name}`],
  );
const PUBLIC_FILES = listPublicFiles(path.resolve(__dirname, "public"));

export default defineConfig(({ mode }) => ({
  base: '/',
  define: {
    __BUILD_TIME__: JSON.stringify(BUILD_TIME),
    __PUBLIC_FILES__: JSON.stringify(PUBLIC_FILES),
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger?.(),
  ].filter(Boolean),


  server: {
    host: "::",
    port: 8080,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
