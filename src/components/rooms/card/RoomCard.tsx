
import React, { useState } from 'react';
import { Room } from '@/types';
import { cn } from '@/lib/utils';
import TransitionWrapper from '../../ui/TransitionWrapper';
import BookingForm from '../../booking/BookingForm';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import RoomStatusModal from '../RoomStatusModal';
import RoomImage from './RoomImage';
import RoomDetails from './RoomDetails';
import RoomActions from './RoomActions';
import { formatPrice } from './formatters';

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
  
  const formattedPrice = formatPrice(room.price);
  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';

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

  return (
    <>
      <TransitionWrapper delay={delay}>
        <div 
          className="bg-card rounded-lg shadow-card overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <RoomImage 
            room={room} 
            isHovered={isHovered} 
            isAdmin={isAdmin} 
            onShowStatusModal={() => setShowStatusModal(true)} 
          />
          
          <RoomDetails room={room} formattedPrice={formattedPrice} />
          
          <RoomActions 
            room={room} 
            isLoading={isLoading} 
            onBookClick={handleBookClick} 
            onDetailsClick={handleViewDetails} 
          />
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
