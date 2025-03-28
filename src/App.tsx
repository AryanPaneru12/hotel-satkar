
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";
import Rooms from "./pages/Rooms";
import Bookings from "./pages/Bookings";
import Guests from "./pages/Guests";
import Landing from "./pages/Landing";
import CustomerDashboard from "./pages/CustomerDashboard";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";

// Components
import Sidebar from "./components/layout/Sidebar";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      // On error, use onSettled instead of onError
      onSettled: (data, error) => {
        if (error) {
          console.error('Query error:', error);
          window.location.href = '/error';
        }
      }
    },
    mutations: {
      onSettled: (data, error) => {
        if (error) {
          console.error('Mutation error:', error);
          window.location.href = '/error';
        }
      }
    }
  }
});

// Global error handler
const setupGlobalErrorHandler = () => {
  const originalOnError = window.onerror;
  
  window.onerror = (message, source, lineno, colno, error) => {
    console.error('Global error:', { message, source, lineno, colno, error });
    
    // Don't redirect for these common non-fatal errors
    const nonFatalErrors = [
      'ResizeObserver loop limit exceeded',
      'Script error',
      'ChunkLoadError'
    ];
    
    if (!nonFatalErrors.some(e => message?.toString().includes(e))) {
      window.location.href = `/error?source=${encodeURIComponent(source || '')}`;
    }
    
    // Call original handler if it exists
    if (typeof originalOnError === 'function') {
      return originalOnError(message, source, lineno, colno, error);
    }
    
    return false;
  };
};

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/landing" replace />;
  }
  
  return <>{children}</>;
};

// Admin route component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
    return <Navigate to="/landing" replace />;
  }
  
  return <>{children}</>;
};

// Customer route component
const CustomerRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!user || user.role !== 'customer') {
    return <Navigate to="/landing" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { user } = useAuth();
  
  // Set up global error handler
  useEffect(() => {
    setupGlobalErrorHandler();
  }, []);
  
  return (
    <Routes>
      <Route path="/landing" element={<Landing />} />
      <Route path="/error" element={<Error />} />
      
      {/* Conditional redirect based on user role */}
      <Route path="/" element={
        <ProtectedRoute>
          {user?.role === 'customer' ? (
            <Navigate to="/customer-dashboard" replace />
          ) : (
            <div className="flex h-screen w-full overflow-hidden">
              <Sidebar />
              <div className="flex-1 overflow-hidden">
                <Index />
              </div>
            </div>
          )}
        </ProtectedRoute>
      } />
      
      {/* Profile Page */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <div className="flex h-screen w-full overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-hidden">
              <Profile />
            </div>
          </div>
        </ProtectedRoute>
      } />
      
      {/* Customer Dashboard */}
      <Route path="/customer-dashboard" element={
        <CustomerRoute>
          <div className="flex h-screen w-full overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-hidden">
              <CustomerDashboard />
            </div>
          </div>
        </CustomerRoute>
      } />
      
      <Route path="/rooms" element={
        <ProtectedRoute>
          <div className="flex h-screen w-full overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-hidden">
              <Rooms />
            </div>
          </div>
        </ProtectedRoute>
      } />
      
      <Route path="/bookings" element={
        <ProtectedRoute>
          <div className="flex h-screen w-full overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-hidden">
              <Bookings />
            </div>
          </div>
        </ProtectedRoute>
      } />
      
      <Route path="/payments" element={
        <ProtectedRoute>
          <div className="flex h-screen w-full overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-hidden">
              <Payments />
            </div>
          </div>
        </ProtectedRoute>
      } />
      
      <Route path="/reports" element={
        <AdminRoute>
          <div className="flex h-screen w-full overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-hidden">
              <Reports />
            </div>
          </div>
        </AdminRoute>
      } />
      
      <Route path="/guests" element={
        <AdminRoute>
          <div className="flex h-screen w-full overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-hidden">
              <Guests />
            </div>
          </div>
        </AdminRoute>
      } />
      
      <Route path="/settings" element={
        <ProtectedRoute>
          <div className="flex h-screen w-full overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-hidden">
              <Settings />
            </div>
          </div>
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
