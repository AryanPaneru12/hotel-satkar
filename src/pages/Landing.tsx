
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import RoomsSection from '@/components/landing/RoomsSection';
import AboutUsSection from '@/components/landing/AboutUsSection';
import LoginModal from '@/components/landing/LoginModal';
import Footer from '@/components/landing/Footer';

const Landing = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const location = useLocation();
  
  // Check if we should show login modal based on URL parameter
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const showLogin = query.get('login');
    if (showLogin === 'true') {
      setIsLoginMode(true);
    }
  }, [location]);

  const handleLoginClick = () => {
    setIsLoginMode(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
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
