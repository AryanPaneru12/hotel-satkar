
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
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  
  // Check if we should show login modal based on URL parameter
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const showLogin = query.get('login');
    if (showLogin === 'true') {
      setIsLoginMode(true);
    }
  }, [location]);

  // Mark component as loaded after initial render
  useEffect(() => {
    console.log('Landing page loading...');
    
    // Set loaded immediately
    setIsLoaded(true);
    console.log('Landing page loaded');
    
    // Log component status to verify we're rendering correctly
    return () => {
      console.log('Landing page unmounting');
    };
  }, []);

  const handleLoginClick = () => {
    setIsLoginMode(true);
  };

  // Log rendering status for debugging
  console.log('Landing rendering, isLoaded:', isLoaded);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-lg text-gray-700">Loading Satkar Hotel...</p>
      </div>
    );
  }

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
