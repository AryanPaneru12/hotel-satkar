
import React from 'react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onLoginClick: () => void;
}

const Navbar = ({ onLoginClick }: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold text-hotel-700">Satkar</a>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#rooms" className="text-gray-700 hover:text-hotel-600 transition-colors">Rooms</a>
            <a href="#amenities" className="text-gray-700 hover:text-hotel-600 transition-colors">Amenities</a>
            <a href="#gallery" className="text-gray-700 hover:text-hotel-600 transition-colors">Gallery</a>
            <a href="#about" className="text-gray-700 hover:text-hotel-600 transition-colors">About Us</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="hidden md:flex"
              onClick={onLoginClick}
            >
              Log in
            </Button>
            <Button onClick={onLoginClick}>Sign Up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
