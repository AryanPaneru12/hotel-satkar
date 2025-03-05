
import React from 'react';
import TransitionWrapper from '@/components/ui/TransitionWrapper';
import { cn } from '@/lib/utils';

const AboutUsSection = () => {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <TransitionWrapper delay={300}>
            <div className="relative">
              <div className={cn(
                "rounded-lg overflow-hidden shadow-xl",
                "before:absolute before:inset-0 before:bg-hotel-600/20 before:z-10"
              )}>
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" 
                  alt="Scenic view of Pokhara lake and mountains" 
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg md:max-w-[300px] z-20">
                <h3 className="text-xl font-bold text-hotel-700 mb-2">Integrating Traditions</h3>
                <p className="text-gray-600">Our hospitality is rooted in Nepali traditions that have welcomed travelers for centuries.</p>
              </div>
            </div>
          </TransitionWrapper>
          
          <TransitionWrapper delay={400}>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Redefining Luxury
              </h2>
              <p className="text-xl text-hotel-700 font-medium">
                Integrating traditions and culture at SATKAR, we do from heart
              </p>
              <p className="text-gray-600">
                Nestled in the heart of Pokhara with breathtaking views of Phewa Lake and the majestic Annapurna range, Satkar is more than just a hotel — it's an experience that blends traditional Nepali hospitality with modern luxury.
              </p>
              <p className="text-gray-600">
                Our name "Satkar" represents the essence of heartfelt hospitality that has been integral to Nepali culture for generations. We believe true luxury lies in authentic experiences, personalized service, and creating moments that become cherished memories.
              </p>
              <p className="text-gray-600">
                From locally sourced materials in our architecture to traditional textiles in our decor, every detail at Satkar celebrates Nepal's rich cultural heritage while providing all the modern comforts you expect.
              </p>
            </div>
          </TransitionWrapper>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
