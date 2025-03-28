
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Guest } from '@/types';
import RoomInfo from './guest-info/RoomInfo';
import DateSelection from './guest-info/DateSelection';
import CustomerMapping from './guest-info/CustomerMapping';
import PersonalInfo from './guest-info/PersonalInfo';
import FormActions from './guest-info/FormActions';

// Define form schema
const guestFormSchema = z.object({
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
});

export type GuestFormValues = z.infer<typeof guestFormSchema>;

interface GuestInformationFormProps {
  formData: {
    roomType: string | undefined;
    roomPrice: number | undefined;
    customerCredibilityScore: number;
    totalNights: number;
    totalAmount: number;
  };
  defaultValues: Partial<GuestFormValues>;
  guests: Guest[];
  filteredGuests: Guest[];
  onSubmit: (data: GuestFormValues) => void;
  onClose: () => void;
  setCommandOpen: (open: boolean) => void;
  commandOpen: boolean;
  searchCustomer: string;
  onSearchChange: (value: string) => void;
}

const GuestInformationForm: React.FC<GuestInformationFormProps> = ({
  formData,
  defaultValues,
  guests,
  filteredGuests,
  onSubmit,
  onClose,
  setCommandOpen,
  commandOpen,
  searchCustomer,
  onSearchChange
}) => {
  const methods = useForm<GuestFormValues>({
    resolver: zodResolver(guestFormSchema),
    defaultValues,
    mode: "onChange"
  });

  return (
    <FormProvider {...methods}>
      <form className="space-y-4 overflow-y-auto" onSubmit={methods.handleSubmit(onSubmit)}>
        <RoomInfo 
          roomType={formData.roomType} 
          roomPrice={formData.roomPrice} 
        />
        
        <DateSelection 
          totalNights={formData.totalNights}
          totalAmount={formData.totalAmount}
        />
        
        <CustomerMapping 
          commandOpen={commandOpen}
          setCommandOpen={setCommandOpen}
          searchCustomer={searchCustomer}
          onSearchChange={onSearchChange}
          filteredGuests={filteredGuests}
          guests={guests}
        />
        
        <PersonalInfo />
        
        <FormActions 
          onClose={onClose} 
          isSubmitting={methods.formState.isSubmitting}
        />
      </form>
    </FormProvider>
  );
};

export default GuestInformationForm;
