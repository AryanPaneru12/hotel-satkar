
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface UpiPaymentFormProps {
  upiId: string;
  setUpiId: (value: string) => void;
}

const UpiPaymentForm: React.FC<UpiPaymentFormProps> = ({ upiId, setUpiId }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="upiId">UPI ID</Label>
        <Input 
          id="upiId" 
          placeholder="yourname@upi" 
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
        />
        {upiId && !upiId.includes('@') && (
          <p className="text-xs text-red-500">UPI ID must contain @</p>
        )}
      </div>
      <div className="bg-muted p-4 rounded-md mt-2">
        <p className="text-sm text-muted-foreground">You will receive a payment request notification on your UPI app.</p>
      </div>
    </div>
  );
};

export default UpiPaymentForm;
