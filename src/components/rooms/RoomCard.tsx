
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Room } from '@/types';
import { cn } from '@/lib/utils';
import { Check, Info } from 'lucide-react';
import TransitionWrapper from '../ui/TransitionWrapper';
import BookingForm from '../booking/BookingForm';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface RoomCardProps {
  room: Room;
  delay?: number;
}

const RoomCard = ({ room, delay = 0 }: RoomCardProps) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Map room types to our new images
  const roomImages = {
    'Standard': "public/lovable-uploads/65411b44-d58a-4ca3-b6e0-524c1dc50484.png",
    'Deluxe': "public/lovable-uploads/f8913d78-265e-419a-8d99-0a66c4dfa584.png",
    'Suite': "public/lovable-uploads/a1f17f98-5fbc-49ce-93d7-77dae3cc0241.png",
    'Presidential': "public/lovable-uploads/7f6ee3f4-9ad1-4dfd-907c-5b2a6b33460b.png"
  };
  
  const statusColorMap = {
    'Available': 'bg-green-100 text-green-800 border-green-200',
    'Occupied': 'bg-red-100 text-red-800 border-red-200',
    'Maintenance': 'bg-orange-100 text-orange-800 border-orange-200',
    'Reserved': 'bg-blue-100 text-blue-800 border-blue-200',
  };

  const handleBookClick = () => {
    if (!user) {
      // Redirect to landing page with login modal
      navigate('/?login=true');
      return;
    }
    
    // If user is logged in, show booking form directly
    setShowBookingForm(true);
  };

  return (
    <>
      <TransitionWrapper delay={delay}>
        <div className="bg-card rounded-lg shadow-card overflow-hidden card-hover border-0 shadow-md">
          {/* Room Image */}
          <div className="h-52 relative overflow-hidden">
            <img 
              src={roomImages[room.type] || '/placeholder.svg'} 
              alt={`Room ${room.number}`} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute top-3 right-3">
              <Badge variant="outline" className={cn("border font-medium", statusColorMap[room.status])}>
                {room.status}
              </Badge>
            </div>
          </div>
          
          {/* Room Details */}
          <div className="p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Room {room.number}</h3>
              <span className="text-lg font-semibold text-primary">${room.price}/night</span>
            </div>
            
            <div className="mb-4">
              <Badge variant="secondary" className="mr-2 mb-2">
                {room.type}
              </Badge>
              <Badge variant="outline" className="mr-2 mb-2">
                {room.capacity} {room.capacity === 1 ? 'Guest' : 'Guests'}
              </Badge>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Amenities</h4>
              <div className="flex flex-wrap gap-1 text-sm">
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
            
            {/* Actions */}
            <div className="mt-auto pt-2 flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
              >
                Details
              </Button>
              <Button 
                size="sm" 
                className="flex-1 bg-hotel-700 hover:bg-hotel-800"
                disabled={room.status !== 'Available'}
                onClick={handleBookClick}
              >
                {room.status === 'Available' ? 'Book Now' : 'Unavailable'}
              </Button>
            </div>
          </div>
        </div>
      </TransitionWrapper>
      
      {showBookingForm && (
        <BookingForm 
          isOpen={showBookingForm} 
          onClose={() => setShowBookingForm(false)}
          roomId={room.id}
          roomType={room.type}
          roomPrice={room.price}
        />
      )}
    </>
  );
};

export default RoomCard;
