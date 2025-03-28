
import React from 'react';
import { cn } from '@/lib/utils';

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
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
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
