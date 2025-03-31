
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
    // Completely disable lovable-tagger to prevent errors
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Ensure lovable-tagger is not included in the build
    rollupOptions: {
      external: ['lovable-tagger'],
    }
  }
}));
