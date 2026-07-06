import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Phone, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Offers', path: '/offers' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 top-0 transition-all duration-300 ${scrolled
        ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-3'
        : 'bg-transparent py-5'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-3 group">
              <img
                src="/logo.png"
                alt="TAG Logo"
                className="h-12 w-12 object-contain rounded-full border border-white/20 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-white tracking-wider leading-none">THE ADVENTURE GARAGE</span>
                <span className="text-xs text-accent font-bold tracking-widest mt-1">TAG STUDIO</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              if (link.name === 'Services') {
                return (
                  <div key={link.name} className="relative group">
                    <Link
                      to={link.path}
                      className={`${location.pathname.startsWith('/services')
                          ? 'text-accent font-bold'
                          : 'text-gray-300 group-hover:text-accent'
                        } text-sm font-semibold tracking-wider uppercase transition-colors duration-200 flex items-center`}
                    >
                      {link.name}
                      <ChevronDown className="w-4 h-4 ml-1 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </Link>

                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-4 w-64 bg-black/95 border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-6 transition-all duration-300 flex flex-col p-3 backdrop-blur-md">
                      <div className="absolute -top-6 left-0 w-full h-6 bg-transparent" /> {/* Invisible hover bridge */}
                      <Link to="/services" className="px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-accent/10 hover:text-accent rounded-xl transition-colors">Ceramic Coating</Link>
                      <Link to="/services" className="px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-accent/10 hover:text-accent rounded-xl transition-colors">Paint Protection Film (PPF)</Link>
                      <Link to="/services" className="px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-accent/10 hover:text-accent rounded-xl transition-colors">Vehicle Wrapping</Link>
                      <Link to="/services" className="px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-accent/10 hover:text-accent rounded-xl transition-colors">Premium Detailing</Link>
                      <Link to="/services" className="px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-accent/10 hover:text-accent rounded-xl transition-colors">Premium Body Kits</Link>
                      <Link to="/services" className="px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-accent/10 hover:text-accent rounded-xl transition-colors">4x4 Modifications</Link>
                      <Link to="/services" className="px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-accent/10 hover:text-accent rounded-xl transition-colors">Custom Wraps</Link>
                      <Link to="/services" className="px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-accent/10 hover:text-accent rounded-xl transition-colors">Ambient Lighting</Link>
                      <Link to="/services" className="px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-accent/10 hover:text-accent rounded-xl transition-colors">OBD Digital Meters</Link>
                      <Link to="/services" className="px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-accent/10 hover:text-accent rounded-xl transition-colors">Custom Thar Tail Lights</Link>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`${location.pathname === link.path
                      ? 'text-accent font-bold'
                      : 'text-gray-300 hover:text-accent'
                    } text-sm font-semibold tracking-wider uppercase transition-colors duration-200`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">

            <Link
              to="/admin"
              className="text-gray-300 hover:text-accent transition-colors"
              title="Admin Portal"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link
              to="/book-appointment"
              className="bg-accent text-black font-extrabold px-6 py-2.5 rounded-full text-sm hover:bg-accent-hover tracking-wider uppercase transition-all duration-300 glow-accent-hover hover:-translate-y-0.5"
            >
              Book Studio
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-4">
            <Link to="/admin" className="text-gray-300 hover:text-accent">
              <User className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-accent focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10 backdrop-blur-lg absolute w-full left-0 top-full">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`${location.pathname === link.path
                    ? 'bg-accent/10 text-accent font-bold'
                    : 'text-gray-300 hover:bg-white/5 hover:text-accent'
                  } block px-4 py-3 rounded-lg text-base font-medium tracking-wider uppercase transition-all`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 space-y-4 px-4">

              <Link
                to="/book-appointment"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-accent text-black font-extrabold py-3.5 rounded-full text-base hover:bg-accent-hover tracking-wider uppercase transition-all shadow-lg shadow-accent/20"
              >
                Book Studio
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
