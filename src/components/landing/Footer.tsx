
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Satkar</h3>
            <p className="mb-4 text-gray-400">
              A premium property located in the heart of Pokhara, offering stunning views of Phewa Lake and the Annapurna mountain range.
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
              <li><a href="#" className="hover:text-white transition-colors">Rooms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Amenities</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Satkar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
