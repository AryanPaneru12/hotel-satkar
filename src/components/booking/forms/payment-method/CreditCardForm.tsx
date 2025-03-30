
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CreditCardFormProps {
  cardName: string;
  setCardName: (value: string) => void;
  cardNumber: string;
  setCardNumber: (value: string) => void;
  expiryDate: string;
  setExpiryDate: (value: string) => void;
  cvv: string;
  setCvv: (value: string) => void;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({
  cardName,
  setCardName,
  cardNumber,
  setCardNumber,
  expiryDate,
  setExpiryDate,
  cvv,
  setCvv
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cardName">Name on Card</Label>
        <Input 
          id="cardName" 
          placeholder="John Smith" 
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />
        {cardName && cardName.length < 3 && (
          <p className="text-xs text-red-500">Name is too short</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input 
          id="cardNumber" 
          placeholder="xxxx xxxx xxxx xxxx" 
          value={cardNumber}
          onChange={(e) => {
            // Format card number with spaces every 4 digits
            const formatted = e.target.value
              .replace(/\s/g, '')
              .replace(/\D/g, '')
              .replace(/(.{4})/g, '$1 ')
              .trim();
            setCardNumber(formatted);
          }}
          maxLength={19} // 16 digits + 3 spaces
        />
        {cardNumber && cardNumber.replace(/\s/g, '').length !== 16 && (
          <p className="text-xs text-red-500">Card number must be 16 digits</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input 
            id="expiryDate" 
            placeholder="MM/YY" 
            value={expiryDate}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              if (value.length <= 4) {
                const formatted = value.length > 2 
                  ? value.substring(0, 2) + '/' + value.substring(2)
                  : value;
                setExpiryDate(formatted);
              }
            }}
            maxLength={5}
          />
          {expiryDate && !expiryDate.match(/^\d{2}\/\d{2}$/) && (
            <p className="text-xs text-red-500">Format: MM/YY</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input 
            id="cvv" 
            placeholder="123" 
            type="password"
            value={cvv}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              if (value.length <= 3) {
                setCvv(value);
              }
            }}
            maxLength={3}
          />
          {cvv && cvv.length !== 3 && (
            <p className="text-xs text-red-500">CVV must be 3 digits</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;
