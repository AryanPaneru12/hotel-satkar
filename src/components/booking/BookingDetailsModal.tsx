
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, Bed, CreditCard, Home, Phone, Mail } from 'lucide-react';
import { Booking } from '@/types';
import { cn } from '@/lib/utils';
import CredibilityScore from '@/components/credibility/CredibilityScore';
import { formatCurrency } from '@/lib/formatters';

interface BookingDetailsModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onMarkCheckIn: (bookingId: string) => void;
  onCancelBooking: (bookingId: string) => void;
  onGenerateInvoice: (booking: Booking) => void;
}

const BookingDetailsModal = ({
  booking,
  isOpen,
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
  };

  const paymentStatusColorMap = {
    'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Paid': 'bg-green-100 text-green-800 border-green-200',
    'Refunded': 'bg-purple-100 text-purple-800 border-purple-200',
    'Failed': 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            Booking #{booking.id}
            <Badge 
              variant="outline" 
              className={cn("ml-2 border", statusColorMap[booking.status])}
            >
              {booking.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Created on {new Date(booking.createdAt).toLocaleString()}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="md:col-span-2 space-y-6">
            {/* Booking Details */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Booking Information</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Check-in:</span>
                      <span className="ml-2 font-medium">{formatDate(booking.checkInDate)}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Check-out:</span>
                      <span className="ml-2 font-medium">{formatDate(booking.checkOutDate)}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Payment:</span>
                      <Badge 
                        variant="outline" 
                        className={cn("ml-2 border", paymentStatusColorMap[booking.paymentStatus])}
                      >
                        {booking.paymentStatus}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="ml-2 font-medium">{formatCurrency(booking.totalAmount)}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {booking.room && (
                      <>
                        <div className="flex items-center text-sm">
                          <Bed className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-muted-foreground">Room:</span>
                          <span className="ml-2 font-medium">{booking.room.number}</span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <Home className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-muted-foreground">Type:</span>
                          <span className="ml-2 font-medium">{booking.room.type}</span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <User className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-muted-foreground">Capacity:</span>
                          <span className="ml-2 font-medium">{booking.room.capacity} Guests</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Guest Information */}
            {booking.guest && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Guest Information</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">Name:</span>
                        <span className="ml-2 font-medium">{booking.guest.name}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">Email:</span>
                        <span className="ml-2 font-medium">{booking.guest.email}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">Phone:</span>
                        <span className="ml-2 font-medium">{booking.guest.phone}</span>
                      </div>
                    </div>
                    
                    {booking.guest.address && (
                      <div className="space-y-2">
                        <div className="flex items-start text-sm">
                          <Home className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                          <span className="text-muted-foreground">Address:</span>
                          <span className="ml-2 font-medium">{booking.guest.address}</span>
                        </div>
                        
                        {booking.guest.nationality && (
                          <div className="flex items-center text-sm">
                            <span className="w-4 h-4 mr-2"></span>
                            <span className="text-muted-foreground">Nationality:</span>
                            <span className="ml-2 font-medium">{booking.guest.nationality}</span>
                          </div>
                        )}
                        
                        {booking.guest.idNumber && (
                          <div className="flex items-center text-sm">
                            <span className="w-4 h-4 mr-2"></span>
                            <span className="text-muted-foreground">ID Number:</span>
                            <span className="ml-2 font-medium">{booking.guest.idNumber}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => onGenerateInvoice(booking)}>
                Generate Invoice
              </Button>
              
              {booking.status === 'Confirmed' && (
                <Button 
                  variant="outline" 
                  onClick={() => onMarkCheckIn(booking.id)}
                >
                  Mark as Checked In
                </Button>
              )}
              
              {(booking.status === 'Pending' || booking.status === 'Confirmed') && (
                <Button 
                  variant="destructive" 
                  onClick={() => onCancelBooking(booking.id)}
                >
                  Cancel Booking
                </Button>
              )}
            </div>
          </div>
          
          {/* Guest Credibility Score */}
          {booking.guest?.credibilityScore && (
            <div>
              <CredibilityScore 
                score={booking.guest.credibilityScore} 
                history={booking.guest.bookingHistory}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsModal;
