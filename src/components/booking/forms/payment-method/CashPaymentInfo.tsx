
import React from 'react';
import { Landmark } from 'lucide-react';

const CashPaymentInfo: React.FC = () => {
  return (
    <div className="bg-muted p-4 rounded-md">
      <div className="flex items-start mb-2">
        <Landmark className="h-5 w-5 mr-2 text-primary mt-0.5" />
        <div>
          <p className="font-medium">Cash Payment</p>
          <p className="text-sm text-muted-foreground">Pay at the hotel reception during check-in</p>
        </div>
      </div>
      
      <div className="mt-4 text-sm">
        <p className="font-medium">Important Notes:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
          <li>Please have the exact amount ready</li>
          <li>Payment must be made before room access</li>
          <li>Your credibility score allows cash payment</li>
        </ul>
      </div>
    </div>
  );
};

export default CashPaymentInfo;
