import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, differenceInDays } from 'date-fns';
import { calculateCredibilityScore } from '@/lib/formatters';
import { useAuth } from '@/contexts/AuthContext';
import { Guest } from '@/types';
import { bookingFormSchema, BookingFormValues } from '../schema/bookingFormSchema';
import { guests } from '@/data/guests';

interface UseBookingFormLogicProps {
  isOpen: boolean;
  onClose: () => void;
  roomId?: string;
  roomType?: string;
  roomPrice?: number;
  checkInDate?: string;
  checkOutDate?: string;
  paymentMethod?: string;
}

export const useBookingFormLogic = ({
  isOpen,
  onClose,
  roomType,
  roomPrice,
  checkInDate: initialCheckInDate,
  checkOutDate: initialCheckOutDate,
  paymentMethod: initialPaymentMethod
}: UseBookingFormLogicProps) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [customerCredibilityScore, setCustomerCredibilityScore] = useState(0);
  const [commandOpen, setCommandOpen] = useState(false);
  const [searchCustomer, setSearchCustomer] = useState('');
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const parseDateIfProvided = (dateString?: string): Date | undefined => {
    if (!dateString) return undefined;
    try {
      return new Date(dateString);
    } catch (error) {
      console.error("Error parsing date:", error);
      return undefined;
    }
  };
  
  const defaultCheckInDate = parseDateIfProvided(initialCheckInDate) || new Date(2025, 5, 15);
  const defaultCheckOutDate = parseDateIfProvided(initialCheckOutDate) || addDays(new Date(2025, 5, 15), 1);
  
  const methods = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: user?.name || '',
      email: user?.email || '',
      phone: '',
      idType: 'passport',
      idNumber: '',
      specialRequests: '',
      checkInDate: defaultCheckInDate,
      checkOutDate: defaultCheckOutDate,
      useExistingCustomer: false,
      selectedCustomerId: '',
      paymentMethod: initialPaymentMethod || 'credit',
      roomType: roomType || 'Standard Room',
      roomPrice: roomPrice || 9900,
      totalNights: 1,
      totalAmount: roomPrice || 9900
    },
    mode: "onChange"
  });

  const { watch, setValue } = methods;
  
  const formCheckInDate = watch('checkInDate');
  const formCheckOutDate = watch('checkOutDate');
  const formSelectedCustomerId = watch('selectedCustomerId');
  const formPaymentMethod = watch('paymentMethod');
  const formRoomPrice = watch('roomPrice');

  useEffect(() => {
    if (formCheckInDate && formCheckOutDate) {
      const nights = differenceInDays(formCheckOutDate, formCheckInDate);
      const calculatedNights = nights > 0 ? nights : 1;
      setValue('totalNights', calculatedNights);
      setValue('totalAmount', (formRoomPrice || 9900) * calculatedNights);
    }
  }, [formCheckInDate, formCheckOutDate, formRoomPrice, setValue]);

  useEffect(() => {
    if (user && !formSelectedCustomerId) {
      const mockHistory = {
        totalBookings: 5,
        completedStays: 4,
        cancellations: 1,
        noShows: 0
      };
      
      const score = calculateCredibilityScore(
        mockHistory.totalBookings,
        mockHistory.completedStays,
        mockHistory.cancellations,
        mockHistory.noShows
      );
      
      setCustomerCredibilityScore(score);
    }
  }, [user, formSelectedCustomerId]);

  useEffect(() => {
    if (formSelectedCustomerId) {
      const selectedGuest = guests.find(g => g.id === formSelectedCustomerId);
      if (selectedGuest && selectedGuest.credibilityScore) {
        setCustomerCredibilityScore(selectedGuest.credibilityScore);
      } else if (selectedGuest && selectedGuest.bookingHistory) {
        const score = calculateCredibilityScore(
          selectedGuest.bookingHistory.totalBookings,
          selectedGuest.bookingHistory.completedStays,
          selectedGuest.bookingHistory.cancellations,
          selectedGuest.bookingHistory.noShows
        );
        setCustomerCredibilityScore(score);
      }
    }
  }, [formSelectedCustomerId]);

  const handleGuestFormSubmit = () => {
    setCurrentStep(1);
  };
  
  const handlePaymentProcess = () => {
    if (formPaymentMethod === 'cash' && customerCredibilityScore < 80) {
      toast({
        title: "Cash Payment Not Available",
        description: "Your credibility score is below 80%. Please choose an alternate payment method.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Payment Processed",
        description: `Payment has been processed successfully via ${getMethodName(formPaymentMethod)}`,
        variant: "default",
      });
      setIsLoading(false);
      setCurrentStep(2);
    }, 1500);
  };
  
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formValues = methods.getValues();
    const profileDetails = formValues.selectedCustomerId 
      ? `Customer ID: ${formValues.selectedCustomerId}` 
      : "New customer profile";
    
    setTimeout(() => {
      toast({
        title: "Booking Created!",
        description: `Your booking has been successfully created. ${profileDetails}`,
        variant: "default",
      });
      setIsLoading(false);
      onClose();
      navigate('/bookings');
    }, 1500);
  };
  
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

  const getFilteredGuests = (guests: Guest[], searchTerm: string) => {
    return searchTerm.trim() !== '' 
      ? guests.filter(guest => 
          guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          guest.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (guest.email && guest.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (guest.phone && guest.phone.includes(searchTerm))
        )
      : [];
  };

  return {
    isLoading,
    currentStep,
    customerCredibilityScore,
    commandOpen,
    searchCustomer,
    methods,
    getFilteredGuests,
    setCommandOpen,
    setSearchCustomer,
    setCurrentStep,
    handleGuestFormSubmit,
    handlePaymentProcess,
    handleConfirmBooking,
    formPaymentMethod
  };
};
