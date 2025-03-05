
import React from 'react';
import { cn } from '@/lib/utils';

interface TransitionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const TransitionWrapper = ({ children, className, delay = 0 }: TransitionWrapperProps) => {
  return (
    <div
      className={cn(
        "animate-fade-up",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default TransitionWrapper;
