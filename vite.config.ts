import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import path, { resolve } from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/Miss_Joo_Writes/',
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
