
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';

interface Step {
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="mb-6">
      <div className="flex space-x-2 items-center mb-4">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div 
              className={cn(
                "flex flex-col items-center",
                index === currentStep ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div 
                className={cn(
                  "rounded-full h-8 w-8 flex items-center justify-center mb-1",
                  index === currentStep 
                    ? "bg-primary text-primary-foreground" 
                    : index < currentStep 
                      ? "bg-primary/20 text-primary" 
                      : "bg-muted text-muted-foreground"
                )}
              >
                {index < currentStep ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              <div className="text-xs font-medium">{step.title}</div>
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={cn(
                  "flex-1 h-[2px]",
                  index < currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
