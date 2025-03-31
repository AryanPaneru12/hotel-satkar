
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface LandingRoomActionsProps {
  isLoading: boolean;
  onBookClick: () => void;
}

const LandingRoomActions = ({ isLoading, onBookClick }: LandingRoomActionsProps) => {
  return (
    <Button 
      variant="default" 
      className="w-full bg-hotel-700 hover:bg-hotel-800 text-white transition-colors"
      onClick={onBookClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        "Book Now"
      )}
    </Button>
  );
};

export default LandingRoomActions;
