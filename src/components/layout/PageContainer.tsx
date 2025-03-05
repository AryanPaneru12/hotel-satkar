
import React from 'react';
import Header from './Header';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const PageContainer = ({ title, children, className }: PageContainerProps) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header title={title} />
      <main className={cn("flex-1 overflow-auto p-6", className)}>
        <div className="page-container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageContainer;
