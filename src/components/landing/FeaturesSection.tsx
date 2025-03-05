
import React from 'react';
import { Bed, CreditCard, Database } from 'lucide-react';
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
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md text-center h-full flex flex-col">
      <div className="bg-hotel-100 w-14 h-14 md:w-16 md:h-16 mx-auto rounded-full flex items-center justify-center mb-3 md:mb-4">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{title}</h3>
      <p className="text-sm md:text-base text-gray-600">{description}</p>
    </div>
  </TransitionWrapper>
);

const FeaturesSection = () => {
  return (
    <section id="amenities" className="py-10 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <TransitionWrapper delay={200}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2 md:mb-4">Experience Luxury in the Heart of Pokhara</h2>
          <p className="text-center text-gray-600 mb-8 md:mb-16 max-w-2xl mx-auto text-sm md:text-base">
            <em>Where traditions meet modern comfort</em>, creating an unforgettable stay amidst breathtaking mountain views.
          </p>
        </TransitionWrapper>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          <FeatureCard 
            icon={<Bed className="h-6 w-6 md:h-8 md:w-8 text-hotel-700" />}
            title="Luxurious Rooms"
            description="Elegantly designed rooms with modern amenities for your comfort."
            delay={300}
          />
          
          <FeatureCard 
            icon={<CreditCard className="h-6 w-6 md:h-8 md:w-8 text-hotel-700" />}
            title="Secure Payments"
            description="Enjoy seamless and secure payment processing for your bookings using Stripe."
            delay={400}
          />
          
          <FeatureCard 
            icon={<Database className="h-6 w-6 md:h-8 md:w-8 text-hotel-700" />}
            title="Advanced Technology"
            description="Built with React frontend and Node.js backend, powered by MongoDB database."
            delay={500}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
