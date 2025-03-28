
import React from 'react';
import { Guest } from '@/types';
import RoomInfo from './guest-info/RoomInfo';
import DateSelection from './guest-info/DateSelection';
import CustomerMapping from './guest-info/CustomerMapping';
import PersonalInfo from './guest-info/PersonalInfo';
import FormActions from './guest-info/FormActions';

type FormErrors = {
  [key: string]: string;
};

interface GuestInformationFormProps {
  formData: {
    roomType: string | undefined;
    roomPrice: number | undefined;
    fullName: string;
    email: string;
    phone: string;
    idType: string;
    idNumber: string;
    specialRequests: string;
    checkInDate: Date | undefined;
    checkOutDate: Date | undefined;
    customerCredibilityScore: number;
    useExistingCustomer: boolean;
    selectedCustomerId: string;
    searchCustomer: string;
    commandOpen: boolean;
    totalNights: number;
    totalAmount: number;
  };
  guests: Guest[];
  filteredGuests: Guest[];
  errors: FormErrors;
  onFormDataChange: (field: string, value: any) => void;
  onNextStep: () => void;
  onClose: () => void;
  setCommandOpen: (open: boolean) => void;
}

const GuestInformationForm: React.FC<GuestInformationFormProps> = ({
  formData,
  guests,
  filteredGuests,
  errors,
  onFormDataChange,
  onNextStep,
  onClose,
  setCommandOpen
}) => {
  return (
    <form className="space-y-4 overflow-y-auto">
      <RoomInfo 
        roomType={formData.roomType} 
        roomPrice={formData.roomPrice} 
      />
      
      <DateSelection 
        checkInDate={formData.checkInDate}
        checkOutDate={formData.checkOutDate}
        onFormDataChange={onFormDataChange}
        errors={errors}
        totalNights={formData.totalNights}
        totalAmount={formData.totalAmount}
      />
      
      <CustomerMapping 
        useExistingCustomer={formData.useExistingCustomer}
        onFormDataChange={onFormDataChange}
        selectedCustomerId={formData.selectedCustomerId}
        commandOpen={formData.commandOpen}
        setCommandOpen={setCommandOpen}
        searchCustomer={formData.searchCustomer}
        filteredGuests={filteredGuests}
        guests={guests}
      />
      
      <PersonalInfo 
        fullName={formData.fullName}
        email={formData.email}
        phone={formData.phone}
        idType={formData.idType}
        idNumber={formData.idNumber}
        specialRequests={formData.specialRequests}
        onFormDataChange={onFormDataChange}
        errors={errors}
      />
      
      <FormActions 
        onClose={onClose} 
        onNextStep={onNextStep} 
      />
    </form>
  );
};

export default GuestInformationForm;
