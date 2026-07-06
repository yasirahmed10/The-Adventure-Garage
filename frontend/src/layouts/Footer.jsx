import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="TAG Logo" 
                className="h-12 w-12 object-contain rounded-full border border-white/20" 
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-white tracking-wider leading-none">THE ADVENTURE GARAGE</span>
                <span className="text-xs text-accent font-bold tracking-widest mt-1">TAG STUDIO</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Bhopal's premier custom house and detailing studio. Delivering perfection in wraps, paint protection, ceramic coatings, and 4x4 off-road builds.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://www.facebook.com/share/1GmF6CU2UU/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/5 hover:bg-accent hover:text-black p-2.5 rounded-full transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/the_adventure_garage" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/5 hover:bg-accent hover:text-black p-2.5 rounded-full transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com/@theadventuregarage?si=hIwLJxH-HkuLcrUX" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/5 hover:bg-accent hover:text-black p-2.5 rounded-full transition-all duration-300"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-widest mb-6">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-accent transition-colors">Detailing Services</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-accent transition-colors">Featured Projects</Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-accent transition-colors">Exclusive Offers</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent transition-colors">About the Studio</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-widest mb-6">Contact Studio</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-accent flex-shrink-0 mt-0.5" />
                <a 
                  href="https://maps.app.goo.gl/QtQzPqyGq7tPPDzWA" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-accent transition-colors leading-relaxed"
                >
                  Shop No. 210, Old Secretary Gate, Sultania Rd, opposite Commissioner Office, Kohefiza, Bhopal, MP 462001
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-accent flex-shrink-0" />
                <a href="tel:09560815118" className="hover:text-accent transition-colors">09560815118</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-accent flex-shrink-0" />
                <a href="mailto:info@theadventuregarage.com" className="hover:text-accent transition-colors">info@theadventuregarage.com</a>
              </li>
            </ul>
          </div>

          {/* Opening Hours Column */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-widest mb-6">Studio Hours</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <Clock className="w-5 h-5 mr-3 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">Monday - Saturday</p>
                  <p className="mt-1">10:00 AM - 08:30 PM</p>
                  <p className="text-red-500 font-semibold mt-2">Sunday: Closed</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} THE ADVENTURE GARAGE (TAG). All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
