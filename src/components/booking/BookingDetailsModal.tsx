
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Booking } from '@/types';
import { formatDate, calculateNights } from '@/utils/bookingUtils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import CredibilityScore from '@/components/credibility/CredibilityScore';

interface BookingDetailsModalProps {
  booking: Booking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingDetailsModal = ({ booking, open, onOpenChange }: BookingDetailsModalProps) => {
  if (!booking) return null;

  const statusColorMap: Record<string, string> = {
    'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Confirmed': 'bg-blue-100 text-blue-800 border-blue-200',
    'Cancelled': 'bg-red-100 text-red-800 border-red-200',
    'Checked In': 'bg-green-100 text-green-800 border-green-200',
    'Checked Out': 'bg-gray-100 text-gray-800 border-gray-200',
    'No Show': 'bg-red-100 text-red-800 border-red-200',
  };

  const paymentStatusColorMap: Record<string, string> = {
    'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Paid': 'bg-green-100 text-green-800 border-green-200',
    'Refunded': 'bg-purple-100 text-purple-800 border-purple-200',
    'Failed': 'bg-red-100 text-red-800 border-red-200',
  };
  
  const nights = calculateNights(booking.checkInDate, booking.checkOutDate);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
          <DialogDescription>
            Booking #{booking.id} - {formatDate(booking.checkInDate)} to {formatDate(booking.checkOutDate)}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Status */}
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Status:</span>
            <Badge variant="outline" className={cn("border", statusColorMap[booking.status])}>
              {booking.status}
            </Badge>
          </div>
          
          {/* Guest Information */}
          <div>
            <h3 className="text-sm font-medium mb-2">Guest Information</h3>
            <div className="bg-muted/50 p-3 rounded-md space-y-2">
              <p className="text-sm">Name: <span className="font-medium">{booking.guest?.name}</span></p>
              {booking.guest?.credibilityScore && (
                <div className="flex items-center gap-2">
                  <span className="text-sm">Credibility:</span>
                  <CredibilityScore value={booking.guest.credibilityScore} size="sm" />
                </div>
              )}
            </div>
          </div>
          
          {/* Room Information */}
          <div>
            <h3 className="text-sm font-medium mb-2">Room Information</h3>
            <div className="bg-muted/50 p-3 rounded-md space-y-2">
              <p className="text-sm">Room: <span className="font-medium">{booking.room?.number}</span></p>
              <p className="text-sm">Type: <span className="font-medium">{booking.room?.type}</span></p>
              <p className="text-sm">Capacity: <span className="font-medium">{booking.room?.capacity} persons</span></p>
            </div>
          </div>
          
          {/* Dates & Duration */}
          <div>
            <h3 className="text-sm font-medium mb-2">Stay Information</h3>
            <div className="bg-muted/50 p-3 rounded-md space-y-2">
              <p className="text-sm">Check-in: <span className="font-medium">{formatDate(booking.checkInDate)}</span></p>
              <p className="text-sm">Check-out: <span className="font-medium">{formatDate(booking.checkOutDate)}</span></p>
              <p className="text-sm">Duration: <span className="font-medium">{nights} {nights === 1 ? 'night' : 'nights'}</span></p>
            </div>
          </div>
          
          {/* Payment Information */}
          <div>
            <h3 className="text-sm font-medium mb-2">Payment Information</h3>
            <div className="bg-muted/50 p-3 rounded-md space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm">Payment Status:</p>
                <Badge variant="outline" className={cn("border", paymentStatusColorMap[booking.paymentStatus])}>
                  {booking.paymentStatus}
                </Badge>
              </div>
              <p className="text-sm">Method: <span className="font-medium">{booking.paymentMethod || 'Not specified'}</span></p>
              <Separator className="my-1" />
              <div className="flex justify-between items-center font-medium">
                <p className="text-sm">Total Amount:</p>
                <p className="text-sm">${booking.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          {/* Special Requests */}
          {booking.specialRequests && (
            <div>
              <h3 className="text-sm font-medium mb-2">Special Requests</h3>
              <div className="bg-muted/50 p-3 rounded-md">
                <p className="text-sm italic">{booking.specialRequests}</p>
              </div>
            </div>
          )}
          
          {/* Created Date */}
          <div className="flex justify-between items-center text-xs text-muted-foreground mt-4">
            <span>Created: {new Date(booking.createdAt).toLocaleString()}</span>
            <span>Last Updated: {new Date(booking.updatedAt || booking.createdAt).toLocaleString()}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsModal;
