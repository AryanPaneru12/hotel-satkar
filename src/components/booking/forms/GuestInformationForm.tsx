
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { User, CalendarIcon, ChevronsUpDown, Info, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { addDays, format, differenceInDays, isBefore } from 'date-fns';
import { Guest } from '@/types';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="roomType">Room Type</Label>
          <Input 
            id="roomType" 
            value={formData.roomType || "Standard Room"} 
            disabled 
            className="bg-muted"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="price">Price Per Night</Label>
          <Input 
            id="price" 
            value={`Rs. ${(formData.roomPrice || 9900).toLocaleString()}`} 
            disabled 
            className="bg-muted"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="checkIn">Check-In Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  errors.checkInDate && "border-red-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.checkInDate ? format(formData.checkInDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.checkInDate}
                onSelect={(date) => {
                  onFormDataChange('checkInDate', date);
                  if (date && formData.checkOutDate && isBefore(formData.checkOutDate, date)) {
                    onFormDataChange('checkOutDate', addDays(date, 1));
                  }
                }}
                disabled={(date) => isBefore(date, new Date())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.checkInDate && (
            <p className="text-xs text-red-500">{errors.checkInDate}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="checkOut">Check-Out Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  errors.checkOutDate && "border-red-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.checkOutDate ? format(formData.checkOutDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.checkOutDate}
                onSelect={(date) => onFormDataChange('checkOutDate', date)}
                initialFocus
                disabled={(date) => 
                  isBefore(date, new Date()) || 
                  (formData.checkInDate ? isBefore(date, formData.checkInDate) || isBefore(date, addDays(formData.checkInDate, 1)) : false)
                }
              />
            </PopoverContent>
          </Popover>
          {errors.checkOutDate && (
            <p className="text-xs text-red-500">{errors.checkOutDate}</p>
          )}
        </div>
      </div>

      <div className="p-3 border rounded-lg bg-muted/30">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="text-muted-foreground">Total Stay:</span> {formData.totalNights} {formData.totalNights === 1 ? 'night' : 'nights'}
          </div>
          <div className="text-sm font-bold">
            <span className="text-muted-foreground">Total:</span> Rs. {formData.totalAmount.toLocaleString()}
          </div>
        </div>
      </div>
      
      <div className="border rounded-lg p-4 bg-muted/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-medium">Customer Mapping</h3>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="useExistingCustomer" 
              className="mr-2"
              checked={formData.useExistingCustomer}
              onChange={(e) => onFormDataChange('useExistingCustomer', e.target.checked)}
            />
            <Label htmlFor="useExistingCustomer">Use Existing Customer</Label>
          </div>
        </div>
        
        {formData.useExistingCustomer && (
          <div className="space-y-3">
            <Label htmlFor="customerSearch">Select Customer</Label>
            <Popover open={formData.commandOpen} onOpenChange={setCommandOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={formData.commandOpen}
                  className="w-full justify-between"
                >
                  {formData.selectedCustomerId ? 
                    guests.find(g => g.id === formData.selectedCustomerId)?.name || "Search customers..." : 
                    "Search customers..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0 bg-white" align="start">
                <Command>
                  <CommandInput 
                    placeholder="Search by name or ID..." 
                    value={formData.searchCustomer}
                    onValueChange={(value) => onFormDataChange('searchCustomer', value)}
                    className="h-9"
                  />
                  <CommandEmpty>No customer found.</CommandEmpty>
                  <CommandGroup className="max-h-[200px] overflow-auto">
                    {filteredGuests.map(guest => (
                      <CommandItem
                        key={guest.id}
                        value={guest.id}
                        onSelect={(value) => {
                          onFormDataChange('selectedCustomerId', value);
                          setCommandOpen(false);
                        }}
                      >
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          <span>{guest.name}</span>
                        </div>
                        <span className="ml-auto text-xs text-muted-foreground">
                          ID: {guest.id}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            
            {formData.selectedCustomerId && (
              <div className="text-sm bg-primary/10 p-2 rounded flex items-center">
                <Info className="h-4 w-4 mr-2 text-primary" />
                Customer profile details loaded. You can modify if needed.
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            id="fullName"
            placeholder="John Smith"
            className={cn("pl-10", errors.fullName && "border-red-500")}
            value={formData.fullName}
            onChange={(e) => onFormDataChange('fullName', e.target.value)}
            required
          />
        </div>
        {errors.fullName && (
          <p className="text-xs text-red-500">{errors.fullName}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className={cn(errors.email && "border-red-500")}
            value={formData.email}
            onChange={(e) => onFormDataChange('email', e.target.value)}
            required
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="+91 9012345678"
            className={cn(errors.phone && "border-red-500")}
            value={formData.phone}
            onChange={(e) => onFormDataChange('phone', e.target.value)}
            required
          />
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="idType">ID Type</Label>
          <Select 
            value={formData.idType} 
            onValueChange={(value) => onFormDataChange('idType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select ID type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="passport">Passport</SelectItem>
              <SelectItem value="aadhar">Aadhar Card</SelectItem>
              <SelectItem value="driving">Driving License</SelectItem>
              <SelectItem value="voter">Voter ID</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="idNumber">ID Number</Label>
          <Input
            id="idNumber"
            placeholder="Enter ID number"
            className={cn(errors.idNumber && "border-red-500")}
            value={formData.idNumber}
            onChange={(e) => onFormDataChange('idNumber', e.target.value)}
            required
          />
          {errors.idNumber && (
            <p className="text-xs text-red-500">{errors.idNumber}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
        <Textarea
          id="specialRequests"
          placeholder="Any special requirements..."
          className="min-h-[80px]"
          value={formData.specialRequests}
          onChange={(e) => onFormDataChange('specialRequests', e.target.value)}
        />
      </div>
      
      <div className="pt-4 flex justify-between">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          type="button" 
          onClick={onNextStep}
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default GuestInformationForm;
