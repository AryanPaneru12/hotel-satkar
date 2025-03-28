
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { addDays, format, differenceInDays, isAfter, isBefore } from 'date-fns';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { guests } from '@/data/guests';
import { useAuth } from '@/contexts/AuthContext';
import { calculateCredibilityScore } from '@/lib/formatters';

// Import our new component files
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
  const [paymentMethod, setPaymentMethod] = useState(initialPaymentMethod || 'credit');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalNights, setTotalNights] = useState(1);
  const [totalAmount, setTotalAmount] = useState(roomPrice || 9900);
  const [customerCredibilityScore, setCustomerCredibilityScore] = useState(0);
  const [commandOpen, setCommandOpen] = useState(false);
  const [searchCustomer, setSearchCustomer] = useState('');
  const [formData, setFormData] = useState<GuestFormValues | null>(null);
  
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
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const filteredGuests = searchCustomer.trim() !== '' 
    ? guests.filter(guest => 
        guest.name.toLowerCase().includes(searchCustomer.toLowerCase()) ||
        guest.id.toLowerCase().includes(searchCustomer.toLowerCase()) ||
        (guest.email && guest.email.toLowerCase().includes(searchCustomer.toLowerCase())) ||
        (guest.phone && guest.phone.includes(searchCustomer))
      )
    : [];

  // Set default form values
  const defaultValues = {
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
  };

  // Calculate credibility score for logged-in user
  useEffect(() => {
    if (user && !formData?.selectedCustomerId) {
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
  }, [user, formData?.selectedCustomerId]);

  // Update customer info based on selectedCustomerId
  useEffect(() => {
    if (formData?.selectedCustomerId) {
      const selectedGuest = guests.find(g => g.id === formData.selectedCustomerId);
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
  }, [formData?.selectedCustomerId]);

  // Calculate total nights and amount
  useEffect(() => {
    if (formData?.checkInDate && formData?.checkOutDate) {
      const nights = differenceInDays(formData.checkOutDate, formData.checkInDate);
      setTotalNights(nights > 0 ? nights : 1);
      setTotalAmount((roomPrice || 9900) * (nights > 0 ? nights : 1));
    }
  }, [formData?.checkInDate, formData?.checkOutDate, roomPrice]);

  const handleGuestFormSubmit = (data: GuestFormValues) => {
    setFormData(data);
    setCurrentStep(1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const profileDetails = formData?.selectedCustomerId 
      ? `Customer ID: ${formData.selectedCustomerId}` 
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
  
  const handlePaymentProcess = () => {
    if (paymentMethod === 'cash' && customerCredibilityScore < 80) {
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
        description: `Payment has been processed successfully via ${getMethodName(paymentMethod)}`,
        variant: "default",
      });
      setIsLoading(false);
      setCurrentStep(2);
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
  
  const steps = [
    { title: "Guest Information", description: "Enter guest details" },
    { title: "Payment Method", description: "Choose your payment method" },
    { title: "Confirmation", description: "Review and confirm" }
  ];
  
  if (!isOpen) return null;

  const formDataWithPricing = {
    roomType,
    roomPrice,
    customerCredibilityScore,
    totalNights,
    totalAmount,
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="sm:max-w-xl max-h-[80vh] overflow-y-auto">
        <CardHeader className="border-b sticky top-0 bg-white z-10">
          <CardTitle>Book Your Stay</CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 overflow-y-auto">
          <StepIndicator steps={steps} currentStep={currentStep} />
          
          {currentStep === 0 && (
            <GuestInformationForm 
              formData={formDataWithPricing}
              defaultValues={defaultValues}
              guests={guests}
              filteredGuests={filteredGuests}
              onSubmit={handleGuestFormSubmit}
              onClose={onClose}
              setCommandOpen={setCommandOpen}
              commandOpen={commandOpen}
              searchCustomer={searchCustomer}
              onSearchChange={setSearchCustomer}
            />
          )}
          
          {currentStep === 1 && (
            <PaymentMethodForm 
              paymentMethod={paymentMethod}
              customerCredibilityScore={customerCredibilityScore}
              totalAmount={totalAmount}
              isLoading={isLoading}
              onPaymentMethodChange={setPaymentMethod}
              onBack={() => setCurrentStep(0)}
              onProcessPayment={handlePaymentProcess}
            />
          )}
          
          {currentStep === 2 && formData && (
            <ConfirmationForm 
              formData={{
                ...formData,
                roomType,
                roomPrice,
                totalNights,
                totalAmount,
                paymentMethod
              }}
              onSubmit={handleSubmit}
              onClose={onClose}
            />
          )}
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
