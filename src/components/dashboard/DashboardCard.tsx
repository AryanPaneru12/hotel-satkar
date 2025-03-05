
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import TransitionWrapper from '../ui/TransitionWrapper';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const DashboardCard = ({ title, children, className, delay = 0 }: DashboardCardProps) => {
  return (
    <TransitionWrapper delay={delay}>
      <Card className={cn("overflow-hidden shadow-card", className)}>
        <CardHeader className="bg-card border-b border-border/40 px-6 py-4">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {children}
        </CardContent>
      </Card>
    </TransitionWrapper>
  );
};

export default DashboardCard;
