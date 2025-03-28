
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { User, ChevronsUpDown, Info } from 'lucide-react';
import { Guest } from '@/types';

interface CustomerMappingProps {
  useExistingCustomer: boolean;
  onFormDataChange: (field: string, value: any) => void;
  selectedCustomerId: string;
  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
  searchCustomer: string;
  filteredGuests: Guest[];
  guests: Guest[];
}

const CustomerMapping: React.FC<CustomerMappingProps> = ({
  useExistingCustomer,
  onFormDataChange,
  selectedCustomerId,
  commandOpen,
  setCommandOpen,
  searchCustomer,
  filteredGuests,
  guests
}) => {
  return (
    <div className="border rounded-lg p-4 bg-muted/20">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-medium">Customer Mapping</h3>
        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="useExistingCustomer" 
            className="mr-2"
            checked={useExistingCustomer}
            onChange={(e) => onFormDataChange('useExistingCustomer', e.target.checked)}
          />
          <Label htmlFor="useExistingCustomer">Use Existing Customer</Label>
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
