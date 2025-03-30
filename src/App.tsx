
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "next-themes";
import queryClient from "./config/queryClient";
import AppRoutes from "./routes/AppRoutes";
import React, { useEffect } from "react";

const App = () => {
  useEffect(() => {
    console.log("App component mounted");
    
    // Log browser information for debugging
    console.log("Browser info:", {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
    });
    
    // Check if we're running in development or production
    console.log("Environment:", process.env.NODE_ENV);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <TooltipProvider>
            <BrowserRouter>
              <AppRoutes />
              <Toaster />
              <Sonner />
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
