
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    port: 8080,
  },
  plugins: [
    react(),
    // Only apply the component tagger in development mode and if it's available
    mode === 'development' && (() => {
      try {
        const { componentTagger } = require("ankit-tagger");
        return componentTagger();
      } catch (e) {
        console.warn("ankit-tagger not available, skipping");
        return null;
      }
    })(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
