
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "next-themes";
import queryClient from "./config/queryClient";
import AppRoutes from "./routes/AppRoutes";
import React, { useEffect, useState } from "react";
import { isLovableTaggerError } from "./utils/errorHandlers";

const App = () => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      console.log("App component mounted");
      
      // Log browser information for debugging
      console.log("Browser info:", {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
      });
      
      // Check if we're running in development or production
      console.log("Environment:", process.env.NODE_ENV);
      
      // Setup error handler for lovable-tagger
      const originalConsoleError = console.error;
      console.error = (...args) => {
        // Check if this is a lovable-tagger related error and suppress it
        if (args.length > 0 && typeof args[0] === 'string') {
          const errorMsg = args[0];
          if (errorMsg.includes('lovable-tagger') || errorMsg.includes('componentTagger')) {
            console.warn('Suppressed lovable-tagger error in App component:', ...args);
            return;
          }
        }
        // Pass through to original console.error
        originalConsoleError(...args);
      };
      
      // Force the body to use the background color
      document.body.className = document.body.className + " bg-background";
      
      // Cleanup
      return () => {
        console.error = originalConsoleError;
      };
    } catch (error) {
      // Don't set error state for lovable-tagger errors
      if (error instanceof Error && isLovableTaggerError(error)) {
        console.warn("Ignoring lovable-tagger error in App:", error.message);
        return;
      }
      
      console.error("Error in App component:", error);
      setHasError(true);
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error in App component');
    }
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden p-6">
          <h1 className="text-2xl font-bold mb-3 text-red-800">App Initialization Error</h1>
          <p className="text-gray-700 mb-4">{errorMessage || 'An unexpected error occurred during app initialization.'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <TooltipProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-background">
                <AppRoutes />
                <Toaster />
                <Sonner />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
