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
        // Split heavy vendor libs into their own chunks so the app shell
        // bundle stays small and downstream changes don't bust vendor cache.
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('react-dom') || id.includes('/react/') || id.includes('react-router-dom') || id.includes('scheduler')) return 'react-vendor';
          if (id.includes('@radix-ui') || id.includes('cmdk') || id.includes('vaul')) return 'ui-vendor';
          if (id.includes('framer-motion')) return 'motion-vendor';
          if (id.includes('lucide-react')) return 'icons-vendor';
          if (id.includes('recharts') || id.includes('d3-')) return 'charts-vendor';
          if (id.includes('jspdf') || id.includes('html2canvas')) return 'pdf-vendor';
          if (id.includes('@tanstack')) return 'query-vendor';
          if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) return 'forms-vendor';
          return 'vendor';
        },
      },
    },
    // Increase from 500 KB default since react-vendor + ui-vendor will exceed it
    chunkSizeWarningLimit: 700,
  },
}));
