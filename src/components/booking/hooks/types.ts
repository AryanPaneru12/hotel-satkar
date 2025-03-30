
import { BookingFormValues } from '../schema/bookingFormSchema';
import { Guest } from '@/types';

export interface UseBookingFormLogicProps {
  isOpen: boolean;
  onClose: () => void;
  roomId?: string;
  roomType?: string;
  roomPrice?: number;
  checkInDate?: string;
  checkOutDate?: string;
  paymentMethod?: string;
}

export interface UseBookingFormLogicReturn {
  isLoading: boolean;
  currentStep: number;
  customerCredibilityScore: number;
  commandOpen: boolean;
  searchCustomer: string;
  methods: any; // Using any here since we're just passing the form methods through
  getFilteredGuests: (guests: Guest[], searchTerm: string) => Guest[];
  setCommandOpen: (open: boolean) => void;
  setSearchCustomer: (value: string) => void;
  setCurrentStep: (step: number) => void;
  handleGuestFormSubmit: () => void;
  handlePaymentProcess: () => void;
  handleConfirmBooking: (e: React.FormEvent) => void;
  formPaymentMethod: string;
}
