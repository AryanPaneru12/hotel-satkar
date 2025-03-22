
import { Booking } from '@/types';
import { generateInvoice } from '@/lib/invoiceGenerator';
import { toast } from '@/components/ui/use-toast';

// Utility function to format dates
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Calculate number of nights between check-in and check-out
export const calculateNights = (checkInDate: string, checkOutDate: string) => {
  const checkIn = new Date(checkInDate).getTime();
  const checkOut = new Date(checkOutDate).getTime();
  const diffTime = Math.abs(checkOut - checkIn);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Handle view booking details
export const viewBookingDetails = (booking: Booking, onOpen: (booking: Booking) => void) => {
  // Open modal with booking details
  onOpen(booking);
};

// Handle generate invoice
export const generateBookingInvoice = (booking: Booking) => {
  try {
    // Generate PDF invoice
    generateInvoice(booking);
    
    toast({
      title: "Invoice Generated",
      description: `Invoice for booking #${booking.id} has been generated and downloaded.`,
    });
  } catch (error) {
    console.error('Error generating invoice:', error);
    toast({
      title: "Invoice Generation Failed",
      description: "There was a problem generating the invoice. Please try again.",
      variant: "destructive",
    });
  }
};

// Handle marking booking as checked in
export const markAsCheckedIn = (
  booking: Booking, 
  onStatusChange: (bookingId: string, newStatus: string) => void
) => {
  if (booking.status === 'Confirmed') {
    onStatusChange(booking.id, 'Checked In');
    
    toast({
      title: "Check-in Successful",
      description: `Guest ${booking.guest?.name} has been checked in to Room ${booking.room?.number}.`,
    });
  } else {
    toast({
      title: "Cannot Check In",
      description: `Booking must be in 'Confirmed' status to check in (current: ${booking.status}).`,
      variant: "destructive",
    });
  }
};

// Handle marking booking as checked out
export const markAsCheckedOut = (
  booking: Booking, 
  onStatusChange: (bookingId: string, newStatus: string) => void
) => {
  if (booking.status === 'Checked In') {
    onStatusChange(booking.id, 'Checked Out');
    
    toast({
      title: "Check-out Successful",
      description: `Guest ${booking.guest?.name} has checked out from Room ${booking.room?.number}.`,
    });
  } else {
    toast({
      title: "Cannot Check Out",
      description: `Booking must be in 'Checked In' status to check out (current: ${booking.status}).`,
      variant: "destructive",
    });
  }
};

// Handle booking cancellation
export const cancelBooking = (
  booking: Booking, 
  onStatusChange: (bookingId: string, newStatus: string) => void
) => {
  // Only allow cancellation for confirmed bookings or those that haven't checked in yet
  if (booking.status === 'Confirmed' || booking.status === 'Pending') {
    onStatusChange(booking.id, 'Cancelled');
    
    toast({
      title: "Booking Cancelled",
      description: `Booking #${booking.id} has been cancelled.`,
    });
    
    // If payment was already made, show refund message
    if (booking.paymentStatus === 'Paid') {
      toast({
        title: "Refund Initiated",
        description: `A refund of $${booking.totalAmount.toFixed(2)} has been initiated.`,
      });
    }
  } else {
    toast({
      title: "Cannot Cancel",
      description: `Booking with status '${booking.status}' cannot be cancelled.`,
      variant: "destructive",
    });
  }
};

// Filter bookings based on user role and user ID
export const filterBookingsByUser = (bookings: Booking[], user: any) => {
  // If admin or superadmin, show all bookings
  if (user?.role === 'admin' || user?.role === 'superadmin') {
    return bookings;
  }
  
  // For customers, only show their own bookings
  return bookings.filter(booking => booking.guest?.id === user?.id);
};
