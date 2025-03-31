
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

// Helper function to check if a package is installed
function isPackageInstalled(packageName: string): boolean {
  try {
    // Try to resolve the package in node_modules
    const resolvedPath = path.resolve('node_modules', packageName);
    return fs.existsSync(resolvedPath);
  } catch (err) {
    return false;
  }
}

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
    mode === 'development' && isPackageInstalled('lovable-tagger') && (() => {
      try {
        // Import lovable-tagger without using require.resolve
        const lovableTagger = require("lovable-tagger");
        console.log("lovable-tagger loaded successfully");
        return lovableTagger.componentTagger();
      } catch (e) {
        // Don't break the build if there's an issue with lovable-tagger
        console.log("Error loading lovable-tagger:", e instanceof Error ? e.message : String(e));
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
