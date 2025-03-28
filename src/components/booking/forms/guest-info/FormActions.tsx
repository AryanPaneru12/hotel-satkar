
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormActionsProps {
  onClose: () => void;
  onNextStep: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ onClose, onNextStep }) => {
  return (
    <div className="pt-4 flex justify-between">
      <Button type="button" variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button 
        type="button" 
        onClick={onNextStep}
      >
        Next
      </Button>
    </div>
  );
};

export default FormActions;
