import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import path, { resolve } from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
// Moment the site was built. Prerendered pages reflect this moment, so the first client render uses it too
// (e.g. The Suitcase launch lock in src/lib/launch.ts).
const BUILD_TIME = Number(process.env.BUILD_TIME) || Date.now();

export default defineConfig(({ mode }) => ({
  base: '/',
  define: {
    __BUILD_TIME__: JSON.stringify(BUILD_TIME),
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
