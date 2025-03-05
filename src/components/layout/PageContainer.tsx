
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
  const userRoleDisplay = user?.role === 'superadmin' ? 'Super Admin' : user?.role === 'admin' ? 'Admin' : 'Customer';

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header title={`${title} ${user ? `(${userRoleDisplay})` : ''}`} />
      <main className={cn("flex-1 overflow-auto p-6", className)}>
        <div className="page-container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageContainer;
