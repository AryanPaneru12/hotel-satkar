
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import BookingForm from '@/components/booking/BookingForm';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import LandingRoomImage from './LandingRoomImage';
import LandingRoomContent from './LandingRoomContent';
import LandingRoomActions from './LandingRoomActions';
import { formatPrice } from '@/components/shared/formatters';

interface LandingRoomCardProps {
  title: string;
  description: string;
  image: string;
  features: string[];
  price: number;
  delay: number;
  onBookClick: () => void;
}

const LandingRoomCard = ({
  title,
  description,
  image,
  features,
  price,
  delay,
  onBookClick
}: LandingRoomCardProps) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const formattedPrice = formatPrice(price);
  
  const handleBookClick = () => {
    setIsLoading(true);
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to book a room",
      });
      
      setTimeout(() => {
        setIsLoading(false);
        onBookClick();
      }, 800);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setShowBookingForm(true);
      }, 500);
    }
  };
  
  return (
    <TransitionWrapper delay={delay}>
      <Card 
        className="overflow-hidden h-full flex flex-col transition-all hover:shadow-lg border-0 shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <LandingRoomImage 
          image={image}
          price={price}
          formattedPrice={formattedPrice}
          isHovered={isHovered}
        />
        
        <CardContent className="flex-1">
          <LandingRoomContent
            title={title}
            description={description}
            features={features}
          />
        </CardContent>
        
        <CardFooter className="pt-0">
          <LandingRoomActions
            isLoading={isLoading}
            onBookClick={handleBookClick}
          />
        </CardFooter>
      </Card>
      
      {showBookingForm && (
        <BookingForm 
          isOpen={showBookingForm}
          onClose={() => setShowBookingForm(false)}
          roomType={title}
          roomPrice={price}
        />
      )}
    </TransitionWrapper>
  );
};

export default LandingRoomCard;
