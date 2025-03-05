
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import TransitionWrapper from '@/components/ui/TransitionWrapper';

interface HeroSectionProps {
  onBookNowClick: () => void;
}

const HeroSection = ({ onBookNowClick }: HeroSectionProps) => {
  return (
    <header id="home" className="relative bg-gradient-to-r from-hotel-900 to-hotel-700 text-white py-24 md:py-32">
      <div 
        className="absolute inset-0 bg-black opacity-40 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'overlay'
        }}
      ></div>
      <div className="container mx-auto px-4 z-10 relative">
        <TransitionWrapper delay={100}>
          <h1 className="text-5xl md:text-7xl font-bold mb-4"><em>Satkar</em></h1>
          <p className="text-xl md:text-2xl mb-8"><em>Redefining Luxury</em> - <span className="font-light">Where Traditions Meet Modern Comfort</span></p>
          <div className="flex space-x-2 items-center mb-12">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <Star key={index} className="h-5 w-5 fill-current text-yellow-400" />
            ))}
          </div>
          <Button 
            size="lg" 
            className="bg-white text-hotel-900 hover:bg-gray-100 text-lg font-semibold px-8"
            onClick={onBookNowClick}
          >
            Book Now
          </Button>
        </TransitionWrapper>
      </div>
    </header>
  );
};

export default HeroSection;
