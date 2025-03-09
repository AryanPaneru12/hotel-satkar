
import React from 'react';
import RoomCard from './RoomCard';
import TransitionWrapper from '@/components/ui/TransitionWrapper';

interface RoomsSectionProps {
  onBookNowClick: () => void;
}

const RoomsSection = ({ onBookNowClick }: RoomsSectionProps) => {
  const rooms = [
    {
      title: "Standard Room",
      description: "Comfortable and cozy room with breathtaking mountain views.",
      image: "public/lovable-uploads/65411b44-d58a-4ca3-b6e0-524c1dc50484.png",
      features: ["Wi-Fi & Smart TV", "Air Conditioning", "Mountain View Balcony"],
      price: 9900,
      delay: 700
    },
    {
      title: "Deluxe Room",
      description: "Spacious room with premium amenities and panoramic Himalayan vista.",
      image: "public/lovable-uploads/127a805a-a683-4d65-8411-a8640d5f839c.png",
      features: ["Premium Wi-Fi & Smart TV", "Mini Bar & Safe", "Private Balcony with Mountain View"],
      price: 14900,
      delay: 800
    },
    {
      title: "Suite",
      description: "Luxurious suite with separate living area and unparalleled Annapurna views.",
      image: "public/lovable-uploads/7f333ea6-b0d6-44ca-90c8-ec02f7f9902a.png",
      features: ["Living Room & Private Terrace", "Premium Dining Area", "Panoramic Mountain Views"],
      price: 29900,
      delay: 900
    },
    {
      title: "Presidential Suite",
      description: "The ultimate luxury experience with infinity pool and Himalayan panorama.",
      image: "public/lovable-uploads/7f6ee3f4-9ad1-4dfd-907c-5b2a6b33460b.png",
      features: ["Private Infinity Pool", "Exclusive Panoramic Views", "Private Dining & Butler Service"],
      price: 59900,
      delay: 1000
    }
  ];

  return (
    <section id="rooms" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <TransitionWrapper delay={600}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Accommodations</h2>
          <p className="text-xl text-center text-gray-600 mb-16">Choose from our range of exquisite rooms with spectacular mountain views</p>
        </TransitionWrapper>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {rooms.map((room, index) => (
            <RoomCard
              key={index}
              title={room.title}
              description={room.description}
              image={room.image}
              features={room.features}
              price={room.price}
              delay={room.delay}
              onBookClick={onBookNowClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;
