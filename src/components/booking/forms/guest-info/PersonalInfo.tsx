
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PersonalInfoProps {
  fullName: string;
  email: string;
  phone: string;
  idType: string;
  idNumber: string;
  specialRequests: string;
  onFormDataChange: (field: string, value: any) => void;
  errors: {
    fullName?: string;
    email?: string;
    phone?: string;
    idNumber?: string;
  };
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  fullName,
  email,
  phone,
  idType,
  idNumber,
  specialRequests,
  onFormDataChange,
  errors
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            id="fullName"
            placeholder="John Smith"
            className={cn("pl-10", errors.fullName && "border-red-500")}
            value={fullName}
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
            value={email}
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
            value={phone}
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
            value={idType} 
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
            value={idNumber}
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
          value={specialRequests}
          onChange={(e) => onFormDataChange('specialRequests', e.target.value)}
        />
      </div>
    </>
  );
};

export default PersonalInfo;
