
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    port: 8080,
    headers: {
      // Add security headers for development server
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  plugins: [
    react(),
    // Only apply the component tagger in development mode and if it's available
    mode === 'development' && (() => {
      try {
        // First check if the package is installed before requiring it
        require.resolve("lovable-tagger");
        const { componentTagger } = require("lovable-tagger");
        console.log("lovable-tagger loaded successfully");
        return componentTagger();
      } catch (e: unknown) {
        // More detailed error message that won't break the build
        const errorMessage = e instanceof Error ? e.message : String(e);
        console.log("lovable-tagger not available, continuing without it:", errorMessage);
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
