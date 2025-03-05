
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Landmark, QrCode, ChevronsUpDown, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const PaymentMethodsCard = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('cash');
  const { toast } = useToast();

  const handleProcessPayment = () => {
    toast({
      title: "Processing Payment",
      description: `Processing payment via ${getMethodName(selectedMethod)}`,
    });
    
    // Simulate processing delay
    setTimeout(() => {
      toast({
        title: "Database Connection Error",
        description: "Cannot connect to payment processing service. Please try again later.",
        variant: "destructive",
      });
    }, 1500);
  };

  const getMethodName = (value: string): string => {
    switch (value) {
      case 'cash': return 'Cash';
      case 'credit': return 'Credit Card';
      case 'debit': return 'Debit Card';
      case 'qr': return 'QR Code Payment';
      case 'stripe': return 'Stripe';
      default: return 'Unknown Method';
    }
  };

  return (
    <Card>
      <CardHeader className="bg-card border-b border-border/40 px-6 py-4">
        <CardTitle className="text-lg font-medium">Payment Methods</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Payment Method</label>
          <Select value={selectedMethod} onValueChange={setSelectedMethod}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash">
                <div className="flex items-center">
                  <Landmark className="h-4 w-4 mr-2 text-green-600" />
                  <span>Cash</span>
                </div>
              </SelectItem>
              <SelectItem value="credit">
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-blue-600" />
                  <span>Credit Card</span>
                </div>
              </SelectItem>
              <SelectItem value="debit">
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-purple-600" />
                  <span>Debit Card</span>
                </div>
              </SelectItem>
              <SelectItem value="qr">
                <div className="flex items-center">
                  <QrCode className="h-4 w-4 mr-2 text-gray-600" />
                  <span>QR Code Payment</span>
                </div>
              </SelectItem>
              <SelectItem value="stripe">
                <div className="flex items-center">
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 10C2 6.68629 4.68629 4 8 4H16C19.3137 4 22 6.68629 22 10V14C22 17.3137 19.3137 20 16 20H8C4.68629 20 2 17.3137 2 14V10Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M14 9C14 9.55228 13.5523 10 13 10C12.4477 10 12 9.55228 12 9C12 8.44772 12.4477 8 13 8C13.5523 8 14 8.44772 14 9Z" fill="currentColor" />
                    <path d="M16 13C16 14.1046 15.1046 15 14 15C12.8954 15 12 14.1046 12 13C12 11.8954 12.8954 11 14 11C15.1046 11 16 11.8954 16 13Z" fill="currentColor" />
                    <path d="M10 15C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15Z" fill="currentColor" />
                    <path d="M9 10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10C7 9.44772 7.44772 9 8 9C8.55228 9 9 9.44772 9 10Z" fill="currentColor" />
                  </svg>
                  <span>Stripe</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="p-4 border rounded-md bg-muted/30">
          <h3 className="font-medium mb-2">Selected: {getMethodName(selectedMethod)}</h3>
          <p className="text-sm text-muted-foreground">
            {selectedMethod === 'cash' && "Accept cash payment from guest. Don't forget to provide a receipt."}
            {selectedMethod === 'credit' && "Process credit card payment through the POS terminal."}
            {selectedMethod === 'debit' && "Process debit card payment through the POS terminal."}
            {selectedMethod === 'qr' && "Generate a QR code for digital payment apps."}
            {selectedMethod === 'stripe' && "Process online payment through Stripe gateway."}
          </p>
        </div>
        
        <Button className="w-full" onClick={handleProcessPayment}>
          Process Payment
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodsCard;
