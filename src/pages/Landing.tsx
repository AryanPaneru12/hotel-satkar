
import React, { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import RoomsSection from '@/components/landing/RoomsSection';
import AboutUsSection from '@/components/landing/AboutUsSection';
import LoginModal from '@/components/landing/LoginModal';
import Footer from '@/components/landing/Footer';

const Landing = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);

  const handleLoginClick = () => {
    setIsLoginMode(true);
  };

  return (
    <div className="min-h-screen overflow-y-auto">
      <Navbar onLoginClick={handleLoginClick} />
      <div className="flex-1">
        <HeroSection onBookNowClick={handleLoginClick} />
        <FeaturesSection />
        <RoomsSection onBookNowClick={handleLoginClick} />
        <AboutUsSection />
      </div>
      <LoginModal isOpen={isLoginMode} onClose={() => setIsLoginMode(false)} />
      <Footer />
    </div>
  );
};

export default Landing;
