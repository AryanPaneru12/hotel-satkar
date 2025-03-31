
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Room } from '@/types';
import { cn } from '@/lib/utils';
import { Check, Info, Loader2, Settings } from 'lucide-react';
import TransitionWrapper from '../ui/TransitionWrapper';
import BookingForm from '../booking/BookingForm';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import RoomStatusModal from './RoomStatusModal';

interface RoomCardProps {
  room: Room;
  delay?: number;
  onStatusChange?: (roomId: string, status: Room['status'], notes: string) => void;
}

const RoomCard = ({ room, delay = 0, onStatusChange }: RoomCardProps) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(room.price);
  
  const statusColorMap = {
    'Available': 'bg-green-100 text-green-800 border-green-200',
    'Occupied': 'bg-red-100 text-red-800 border-red-200',
    'Maintenance': 'bg-orange-100 text-orange-800 border-orange-200',
    'Reserved': 'bg-blue-100 text-blue-800 border-blue-200',
  };

  const handleBookClick = () => {
    if (room.status !== 'Available') {
      toast({
        title: "Room Unavailable",
        description: `This room is currently ${room.status.toLowerCase()}`,
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to book a room",
      });
      
      setTimeout(() => {
        setIsLoading(false);
        navigate('/?login=true');
      }, 800);
      return;
    }
    
    setTimeout(() => {
      setIsLoading(false);
      setShowBookingForm(true);
    }, 500);
  };

  const handleViewDetails = () => {
    navigate(`/bookings?room=${room.id}`);
  };

  const handleStatusUpdate = (roomId: string, status: Room['status'], notes: string) => {
    if (onStatusChange) {
      onStatusChange(roomId, status, notes);
    }
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

  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';

  return (
    <>
      <TransitionWrapper delay={delay}>
        <div 
          className="bg-card rounded-lg shadow-card overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
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
                  onClick={() => setShowStatusModal(true)}
                >
                  <Settings className="h-4 w-4 text-gray-700" />
                </Button>
              </div>
            )}
          </div>
          
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
            
            <div className="mt-auto pt-2 flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 hover:bg-muted transition-colors"
                onClick={handleViewDetails}
              >
                Details
              </Button>
              <Button 
                size="sm" 
                className="flex-1 bg-hotel-700 hover:bg-hotel-800 transition-colors"
                disabled={isLoading || room.status !== 'Available'}
                onClick={handleBookClick}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    Loading...
                  </>
                ) : room.status === 'Available' ? (
                  'Book Now'
                ) : (
                  'Unavailable'
                )}
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
      
      {showStatusModal && (
        <RoomStatusModal
          isOpen={showStatusModal}
          onClose={() => setShowStatusModal(false)}
          onUpdateStatus={handleStatusUpdate}
          room={room}
        />
      )}
    </>
  );
};

export default RoomCard;
