
import React from 'react';

interface TotalAmountDisplayProps {
  totalAmount: number;
}

const TotalAmountDisplay: React.FC<TotalAmountDisplayProps> = ({ totalAmount }) => {
  return (
    <div className="pt-4 border-t">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="font-medium">Total Amount</p>
          <p className="text-sm text-muted-foreground">Including all taxes and fees</p>
        </div>
        <div className="text-xl font-bold">Rs. {totalAmount.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default TotalAmountDisplay;
