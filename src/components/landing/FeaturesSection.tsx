
import React from 'react';
import { Bed, Calendar, IndianRupee } from 'lucide-react';
import TransitionWrapper from '@/components/ui/TransitionWrapper';

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  delay: number; 
}) => (
  <TransitionWrapper delay={delay}>
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <div className="bg-hotel-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </TransitionWrapper>
);

const FeaturesSection = () => {
  return (
    <section id="amenities" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <TransitionWrapper delay={200}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Experience Luxury in the Heart of Pokhara</h2>
        </TransitionWrapper>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Bed className="h-8 w-8 text-hotel-700" />}
            title="Luxurious Rooms"
            description="Elegantly designed rooms with modern amenities for your comfort."
            delay={300}
          />
          
          <FeatureCard 
            icon={<IndianRupee className="h-8 w-8 text-hotel-700" />}
            title="Pre-Payment Only"
            description="Secure your stay with easy online pre-payment options using PayPal."
            delay={400}
          />
          
          <FeatureCard 
            icon={<Calendar className="h-8 w-8 text-hotel-700" />}
            title="Instant Booking"
            description="Check availability and book your stay in real-time with instant confirmation."
            delay={500}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
