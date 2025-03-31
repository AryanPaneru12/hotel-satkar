
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Room } from '@/types';

interface RoomActionsProps {
  room: Room;
  isLoading: boolean;
  onBookClick: () => void;
  onDetailsClick: () => void;
}

const RoomActions = ({ room, isLoading, onBookClick, onDetailsClick }: RoomActionsProps) => {
  return (
    <div className="mt-auto pt-2 flex space-x-2 p-5 pt-0">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex-1 hover:bg-muted transition-colors"
        onClick={onDetailsClick}
      >
        Details
      </Button>
      <Button 
        size="sm" 
        className="flex-1 bg-hotel-700 hover:bg-hotel-800 transition-colors"
        disabled={isLoading || room.status !== 'Available'}
        onClick={onBookClick}
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
  );
};

export default RoomActions;
