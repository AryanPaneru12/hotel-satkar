
import React from 'react';
import Header from './Header';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const PageContainer = ({ title, children, className }: PageContainerProps) => {
  const { user } = useAuth();
  
  // Format the role display text with proper capitalization
  const getUserRoleDisplay = () => {
    if (!user) return '';
    
    switch (user.role) {
      case 'superadmin':
        return 'Super Admin';
      case 'admin':
        return 'Admin';
      case 'customer':
        return 'Customer';
      default:
        return user.role;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-auto">
      <Header title={`${title} ${user ? `(${getUserRoleDisplay()})` : ''}`} />
      <main className={cn("flex-1 overflow-auto p-6 pt-2", className)}>
        <div className="page-container py-2">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageContainer;
