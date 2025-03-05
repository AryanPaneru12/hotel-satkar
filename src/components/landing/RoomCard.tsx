
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import BookingForm from '@/components/booking/BookingForm';
import { useAuth } from '@/contexts/AuthContext';

interface RoomCardProps {
  title: string;
  description: string;
  image: string;
  features: string[];
  price: number;
  delay: number;
  onBookClick: () => void;
}

const RoomCard = ({
  title,
  description,
  image,
  features,
  price,
  delay,
  onBookClick
}: RoomCardProps) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const { user } = useAuth();
  
  const handleBookClick = () => {
    if (!user) {
      // If user is not logged in, show login modal via the parent component
      onBookClick();
    } else {
      // If user is logged in, show booking form directly
      setShowBookingForm(true);
    }
  };
  
  return (
    <TransitionWrapper delay={delay}>
      <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-lg">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          />
          <Badge className="absolute top-2 right-2 bg-primary/90">
            Rs. {format(price, "0,0")}
          </Badge>
        </div>
        <CardContent className="pt-4 flex-1">
          <h3 className="font-bold text-lg mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="text-xs text-gray-600 flex items-center">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1 text-primary">
                  <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="pt-0">
          <Button 
            variant="default" 
            className="w-full"
            onClick={handleBookClick}
          >
            Book Now
          </Button>
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

export default RoomCard;
