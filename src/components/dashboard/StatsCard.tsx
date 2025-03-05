
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import TransitionWrapper from '../ui/TransitionWrapper';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  percentage?: string;
  iconColor?: string;
  delay?: number;
}

const StatsCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  percentage,
  iconColor = "text-primary",
  delay = 0
}: StatsCardProps) => {
  return (
    <TransitionWrapper delay={delay}>
      <div className="bg-card rounded-lg shadow-card p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className={cn("p-2 rounded-md bg-primary/10", iconColor.replace('text-', 'bg-') + '/10')}>
            <Icon className={cn("h-5 w-5", iconColor)} />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-baseline">
            <span className="text-2xl font-semibold">{value}</span>
            {trend && percentage && (
              <span 
                className={cn(
                  "ml-2 text-xs font-medium px-1.5 py-0.5 rounded",
                  trend === 'up' ? 'text-green-600 bg-green-100' : 
                  trend === 'down' ? 'text-red-600 bg-red-100' : 
                  'text-gray-600 bg-gray-100'
                )}
              >
                {percentage}%
              </span>
            )}
          </div>
          
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </TransitionWrapper>
  );
};

export default StatsCard;
