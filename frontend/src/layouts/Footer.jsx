import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { outlets } from '../data/outlets';

const Footer = () => {
  return (
    <footer className="bg-secondary text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="Jaffa Shawarma Logo" className="h-10 w-10 object-contain rounded-full bg-white p-0.5" />
              <h3 className="text-2xl font-bold text-white tracking-wide">Jaffa Shawarma</h3>
            </div>
            <p className="text-sm">
              Experience the finest premium dining with our authentic recipes and world-class service.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-primary-500 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary-500 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary-500 transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary-500 transition-colors">Home</Link></li>
              <li><Link to="/menu" className="hover:text-primary-500 transition-colors">Our Menu</Link></li>
              <li><Link to="/reservation" className="hover:text-primary-500 transition-colors">Book a Table</Link></li>
              <li><Link to="/gallery" className="hover:text-primary-500 transition-colors">Gallery</Link></li>
              <li><Link to="/about" className="hover:text-primary-500 transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 text-primary-500 flex-shrink-0" />
                <span className="flex flex-wrap gap-x-2 gap-y-1">
                  {outlets.map((outlet, index) => (
                    <React.Fragment key={outlet.id}>
                      <a href={outlet.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors">
                        {outlet.name.replace(' (Main)', '')}
                      </a>
                      {index < outlets.length - 1 && <span className="text-gray-600">|</span>}
                    </React.Fragment>
                  ))}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-primary-500 flex-shrink-0" />
                <span>093034 73703</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-primary-500 flex-shrink-0" />
                <span>hello@jaffa.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Opening Hours</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary-500 flex-shrink-0" />
                <div>
                  <p className="text-white">Monday - Sunday</p>
                  <p>Open till 3:00 AM</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} Jaffa Restaurant. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-primary-500 transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-primary-500 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
