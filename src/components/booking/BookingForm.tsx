
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { addDays, differenceInDays } from 'date-fns';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { guests } from '@/data/guests';
import { useAuth } from '@/contexts/AuthContext';
import { calculateCredibilityScore } from '@/lib/formatters';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Import our components
import StepIndicator from './StepIndicator';
import GuestInformationForm, { GuestFormValues } from './forms/GuestInformationForm';
import PaymentMethodForm from './forms/PaymentMethodForm';
import ConfirmationForm from './forms/ConfirmationForm';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  roomId?: string;
  roomType?: string;
  roomPrice?: number;
  checkInDate?: string;
  checkOutDate?: string;
  paymentMethod?: string;
}

// Define form schema for the entire booking process
const bookingFormSchema = z.object({
  // Guest information
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  phone: z.string().min(10, { message: "Invalid phone number format" }),
  idType: z.string(),
  idNumber: z.string().min(1, { message: "ID number is required" }),
  specialRequests: z.string().optional(),
  checkInDate: z.date(),
  checkOutDate: z.date(),
  useExistingCustomer: z.boolean().default(false),
  selectedCustomerId: z.string().optional(),
  
  // Payment information
  paymentMethod: z.string().default('credit'),
  
  // Additional booking data (not directly input by user)
  roomType: z.string().optional(),
  roomPrice: z.number().optional(),
  totalNights: z.number().default(1),
  totalAmount: z.number().default(0)
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

const BookingForm = ({ 
  isOpen, 
  onClose, 
  roomId, 
  roomType, 
  roomPrice,
  checkInDate: initialCheckInDate,
  checkOutDate: initialCheckOutDate,
  paymentMethod: initialPaymentMethod
}: BookingFormProps) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [customerCredibilityScore, setCustomerCredibilityScore] = useState(0);
  const [commandOpen, setCommandOpen] = useState(false);
  const [searchCustomer, setSearchCustomer] = useState('');
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Parse dates if provided
  const parseDateIfProvided = (dateString?: string): Date | undefined => {
    if (!dateString) return undefined;
    try {
      return new Date(dateString);
    } catch (error) {
      console.error("Error parsing date:", error);
      return undefined;
    }
  };
  
  const defaultCheckInDate = parseDateIfProvided(initialCheckInDate) || new Date(2025, 0, 15);
  const defaultCheckOutDate = parseDateIfProvided(initialCheckOutDate) || addDays(new Date(2025, 0, 15), 1);
  
  // Filter guests based on search input
  const filteredGuests = searchCustomer.trim() !== '' 
    ? guests.filter(guest => 
        guest.name.toLowerCase().includes(searchCustomer.toLowerCase()) ||
        guest.id.toLowerCase().includes(searchCustomer.toLowerCase()) ||
        (guest.email && guest.email.toLowerCase().includes(searchCustomer.toLowerCase())) ||
        (guest.phone && guest.phone.includes(searchCustomer))
      )
    : [];

  // Set up form with React Hook Form
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
  
  // Watch for changes to calculate derived values
  const formCheckInDate = watch('checkInDate');
  const formCheckOutDate = watch('checkOutDate');
  const formSelectedCustomerId = watch('selectedCustomerId');
  const formPaymentMethod = watch('paymentMethod');
  const formRoomPrice = watch('roomPrice');

  // Calculate total nights and amount when dates change
  useEffect(() => {
    if (formCheckInDate && formCheckOutDate) {
      const nights = differenceInDays(formCheckOutDate, formCheckInDate);
      const calculatedNights = nights > 0 ? nights : 1;
      setValue('totalNights', calculatedNights);
      setValue('totalAmount', (formRoomPrice || 9900) * calculatedNights);
    }
  }, [formCheckInDate, formCheckOutDate, formRoomPrice, setValue]);

  // Calculate credibility score for logged-in user
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

  // Update customer info based on selectedCustomerId
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

  // Form submission handlers
  const handleGuestFormSubmit = () => {
    setCurrentStep(1);
  };
  
  const handlePaymentProcess = () => {
    // Check customer credibility score for cash payments
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
  
  // Step configurations
  const steps = [
    { title: "Guest Information", description: "Enter guest details" },
    { title: "Payment Method", description: "Choose your payment method" },
    { title: "Confirmation", description: "Review and confirm" }
  ];
  
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="sm:max-w-xl max-h-[80vh] overflow-y-auto">
        <CardHeader className="border-b sticky top-0 bg-white z-10">
          <CardTitle>Book Your Stay</CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 overflow-y-auto">
          <FormProvider {...methods}>
            <StepIndicator steps={steps} currentStep={currentStep} />
            
            {currentStep === 0 && (
              <GuestInformationForm 
                onSubmit={handleGuestFormSubmit}
                onClose={onClose}
                setCommandOpen={setCommandOpen}
                commandOpen={commandOpen}
                searchCustomer={searchCustomer}
                onSearchChange={setSearchCustomer}
                filteredGuests={filteredGuests}
                guests={guests}
              />
            )}
            
            {currentStep === 1 && (
              <PaymentMethodForm 
                customerCredibilityScore={customerCredibilityScore}
                isLoading={isLoading}
                onBack={() => setCurrentStep(0)}
                onProcessPayment={handlePaymentProcess}
              />
            )}
            
            {currentStep === 2 && (
              <ConfirmationForm 
                onSubmit={handleConfirmBooking}
                onClose={onClose}
                isLoading={isLoading}
              />
            )}
          </FormProvider>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
