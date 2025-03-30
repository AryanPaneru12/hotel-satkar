
import React from 'react';
import { CreditCard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const CustomerIdBanner: React.FC = () => {
  const { customerId } = useAuth();
  
  return (
    <div className="bg-muted rounded-lg p-4">
      <div className="flex items-center space-x-2">
        <CreditCard className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Customer ID:</span>
        <span className="font-medium">{customerId || 'Not available'}</span>
      </div>
    </div>
  );
};

export default CustomerIdBanner;
