
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';

const PersonalInfo: React.FC = () => {
  const { control } = useFormContext();

  return (
    <>
      <FormField
        control={control}
        name="fullName"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <FormControl>
                <Input
                  id="fullName"
                  placeholder="John Smith"
                  className="pl-10"
                  {...field}
                  required
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <FormControl>
                <Input
                  id="phone"
                  placeholder="+91 9012345678"
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="idType"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <Label htmlFor="idType">ID Type</Label>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="aadhar">Aadhar Card</SelectItem>
                  <SelectItem value="driving">Driving License</SelectItem>
                  <SelectItem value="voter">Voter ID</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="idNumber"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <Label htmlFor="idNumber">ID Number</Label>
              <FormControl>
                <Input
                  id="idNumber"
                  placeholder="Enter ID number"
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={control}
        name="specialRequests"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
            <FormControl>
              <Textarea
                id="specialRequests"
                placeholder="Any special requirements..."
                className="min-h-[80px]"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};

export default PersonalInfo;
