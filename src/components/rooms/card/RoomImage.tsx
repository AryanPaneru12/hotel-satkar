
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Room } from '@/types';
import { Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoomImageProps {
  room: Room;
  isHovered: boolean;
  isAdmin: boolean;
  onShowStatusModal: () => void;
}

const RoomImage = ({ room, isHovered, isAdmin, onShowStatusModal }: RoomImageProps) => {
  const statusColorMap = {
    'Available': 'bg-green-100 text-green-800 border-green-200',
    'Occupied': 'bg-red-100 text-red-800 border-red-200',
    'Maintenance': 'bg-orange-100 text-orange-800 border-orange-200',
    'Reserved': 'bg-blue-100 text-blue-800 border-blue-200',
  };

  const getRoomImage = () => {
    if (room.images && room.images.length > 0) {
      return room.images[0].replace('/ankit-uploads/', '/lovable-uploads/');
    }
    
    const roomImages = {
      'Standard': '/lovable-uploads/65411b44-d58a-4ca3-b6e0-524c1dc50484.png',
      'Deluxe': '/lovable-uploads/31cf91b6-22a8-4382-9199-d680609bd325.png',
      'Suite': '/lovable-uploads/a1f17f98-5fbc-49ce-93d7-77dae3cc0241.png',
      'Presidential': '/lovable-uploads/c4d1d1b1-b6f7-4bc8-8d3e-ce3e4af224f1.png'
    };
    
    return roomImages[room.type] || '/placeholder.svg';
  };

  return (
    <div className="h-52 relative overflow-hidden">
      <img 
        src={getRoomImage()} 
        alt={`Room ${room.number}`} 
        className={cn(
          "w-full h-full object-cover transition-transform duration-700",
          isHovered ? "scale-110" : "scale-100"
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      <div className="absolute top-3 right-3">
        <Badge variant="outline" className={cn("border font-medium", statusColorMap[room.status])}>
          {room.status}
        </Badge>
      </div>
      
      {isAdmin && (
        <div className="absolute top-3 left-3">
          <Button 
            size="icon" 
            variant="outline" 
            className="h-8 w-8 bg-white bg-opacity-90 hover:bg-white"
            onClick={onShowStatusModal}
          >
            <Settings className="h-4 w-4 text-gray-700" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default RoomImage;
