import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { guests } from '@/data/guests';
import { FormProvider } from 'react-hook-form';

// Import our components
import StepIndicator from './StepIndicator';
import GuestInformationForm from './forms/GuestInformationForm';
import PaymentMethodForm from './forms/PaymentMethodForm';
import ConfirmationForm from './forms/ConfirmationForm';
import { useBookingFormLogic } from './hooks/useBookingFormLogic';
import { getFilteredGuests } from './hooks/bookingFormUtils';

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

const BookingForm = (props: BookingFormProps) => {
  const { 
    isOpen, 
    onClose, 
  } = props;

  const {
    isLoading,
    currentStep,
    customerCredibilityScore,
    commandOpen,
    searchCustomer,
    methods,
    getFilteredGuests,
    setCommandOpen,
    setSearchCustomer,
    handleGuestFormSubmit,
    handlePaymentProcess,
    handleConfirmBooking,
    formPaymentMethod,
    setCurrentStep
  } = useBookingFormLogic(props);
  
  // Step configurations
  const steps = [
    { title: "Guest Information", description: "Enter guest details" },
    { title: "Payment Method", description: "Choose your payment method" },
    { title: "Confirmation", description: "Review and confirm" }
  ];
  
  if (!isOpen) return null;

  const filteredGuests = getFilteredGuests(guests, searchCustomer);

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
                paymentMethod={formPaymentMethod}
                onPaymentMethodChange={(method) => methods.setValue('paymentMethod', method)}
                totalAmount={methods.getValues('totalAmount')}
              />
            )}
            
            {currentStep === 2 && (
              <ConfirmationForm 
                onSubmit={handleConfirmBooking}
                onClose={onClose}
              />
            )}
          </FormProvider>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
