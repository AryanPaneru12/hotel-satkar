
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onLoginClick: () => void;
}

const Navbar = ({ onLoginClick }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              className="text-xl sm:text-2xl font-bold text-hotel-700"
            >
              <em>Satkar</em>
            </a>
            <span className="ml-2 text-xs sm:text-sm text-gray-500 hidden sm:inline-block">
              <em>Redefining Luxury</em>
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#rooms" 
              onClick={(e) => { e.preventDefault(); scrollToSection('rooms'); }}
              className="text-gray-700 hover:text-hotel-600 transition-colors"
            >
              Rooms
            </a>
            <a 
              href="#amenities" 
              onClick={(e) => { e.preventDefault(); scrollToSection('amenities'); }}
              className="text-gray-700 hover:text-hotel-600 transition-colors"
            >
              Amenities
            </a>
            <a 
              href="#about" 
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              className="text-gray-700 hover:text-hotel-600 transition-colors"
            >
              About Us
            </a>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button 
              variant="ghost" 
              className="hidden md:flex"
              onClick={onLoginClick}
            >
              Log in
            </Button>
            <Button 
              onClick={onLoginClick}
              className="text-sm md:text-base px-3 md:px-4 py-1 md:py-2"
            >
              Sign Up
            </Button>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-2 pb-4 border-t mt-2 space-y-3">
            <a 
              href="#rooms" 
              onClick={(e) => { e.preventDefault(); scrollToSection('rooms'); }}
              className="block py-2 text-gray-700 hover:text-hotel-600 transition-colors"
            >
              Rooms
            </a>
            <a 
              href="#amenities" 
              onClick={(e) => { e.preventDefault(); scrollToSection('amenities'); }}
              className="block py-2 text-gray-700 hover:text-hotel-600 transition-colors"
            >
              Amenities
            </a>
            <a 
              href="#about" 
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              className="block py-2 text-gray-700 hover:text-hotel-600 transition-colors"
            >
              About Us
            </a>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-gray-700"
              onClick={() => {
                onLoginClick();
                setMobileMenuOpen(false);
              }}
            >
              Log in
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
