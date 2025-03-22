
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  CreditCard, 
  File, 
  CheckCircle, 
  XCircle, 
  User, 
  Home, 
  Banknote,
  Clock,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BookingDetailsModalProps } from '@/types';
import { Separator } from '../ui/separator';

const BookingDetailsModal = ({
  booking,
  open,
  onClose,
  onMarkCheckIn,
  onCancelBooking,
  onGenerateInvoice
}: BookingDetailsModalProps) => {
  if (!booking) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const statusColorMap = {
    'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Confirmed': 'bg-blue-100 text-blue-800 border-blue-200',
    'Cancelled': 'bg-red-100 text-red-800 border-red-200',
    'Checked In': 'bg-green-100 text-green-800 border-green-200',
    'Checked Out': 'bg-gray-100 text-gray-800 border-gray-200',
    'No Show': 'bg-purple-100 text-purple-800 border-purple-200',
  };

  const paymentStatusColorMap = {
    'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Paid': 'bg-green-100 text-green-800 border-green-200',
    'Refunded': 'bg-purple-100 text-purple-800 border-purple-200',
    'Failed': 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <span>Booking #{booking.id}</span>
            <Badge 
              variant="outline" 
              className={cn("ml-2 border", statusColorMap[booking.status])}
            >
              {booking.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Booking details for {booking.guest?.name || 'Guest'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Check-in</span>
              </div>
              <p>{formatDate(booking.checkInDate)}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Check-out</span>
              </div>
              <p>{formatDate(booking.checkOutDate)}</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <User className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Guest Information</span>
            </div>
            <p className="font-medium">{booking.guest?.name}</p>
            <p className="text-sm text-muted-foreground">{booking.guest?.email}</p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Home className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Room Details</span>
            </div>
            <div className="flex items-center justify-between">
              <p>{booking.room?.type} Room - {booking.room?.number}</p>
              <Badge>{booking.room?.capacity} {booking.room?.capacity === 1 ? 'Guest' : 'Guests'}</Badge>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Banknote className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Payment Details</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Status</span>
              <Badge 
                variant="outline" 
                className={cn("border", paymentStatusColorMap[booking.paymentStatus])}
              >
                {booking.paymentStatus}
              </Badge>
            </div>
            {booking.paymentMethod && (
              <div className="flex items-center justify-between">
                <span>Method</span>
                <span>{booking.paymentMethod}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span>Total Amount</span>
              <span className="font-bold">${booking.totalAmount.toFixed(2)}</span>
            </div>
          </div>
          
          {booking.specialRequests && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Info className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Special Requests</span>
                </div>
                <p className="text-sm">{booking.specialRequests}</p>
              </div>
            </>
          )}
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Booking Timeline</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Created</span>
              <span>{new Date(booking.createdAt).toLocaleString()}</span>
            </div>
            {booking.updatedAt && (
              <div className="flex items-center justify-between">
                <span>Last Updated</span>
                <span>{new Date(booking.updatedAt).toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex-col space-y-2 sm:space-y-0">
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button
              variant="outline"
              className="flex-1 flex items-center"
              onClick={() => onGenerateInvoice(booking)}
            >
              <File className="mr-2 h-4 w-4" />
              <span>Generate Invoice</span>
            </Button>
            
            {(booking.status === 'Confirmed' || booking.status === 'Pending') && (
              <Button
                className="flex-1 flex items-center bg-green-600 hover:bg-green-700"
                onClick={() => onMarkCheckIn(booking.id)}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                <span>Mark as Checked In</span>
              </Button>
            )}
            
            {(booking.status === 'Pending' || booking.status === 'Confirmed') && (
              <Button
                variant="destructive"
                className="flex-1 flex items-center"
                onClick={() => onCancelBooking(booking.id)}
              >
                <XCircle className="mr-2 h-4 w-4" />
                <span>Cancel Booking</span>
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsModal;
