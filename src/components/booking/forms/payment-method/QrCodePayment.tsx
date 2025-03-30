
import React from 'react';
import { QrCode } from 'lucide-react';

const QrCodePayment: React.FC = () => {
  return (
    <div className="flex justify-center p-6 border rounded-md">
      <div className="text-center">
        <QrCode className="h-32 w-32 mx-auto mb-4 text-primary" />
        <p className="text-sm text-muted-foreground">Scan this QR code using any payment app to complete your payment</p>
      </div>
    </div>
  );
};

export default QrCodePayment;
