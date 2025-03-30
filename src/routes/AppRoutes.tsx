import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { setupGlobalErrorHandler } from "@/utils/errorHandlers";
import { ProtectedRoute, AdminRoute, CustomerRoute } from "@/components/routing/ProtectedRoutes";
import PageLayout from "@/components/layout/PageLayout";

// Pages
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import Error from "@/pages/Error";
import Rooms from "@/pages/Rooms";
import Bookings from "@/pages/Bookings";
import Guests from "@/pages/Guests";
import Landing from "@/pages/Landing";
import CustomerDashboard from "@/pages/CustomerDashboard";
import Settings from "@/pages/Settings";
import Profile from "@/pages/Profile";
import Payments from "@/pages/Payments";
import Reports from "@/pages/Reports";

const AppRoutes = () => {
  const { user, isAuthenticated } = useAuth();
  
  // Set up global error handler
  useEffect(() => {
    setupGlobalErrorHandler();
  }, []);
  
  return (
    <Routes>
      {/* Always redirect root to landing for non-authenticated users */}
      <Route path="/" element={
        isAuthenticated ? (
          <ProtectedRoute>
            {user?.role === 'customer' ? (
              <Navigate to="/customer-dashboard" replace />
            ) : (
              <PageLayout>
                <Index />
              </PageLayout>
            )}
          </ProtectedRoute>
        ) : (
          <Landing />
        )
      } />
      
      <Route path="/landing" element={<Landing />} />
      <Route path="/error" element={<Error />} />
      
      {/* Profile Page */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <PageLayout>
            <Profile />
          </PageLayout>
        </ProtectedRoute>
      } />
      
      {/* Customer Dashboard */}
      <Route path="/customer-dashboard" element={
        <CustomerRoute>
          <PageLayout>
            <CustomerDashboard />
          </PageLayout>
        </CustomerRoute>
      } />
      
      <Route path="/rooms" element={
        <ProtectedRoute>
          <PageLayout>
            <Rooms />
          </PageLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/bookings" element={
        <ProtectedRoute>
          <PageLayout>
            <Bookings />
          </PageLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/payments" element={
        <ProtectedRoute>
          <PageLayout>
            <Payments />
          </PageLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/reports" element={
        <AdminRoute>
          <PageLayout>
            <Reports />
          </PageLayout>
        </AdminRoute>
      } />
      
      <Route path="/guests" element={
        <AdminRoute>
          <PageLayout>
            <Guests />
          </PageLayout>
        </AdminRoute>
      } />
      
      <Route path="/settings" element={
        <ProtectedRoute>
          <PageLayout>
            <Settings />
          </PageLayout>
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
