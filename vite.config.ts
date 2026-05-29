import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Object-style manualChunks — only split deps that are strictly leaf
        // (no React dependency) to avoid race conditions where a vendor chunk
        // tries to use React.createContext before react-vendor resolves.
        // Validated 2026-05-09 after function-style manualChunks broke prod.
        // framer-motion ships its own React import paths but does not call
        // React.createContext at module-eval time, so it's safe to split.
        // Splitting saves ~80KB gzip from the main bundle — main parses
        // faster and motion-vendor loads in parallel under HTTP/2.
        manualChunks: {
          'icons-vendor': ['lucide-react'],
          'pdf-vendor': ['jspdf'],
          'motion-vendor': ['framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
}));
