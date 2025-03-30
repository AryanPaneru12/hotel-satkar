
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/formatters';
import { Receipt, IndianRupee, CreditCard } from 'lucide-react';

interface PaymentDetailsDialogProps {
  showPaymentDetails: boolean;
  setShowPaymentDetails: (show: boolean) => void;
  selectedPayment: any;
  priceBreakdown: any;
  isAdmin: boolean;
}

const PaymentDetailsDialog: React.FC<PaymentDetailsDialogProps> = ({
  showPaymentDetails,
  setShowPaymentDetails,
  selectedPayment,
  priceBreakdown,
  isAdmin
}) => {
  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'refunded': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Dialog open={showPaymentDetails} onOpenChange={setShowPaymentDetails}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
          <DialogDescription>
            Details for payment {selectedPayment?.id}
          </DialogDescription>
        </DialogHeader>
        
        {selectedPayment && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Payment ID:</span>
              <span className="font-medium">{selectedPayment.id}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Booking ID:</span>
              <span className="font-medium">{selectedPayment.bookingId}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-medium">{new Date(selectedPayment.date).toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Room:</span>
              <span className="font-medium">{selectedPayment.roomType} Room {selectedPayment.roomNumber}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Check-in Date:</span>
              <span className="font-medium">{new Date(selectedPayment.checkInDate).toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Check-out Date:</span>
              <span className="font-medium">{new Date(selectedPayment.checkOutDate).toLocaleDateString()}</span>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <Receipt className="h-4 w-4 mr-2" />
                Price Breakdown
              </h3>
              <div className="bg-muted p-4 rounded-md space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Base Amount:</span>
                  <span className="font-medium">{formatCurrency(priceBreakdown.baseAmount)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    GST ({priceBreakdown.gstRate}%):
                  </span>
                  <span className="font-medium">{formatCurrency(priceBreakdown.gstAmount)}</span>
                </div>
                
                <Separator className="my-1" />
                
                <div className="flex items-center justify-between font-bold">
                  <span>Total Amount:</span>
                  <div className="flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    <span>{formatCurrency(selectedPayment.amount).replace('₹', '')}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Payment Method:</span>
              <span className="font-medium capitalize">{selectedPayment.method}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status:</span>
              <Badge 
                variant="outline" 
                className={getStatusBadgeColor(selectedPayment.status)}
              >
                {selectedPayment.status}
              </Badge>
            </div>
            
            {isAdmin && selectedPayment.guest && (
              <>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Guest Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">{selectedPayment.guest.name}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">{selectedPayment.guest.email}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDetailsDialog;
