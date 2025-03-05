
import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TransitionWrapper from '@/components/ui/TransitionWrapper';

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
  return (
    <TransitionWrapper delay={delay}>
      <Card>
        <CardHeader className="p-0">
          <div className="h-60 overflow-hidden rounded-t-lg">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <CardTitle>{title}</CardTitle>
          <CardDescription className="mt-2">
            {description}
          </CardDescription>
          <div className="mt-4 space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <Check className="h-4 w-4 text-hotel-600 mr-2" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 font-semibold text-lg">
            Rs. {price.toLocaleString()} <span className="text-sm font-normal text-gray-500">per night</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={onBookClick}>
            Book Now
          </Button>
        </CardFooter>
      </Card>
    </TransitionWrapper>
  );
};

export default RoomCard;
