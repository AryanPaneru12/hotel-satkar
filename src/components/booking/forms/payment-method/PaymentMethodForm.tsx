
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

import CreditCardForm from './CreditCardForm';
import CashPaymentInfo from './CashPaymentInfo';
import UpiPaymentForm from './UpiPaymentForm';
import QrCodePayment from './QrCodePayment';
import TotalAmountDisplay from './TotalAmountDisplay';

interface PaymentMethodFormProps {
  paymentMethod: string;
  customerCredibilityScore: number;
  totalAmount: number;
  isLoading: boolean;
  onPaymentMethodChange: (method: string) => void;
  onBack: () => void;
  onProcessPayment: () => void;
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
  paymentMethod,
  customerCredibilityScore,
  totalAmount,
  isLoading,
  onPaymentMethodChange,
  onBack,
  onProcessPayment
}) => {
  const [cardName, setCardName] = React.useState('');
  const [cardNumber, setCardNumber] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [upiId, setUpiId] = React.useState('');
  
  const isCreditCardValid = paymentMethod === 'credit' && 
    cardName.length > 3 && 
    cardNumber.replace(/\s/g, '').length === 16 && 
    expiryDate.match(/^\d{2}\/\d{2}$/) && 
    cvv.length === 3;
    
  const isUpiValid = paymentMethod === 'upi' && upiId.includes('@');
  
  const isPaymentValid = 
    (paymentMethod === 'credit' && isCreditCardValid) || 
    (paymentMethod === 'upi' && isUpiValid) || 
    paymentMethod === 'qr' || 
    (paymentMethod === 'cash' && customerCredibilityScore >= 80);
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Select Payment Method</h3>
        
        {paymentMethod === 'cash' && customerCredibilityScore < 80 && (
          <Alert className="bg-red-50 border-red-200 text-red-800">
            <AlertDescription className="text-sm flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              Your credibility score is below 80%. Please choose an alternate payment method.
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue={paymentMethod} onValueChange={onPaymentMethodChange}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="credit" className="flex items-center gap-1">
              Credit
            </TabsTrigger>
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
          
          <TabsContent value="credit">
            <CreditCardForm 
              cardName={cardName}
              setCardName={setCardName}
              cardNumber={cardNumber}
              setCardNumber={setCardNumber}
              expiryDate={expiryDate}
              setExpiryDate={setExpiryDate}
              cvv={cvv}
              setCvv={setCvv}
            />
          </TabsContent>
          
          <TabsContent value="cash">
            <CashPaymentInfo />
          </TabsContent>
          
          <TabsContent value="upi">
            <UpiPaymentForm 
              upiId={upiId}
              setUpiId={setUpiId}
            />
          </TabsContent>
          
          <TabsContent value="qr">
            <QrCodePayment />
          </TabsContent>
        </Tabs>
      </div>
      
      <TotalAmountDisplay totalAmount={totalAmount} />
      
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          type="button" 
          onClick={onProcessPayment}
          disabled={isLoading || (paymentMethod === 'cash' && customerCredibilityScore < 80) || !isPaymentValid}
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
