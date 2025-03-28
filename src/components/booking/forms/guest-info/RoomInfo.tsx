
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

const RoomInfo: React.FC = () => {
  const { watch } = useFormContext();
  const roomType = watch('roomType');
  const roomPrice = watch('roomPrice');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="roomType">Room Type</Label>
        <Input 
          id="roomType" 
          value={roomType || "Standard Room"} 
          disabled 
          className="bg-muted"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="price">Price Per Night</Label>
        <Input 
          id="price" 
          value={`Rs. ${(roomPrice || 9900).toLocaleString()}`} 
          disabled 
          className="bg-muted"
        />
      </div>
    </div>
  );
};

export default RoomInfo;
