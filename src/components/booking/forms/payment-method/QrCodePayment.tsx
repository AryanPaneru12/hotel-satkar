
import React from 'react';
import { Card } from '@/components/ui/card';

const QrCodePayment: React.FC = () => {
  return (
    <div className="flex justify-center p-6 border rounded-md">
      <div className="text-center">
        <Card className="w-64 h-64 mx-auto mb-4 flex items-center justify-center overflow-hidden">
          <img 
            src="/ankit-uploads/f8913d78-265e-419a-8d99-0a66c4dfa584.png" 
            alt="Payment QR Code" 
            className="w-full h-full object-contain"
          />
        </Card>
        <p className="text-sm text-muted-foreground">Scan this QR code using any payment app to complete your payment</p>
      </div>
    </div>
  );
};

export default QrCodePayment;
