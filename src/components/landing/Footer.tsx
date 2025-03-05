
import React from 'react';

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12 w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Satkar</h3>
            <p className="mb-4 text-gray-400">
              Redefining luxury in the heart of Pokhara, offering stunning views of Phewa Lake and the Annapurna mountain range.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="mb-2 text-gray-400">Lakeside, Pokhara</p>
            <p className="mb-2 text-gray-400">Nepal, 33700</p>
            <p className="mb-2 text-gray-400">info@satkar.com</p>
            <p className="mb-2 text-gray-400">+977 61 123456</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a 
                  href="#rooms" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('rooms'); }}
                  className="hover:text-white transition-colors"
                >
                  Rooms
                </a>
              </li>
              <li>
                <a 
                  href="#amenities" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('amenities'); }}
                  className="hover:text-white transition-colors"
                >
                  Amenities
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} Satkar. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
