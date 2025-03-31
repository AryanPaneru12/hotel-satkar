
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface LandingRoomImageProps {
  image: string;
  price: number;
  formattedPrice: string;
  isHovered: boolean;
}

const LandingRoomImage = ({ image, formattedPrice, isHovered }: LandingRoomImageProps) => {
  return (
    <div className="relative h-56 overflow-hidden">
      <img 
        src={image}
        alt="Room"
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
  );
};

export default LandingRoomImage;
