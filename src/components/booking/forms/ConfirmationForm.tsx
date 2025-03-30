
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useFormContext } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

interface ConfirmationFormProps {
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
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

const ConfirmationForm: React.FC<ConfirmationFormProps> = ({
  onSubmit,
  onClose
}) => {
  const { getValues } = useFormContext();
  const formData = getValues();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    setIsSubmitting(true);
    try {
      onSubmit(e);
    } catch (error) {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.75 12.75L10 15.25L16.25 8.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-green-800">Booking Confirmed!</h3>
        <p className="text-green-700 mt-1">Your booking has been successfully confirmed.</p>
      </div>
      
      <div className="space-y-4 border-t border-b py-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Booking Reference:</span>
          <span className="font-medium">BOK-{Math.floor(100000 + Math.random() * 900000)}</span>
        </div>
        
        {formData.selectedCustomerId && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Customer ID:</span>
            <span className="font-medium">{formData.selectedCustomerId}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Room Type:</span>
          <span className="font-medium">{formData.roomType || "Standard Room"}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Check-in Date:</span>
          <span className="font-medium">{formData.checkInDate ? format(formData.checkInDate, "PPP") : "Not specified"}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Check-out Date:</span>
          <span className="font-medium">{formData.checkOutDate ? format(formData.checkOutDate, "PPP") : "Not specified"}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total Amount:</span>
          <span className="font-medium">Rs. {formData.totalAmount.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Payment Method:</span>
          <span className="font-medium">{getMethodName(formData.paymentMethod)}</span>
        </div>
      </div>
      
      <div className="pt-2 text-sm text-muted-foreground">
        <p>A confirmation email has been sent to {formData.email}.</p>
        <p className="mt-1">For any queries, please contact our support team.</p>
        <p className="mt-1">Hotel Satkar - Established 2025</p>
      </div>
      
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button 
          type="button" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "View My Bookings"
          )}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationForm;
