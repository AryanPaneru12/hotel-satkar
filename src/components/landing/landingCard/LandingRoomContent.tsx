
import React from 'react';
import LandingRoomFeatures from './LandingRoomFeatures';

interface LandingRoomContentProps {
  title: string;
  description: string;
  features: string[];
}

const LandingRoomContent = ({ title, description, features }: LandingRoomContentProps) => {
  return (
    <div className="pt-5 flex-1">
      <h3 className="font-bold text-xl mb-3 text-hotel-800">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <LandingRoomFeatures features={features} />
    </div>
  );
};

export default LandingRoomContent;
