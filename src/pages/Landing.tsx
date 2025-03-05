
import React, { useState } from 'react';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import RoomsSection from '@/components/landing/RoomsSection';
import LoginModal from '@/components/landing/LoginModal';
import Footer from '@/components/landing/Footer';

const Landing = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);

  const handleBookNowClick = () => {
    setIsLoginMode(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection onBookNowClick={handleBookNowClick} />
      <FeaturesSection />
      <RoomsSection onBookNowClick={handleBookNowClick} />
      <LoginModal isOpen={isLoginMode} onClose={() => setIsLoginMode(false)} />
      <Footer />
    </div>
  );
};

export default Landing;
