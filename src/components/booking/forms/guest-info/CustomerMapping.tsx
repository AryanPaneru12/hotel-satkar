
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { User, ChevronsUpDown, Info } from 'lucide-react';
import { Guest } from '@/types';
import { FormField, FormItem } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

interface CustomerMappingProps {
  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
  searchCustomer: string;
  onSearchChange: (value: string) => void;
  filteredGuests: Guest[];
  guests: Guest[];
}

const CustomerMapping: React.FC<CustomerMappingProps> = ({
  commandOpen,
  setCommandOpen,
  searchCustomer,
  onSearchChange,
  filteredGuests = [], // Default empty array
  guests = [] // Default empty array
}) => {
  const { watch, setValue } = useFormContext();
  const useExistingCustomer = watch('useExistingCustomer');
  const selectedCustomerId = watch('selectedCustomerId');
  
  return (
    <div className="border rounded-lg p-4 bg-muted/20">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-medium">Customer Mapping</h3>
        <div className="flex items-center">
          <FormField
            name="useExistingCustomer"
            render={({ field }) => (
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="useExistingCustomer" 
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="useExistingCustomer">Use Existing Customer</Label>
              </div>
            )}
          />
        </div>
      </div>
      
      {useExistingCustomer && (
        <div className="space-y-3">
          <Label htmlFor="customerSearch">Select Customer</Label>
          <Popover open={commandOpen} onOpenChange={setCommandOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={commandOpen}
                className="w-full justify-between"
              >
                {selectedCustomerId ? 
                  guests.find(g => g.id === selectedCustomerId)?.name || "Search customers..." : 
                  "Search customers..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0 bg-white" align="start">
              <Command>
                <CommandInput 
                  placeholder="Search by name or ID..." 
                  value={searchCustomer}
                  onValueChange={onSearchChange}
                  className="h-9"
                />
                {Array.isArray(filteredGuests) && filteredGuests.length > 0 ? (
                  <CommandGroup className="max-h-[200px] overflow-auto">
                    {filteredGuests.map(guest => (
                      <CommandItem
                        key={guest.id}
                        value={guest.id}
                        onSelect={(value) => {
                          setValue('selectedCustomerId', value);
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
                ) : (
                  <CommandEmpty>No customer found.</CommandEmpty>
                )}
              </Command>
            </PopoverContent>
          </Popover>
          
          {selectedCustomerId && (
            <div className="text-sm bg-primary/10 p-2 rounded flex items-center">
              <Info className="h-4 w-4 mr-2 text-primary" />
              Customer profile details loaded. You can modify if needed.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerMapping;
