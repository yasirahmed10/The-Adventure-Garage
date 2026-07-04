import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Navigation } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { outlets } from '../data/outlets';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sortedOutlets, setSortedOutlets] = useState(outlets);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c; // Distance in km
  };

  const findNearest = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }
    setIsLocating(true);
    setLocationError('');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        
        const outletsWithDist = outlets.map(outlet => {
          const distance = calculateDistance(userLat, userLng, outlet.lat, outlet.lng);
          return { ...outlet, distance };
        });
        
        outletsWithDist.sort((a, b) => a.distance - b.distance);
        setSortedOutlets(outletsWithDist);
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        setLocationError('Unable to retrieve your location');
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API request
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    }, 4000);
  };

  return (
    <div className="bg-[#e6f4ff] min-h-screen py-12">
      <Helmet>
        <title>Contact Us | Jaffa Shawarma</title>
        <meta name="description" content="Get in touch with Jaffa Shawarma. Find phone numbers, addresses, operating hours, and location map." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Contact Us</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Have questions about ordering, bulk bookings, or catering? Drop us a line.
          </p>
          <div className="mt-4 w-24 h-1.5 bg-primary-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          
          {/* Contact Details Card */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Store Details</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary-50 p-3 rounded-xl text-primary-500 mr-4 flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900">Our Locations</h3>
                      <button 
                        onClick={findNearest}
                        disabled={isLocating}
                        className="text-xs flex items-center bg-primary-50 text-primary-600 px-2 py-1 rounded-md hover:bg-primary-100 transition-colors"
                      >
                        <Navigation className={`w-3 h-3 mr-1 ${isLocating ? 'animate-spin' : ''}`} />
                        {isLocating ? 'Locating...' : 'Find Nearest'}
                      </button>
                    </div>
                    {locationError && <p className="text-red-500 text-xs mb-2">{locationError}</p>}
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                      {sortedOutlets.map(outlet => (
                        <a 
                          key={outlet.id} 
                          href={outlet.mapsUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block p-3 rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50/50 transition-all group"
                        >
                          <div className="flex justify-between items-start">
                            <p className="text-gray-900 text-sm font-semibold group-hover:text-primary-600 transition-colors">
                              {outlet.name}
                            </p>
                            {outlet.distance !== undefined && (
                              <span className="text-xs font-medium text-primary-500 bg-primary-50 px-2 py-0.5 rounded-full">
                                {outlet.distance.toFixed(1)} km
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-xs mt-1">{outlet.address}</p>
                          <p className="text-primary-500 text-xs mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                            Open in Google Maps <MapPin className="w-3 h-3 ml-1" />
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-50 p-3 rounded-xl text-primary-500 mr-4 flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
                    <p className="text-gray-600 text-sm font-semibold">093034 73703</p>
                    <p className="text-gray-600 text-xs mt-0.5">Toll-free: 1800-JAFFA-FOOD</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-50 p-3 rounded-xl text-primary-500 mr-4 flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
                    <p className="text-gray-600 text-sm">hello@jaffa.com</p>
                    <p className="text-gray-600 text-xs mt-0.5">Support: help@jaffa.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-start">
                <Clock className="w-6 h-6 text-primary-500 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Operating Hours</h3>
                  <p className="text-gray-600 text-sm">Mon - Sun: Open till 3:00 AM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm relative overflow-hidden">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
            
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-2xl flex items-center space-x-4 animate-fade-in mb-6">
                <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Message Sent Successfully!</h3>
                  <p className="text-sm text-green-700">Thank you for writing to Jaffa. Our customer support team will reply within 24 hours.</p>
                </div>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                  <input 
                    required 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition" 
                    placeholder="John Doe" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input 
                    required 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition" 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition" 
                    placeholder="+91 98765 43210" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition appearance-none"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Feedback">Feedback & Suggestions</option>
                    <option value="Catering">Catering / Event Bookings</option>
                    <option value="Franchise">Franchise Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Message *</label>
                <textarea 
                  required 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  rows="4" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none transition" 
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-primary-500 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary-500/20 hover:bg-primary-600 hover:shadow-xl transition-all flex justify-center items-center"
              >
                Send Message <Send className="w-5 h-5 ml-2" />
              </button>
            </form>
          </div>

        </div>

        {/* Map Embed Section */}
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm h-96 relative">
          <iframe 
            title="Jaffa Shawarma Outlet Map" 
            src="https://www.openstreetmap.org/export/embed.html?bbox=77.35%2C23.2%2C77.48%2C23.3&amp;layer=mapnik&amp;marker=23.25%2C77.41"
            className="w-full h-full border-none"
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default Contact;
