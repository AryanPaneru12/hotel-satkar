
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, addDays, isBefore } from 'date-fns';
import { FormItem, FormControl, FormField, FormMessage } from '@/components/ui/form';

interface DateSelectionProps {
  totalNights: number;
  totalAmount: number;
}

const DateSelection: React.FC<DateSelectionProps> = ({
  totalNights,
  totalAmount
}) => {
  const { control, watch, setValue } = useFormContext();
  const checkInDate = watch('checkInDate');

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="checkInDate"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <Label htmlFor="checkIn">Check-In Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      id="checkIn"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, "PPP") : "Select date"}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                      const checkOutDate = watch('checkOutDate');
                      if (date && checkOutDate && isBefore(checkOutDate, date)) {
                        setValue('checkOutDate', addDays(date, 1), { shouldValidate: true });
                      }
                    }}
                    disabled={(date) => isBefore(date, new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="checkOutDate"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <Label htmlFor="checkOut">Check-Out Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      id="checkOut"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, "PPP") : "Select date"}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    disabled={(date) => 
                      isBefore(date, new Date()) || 
                      (checkInDate ? isBefore(date, checkInDate) || isBefore(date, addDays(checkInDate, 1)) : false)
                    }
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="p-3 border rounded-lg bg-muted/30">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="text-muted-foreground">Total Stay:</span> {totalNights} {totalNights === 1 ? 'night' : 'nights'}
          </div>
          <div className="text-sm font-bold">
            <span className="text-muted-foreground">Total:</span> Rs. {totalAmount.toLocaleString()}
          </div>
        </div>
      </div>
    </>
  );
};

export default DateSelection;
