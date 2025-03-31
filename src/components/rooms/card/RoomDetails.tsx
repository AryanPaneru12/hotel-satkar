
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Check, Info } from 'lucide-react';
import { Room } from '@/types';

interface RoomDetailsProps {
  room: Room;
  formattedPrice: string;
}

const RoomDetails = ({ room, formattedPrice }: RoomDetailsProps) => {
  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Room {room.number}</h3>
        <span className="text-lg font-semibold text-primary">{formattedPrice}/night</span>
      </div>
      
      <div className="mb-4">
        <Badge variant="secondary" className="mr-2 mb-2 transition-colors hover:bg-secondary/80">
          {room.type}
        </Badge>
        <Badge variant="outline" className="mr-2 mb-2 transition-colors hover:bg-muted">
          {room.capacity} {room.capacity === 1 ? 'Guest' : 'Guests'}
        </Badge>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Amenities</h4>
        <div className="flex flex-wrap gap-1.5 text-sm">
          {room.amenities.slice(0, 3).map((amenity) => (
            <div key={amenity} className="flex items-center text-muted-foreground">
              <Check className="h-3 w-3 mr-1 text-primary" />
              <span>{amenity}</span>
            </div>
          ))}
          {room.amenities.length > 3 && (
            <div className="flex items-center text-muted-foreground">
              <Info className="h-3 w-3 mr-1" />
              <span>+{room.amenities.length - 3} more</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
