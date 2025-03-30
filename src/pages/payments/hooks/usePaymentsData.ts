
import { useState, useMemo } from 'react';
import { bookings } from '@/data/bookings';
import { rooms } from '@/data/rooms';
import { useAuth } from '@/contexts/AuthContext';
import { calculatePriceBreakdown } from '@/lib/formatters';

export const usePaymentsData = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const { user, customerId } = useAuth();
  
  // Check if user is admin or superadmin
  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';
  
  // Convert bookings to payments data
  const payments = useMemo(() => {
    if (!user) return [];
    
    return bookings
      .filter(booking => isAdmin || booking.guest?.id === user.id)
      .map(booking => {
        // Generate a random payment ID for demonstration purposes
        const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
        
        // Find room details to get room type for GST calculation
        const roomDetail = rooms.find(room => room.id === booking.roomId || (booking.room && room.id === booking.room.id));
        const roomType = roomDetail?.type || 'Standard';
        
        return {
          id: `PAY-${randomId}`,
          bookingId: booking.id,
          amount: booking.totalAmount,
          date: booking.createdAt || new Date(),
          status: booking.paymentStatus,
          method: booking.paymentMethod || 'card',
          guest: booking.guest,
          roomNumber: booking.room.number,
          roomType: roomType,
          checkInDate: booking.checkInDate,
          checkOutDate: booking.checkOutDate
        };
      });
  }, [user, isAdmin]);
  
  // Filter payments based on search and status
  const filteredPayments = useMemo(() => {
    return payments.filter(payment => {
      const matchesSearch = 
        payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (payment.guest?.name && payment.guest.name.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || payment.status.toLowerCase() === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [payments, searchQuery, statusFilter]);

  // Calculate totals for different payment statuses
  const totals = useMemo(() => {
    return {
      total: payments.reduce((sum, payment) => sum + payment.amount, 0),
      paid: payments.filter(p => p.status.toLowerCase() === 'paid').reduce((sum, payment) => sum + payment.amount, 0),
      pending: payments.filter(p => p.status.toLowerCase() === 'pending').reduce((sum, payment) => sum + payment.amount, 0),
      refunded: payments.filter(p => p.status.toLowerCase() === 'refunded').reduce((sum, payment) => sum + payment.amount, 0)
    };
  }, [payments]);

  // Calculate price breakdown for selected payment
  const priceBreakdown = useMemo(() => {
    if (!selectedPayment) return null;
    
    return calculatePriceBreakdown(selectedPayment.amount, selectedPayment.roomType);
  }, [selectedPayment]);

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    selectedPayment,
    setSelectedPayment,
    showPaymentDetails,
    setShowPaymentDetails,
    payments,
    filteredPayments,
    totals,
    priceBreakdown,
    isAdmin,
    customerId
  };
};
