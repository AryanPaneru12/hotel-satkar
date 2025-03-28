
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Landmark, QrCode, Loader2, Info } from 'lucide-react';

interface PaymentMethodFormProps {
  paymentMethod: string;
  customerCredibilityScore: number;
  totalAmount: number;
  isLoading: boolean;
  onPaymentMethodChange: (method: string) => void;
  onBack: () => void;
  onProcessPayment: () => void;
}

const getMethodName = (value: string): string => {
  switch (value) {
    case 'cash': return 'Cash';
    case 'credit': return 'Credit Card';
    case 'debit': return 'Debit Card';
    case 'qr': return 'QR Code Payment';
    case 'upi': return 'UPI';
    case 'stripe': return 'Stripe';
    default: return 'Unknown Method';
  }
};

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
  paymentMethod,
  customerCredibilityScore,
  totalAmount,
  isLoading,
  onPaymentMethodChange,
  onBack,
  onProcessPayment
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Select Payment Method</h3>
        
        {paymentMethod === 'cash' && customerCredibilityScore < 80 && (
          <Alert className="bg-red-50 border-red-200 text-red-800">
            <AlertDescription className="text-sm flex items-center">
              <Info className="h-4 w-4 mr-2" />
              Your credibility score is below 80%. Please choose an alternate payment method.
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue={paymentMethod} onValueChange={onPaymentMethodChange}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="credit">Card</TabsTrigger>
            <TabsTrigger 
              value="cash" 
              disabled={customerCredibilityScore < 80}
              className={customerCredibilityScore < 80 ? "cursor-not-allowed" : ""}
            >
              Cash
            </TabsTrigger>
            <TabsTrigger value="upi">UPI</TabsTrigger>
            <TabsTrigger value="qr">QR Code</TabsTrigger>
          </TabsList>
          
          <TabsContent value="credit" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardName">Name on Card</Label>
              <Input id="cardName" placeholder="John Smith" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" placeholder="xxxx xxxx xxxx xxxx" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input id="expiryDate" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" type="password" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="cash" className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="upi" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="upiId">UPI ID</Label>
              <Input id="upiId" placeholder="yourname@upi" />
            </div>
            <div className="bg-muted p-4 rounded-md mt-2">
              <p className="text-sm text-muted-foreground">You will receive a payment request notification on your UPI app.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="qr" className="space-y-4">
            <div className="flex justify-center p-6 border rounded-md">
              <div className="text-center">
                <QrCode className="h-32 w-32 mx-auto mb-4 text-primary" />
                <p className="text-sm text-muted-foreground">Scan this QR code using any payment app to complete your payment</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="pt-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="font-medium">Total Amount</p>
            <p className="text-sm text-muted-foreground">Including all taxes and fees</p>
          </div>
          <div className="text-xl font-bold">Rs. {totalAmount.toLocaleString()}</div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          type="button" 
          onClick={onProcessPayment}
          disabled={isLoading || (paymentMethod === 'cash' && customerCredibilityScore < 80)}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Process Payment"
          )}
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethodForm;
