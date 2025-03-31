
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import BookingForm from '@/components/booking/BookingForm';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
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
  
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
  
  return (
    <TransitionWrapper delay={delay}>
      <Card 
        className="overflow-hidden h-full flex flex-col transition-all hover:shadow-lg border-0 shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-56 overflow-hidden">
          <img 
            src={image}
            alt={title}
            className={cn(
              "w-full h-full object-cover transition-transform duration-700",
              isHovered ? "scale-105" : "scale-100"
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <Badge className="absolute top-3 right-3 bg-primary/90 text-white font-medium">
            {formattedPrice}
          </Badge>
        </div>
        <CardContent className="pt-5 flex-1">
          <h3 className="font-bold text-xl mb-3 text-hotel-800">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="text-xs text-gray-600 flex items-center">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-primary">
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
            className="w-full bg-hotel-700 hover:bg-hotel-800 text-white transition-colors"
            onClick={handleBookClick}
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
