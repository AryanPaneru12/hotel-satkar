
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, differenceInDays } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { bookingFormSchema, BookingFormValues } from '../schema/bookingFormSchema';
import { guests } from '@/data/guests';
import { UseBookingFormLogicProps, UseBookingFormLogicReturn } from './types';
import { getFilteredGuests, getMethodName, parseDateIfProvided } from './bookingFormUtils';
import { useCredibilityScore } from './useCredibilityScore';

export const useBookingFormLogic = ({
  isOpen,
  onClose,
  roomType,
  roomPrice,
  checkInDate: initialCheckInDate,
  checkOutDate: initialCheckOutDate,
  paymentMethod: initialPaymentMethod
}: UseBookingFormLogicProps): UseBookingFormLogicReturn => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [commandOpen, setCommandOpen] = useState(false);
  const [searchCustomer, setSearchCustomer] = useState('');
  
  const navigate = useNavigate();
  const { toast } = useToast();

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

  // Get credibility score from the hook
  const { customerCredibilityScore } = useCredibilityScore(formSelectedCustomerId);

  // Calculate total nights and amount when dates change
  useEffect(() => {
    if (formCheckInDate && formCheckOutDate) {
      const nights = differenceInDays(formCheckOutDate, formCheckInDate);
      const calculatedNights = nights > 0 ? nights : 1;
      setValue('totalNights', calculatedNights);
      setValue('totalAmount', (formRoomPrice || 9900) * calculatedNights);
    }
  }, [formCheckInDate, formCheckOutDate, formRoomPrice, setValue]);

  // Handle moving to payment step
  const handleGuestFormSubmit = () => {
    setCurrentStep(1);
  };
  
  // Handle payment processing with improved error handling
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
    
    // Production code would connect to a payment gateway here
    setTimeout(() => {
      try {
        toast({
          title: "Payment Processed",
          description: `Payment has been processed successfully via ${getMethodName(formPaymentMethod)}`,
          variant: "default",
        });
        setIsLoading(false);
        setCurrentStep(2);
      } catch (error) {
        setIsLoading(false);
        toast({
          title: "Payment Failed",
          description: "There was an error processing your payment. Please try again.",
          variant: "destructive",
        });
      }
    }, 1500);
  };
  
  // Handle booking confirmation with error handling
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formValues = methods.getValues();
    const profileDetails = formValues.selectedCustomerId 
      ? `Customer ID: ${formValues.selectedCustomerId}` 
      : "New customer profile";
    
    // In production, this would save to database
    setTimeout(() => {
      try {
        toast({
          title: "Booking Created!",
          description: `Your booking has been successfully created. ${profileDetails}`,
          variant: "default",
        });
        setIsLoading(false);
        onClose();
        navigate('/bookings');
      } catch (error) {
        setIsLoading(false);
        toast({
          title: "Booking Failed",
          description: "There was an error creating your booking. Please try again.",
          variant: "destructive",
        });
      }
    }, 1500);
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
