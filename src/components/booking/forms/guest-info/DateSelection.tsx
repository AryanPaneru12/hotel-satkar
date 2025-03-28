
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, addDays, isBefore } from 'date-fns';

interface DateSelectionProps {
  checkInDate: Date | undefined;
  checkOutDate: Date | undefined;
  onFormDataChange: (field: string, value: any) => void;
  errors: {
    checkInDate?: string;
    checkOutDate?: string;
  };
  totalNights: number;
  totalAmount: number;
}

const DateSelection: React.FC<DateSelectionProps> = ({
  checkInDate,
  checkOutDate,
  onFormDataChange,
  errors,
  totalNights,
  totalAmount
}) => {
  return (
    <>
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
                {checkInDate ? format(checkInDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkInDate}
                onSelect={(date) => {
                  onFormDataChange('checkInDate', date);
                  if (date && checkOutDate && isBefore(checkOutDate, date)) {
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
                {checkOutDate ? format(checkOutDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkOutDate}
                onSelect={(date) => onFormDataChange('checkOutDate', date)}
                initialFocus
                disabled={(date) => 
                  isBefore(date, new Date()) || 
                  (checkInDate ? isBefore(date, checkInDate) || isBefore(date, addDays(checkInDate, 1)) : false)
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
