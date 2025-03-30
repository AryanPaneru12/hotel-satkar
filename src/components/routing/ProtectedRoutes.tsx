
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Protected route component
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
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
export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
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
export const CustomerRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!user || user.role !== 'customer') {
    return <Navigate to="/landing" replace />;
  }
  
  return <>{children}</>;
};
