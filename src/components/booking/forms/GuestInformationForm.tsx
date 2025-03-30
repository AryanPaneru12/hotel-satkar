
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Guest } from '@/types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import RoomInfo from './guest-info/RoomInfo';
import DateSelection from './guest-info/DateSelection';
import CustomerMapping from './guest-info/CustomerMapping';
import PersonalInfo from './guest-info/PersonalInfo';

export type GuestFormValues = {
  fullName: string;
  email: string;
  phone: string;
  idType: string;
  idNumber: string;
  specialRequests?: string;
  checkInDate: Date;
  checkOutDate: Date;
  useExistingCustomer: boolean;
  selectedCustomerId?: string;
};

interface GuestInformationFormProps {
  onSubmit: () => void;
  onClose: () => void;
  setCommandOpen: (open: boolean) => void;
  commandOpen: boolean;
  searchCustomer: string;
  onSearchChange: (value: string) => void;
  filteredGuests: Guest[];
  guests: Guest[];
}

const GuestInformationForm: React.FC<GuestInformationFormProps> = ({
  onSubmit,
  onClose,
  setCommandOpen,
  commandOpen,
  searchCustomer,
  onSearchChange,
  filteredGuests,
  guests
}) => {
  const { handleSubmit, formState: { errors } } = useFormContext();
  
  const hasErrors = Object.keys(errors).length > 0;
  
  return (
    <form className="space-y-4 overflow-y-auto" onSubmit={handleSubmit(onSubmit)}>
      {hasErrors && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription className="flex items-center">
            <Info className="h-4 w-4 mr-2" />
            Please correct the errors in the form before proceeding.
          </AlertDescription>
        </Alert>
      )}
      
      <RoomInfo 
        onClose={onClose}
        onNext={onSubmit}
      />
      
      <DateSelection />
      
      <CustomerMapping 
        commandOpen={commandOpen}
        setCommandOpen={setCommandOpen}
        searchCustomer={searchCustomer}
        onSearchChange={onSearchChange}
        filteredGuests={filteredGuests}
        guests={guests}
      />
      
      <PersonalInfo />
    </form>
  );
};

export default GuestInformationForm;
