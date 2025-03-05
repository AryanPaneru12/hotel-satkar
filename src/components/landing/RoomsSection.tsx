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
      description: "Comfortable and cozy room with essential amenities.",
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop",
      features: ["Wi-Fi & TV", "Air Conditioning", "Mini Fridge"],
      price: 9900,
      delay: 700
    },
    {
      title: "Deluxe Room",
      description: "Spacious room with premium amenities and mountain view.",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
      features: ["Premium Wi-Fi & Smart TV", "Mini Bar & Safe", "Bathtub & Premium Toiletries"],
      price: 14900,
      delay: 800
    },
    {
      title: "Executive Suite",
      description: "Luxurious suite with separate living area and panoramic views.",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2070&auto=format&fit=crop",
      features: ["Living Room & Private Balcony", "Premium Dining & Kitchen", "Work Desk & Premium View"],
      price: 29900,
      delay: 900
    }
  ];

  return (
    <section id="rooms" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <TransitionWrapper delay={600}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Accommodations</h2>
          <p className="text-xl text-center text-gray-600 mb-16">Choose from our range of exquisite rooms</p>
        </TransitionWrapper>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
