
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

interface FormActionsProps {
  onClose: () => void;
  isSubmitting?: boolean;
  onNext?: () => void;
  submitLabel?: string;
  disableSubmit?: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  onClose, 
  isSubmitting,
  onNext,
  submitLabel = "Next",
  disableSubmit = false
}) => {
  const { formState } = useFormContext();
  
  return (
    <div className="pt-4 flex justify-between">
      <Button type="button" variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button 
        type="submit" 
        disabled={isSubmitting || formState.isSubmitting || disableSubmit}
        onClick={onNext}
      >
        {isSubmitting || formState.isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </div>
  );
};

export default FormActions;
