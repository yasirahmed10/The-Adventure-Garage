import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import api from '../services/api';

const Contact = () => {
  const [businessSettings, setBusinessSettings] = useState(null);

  useEffect(() => {
    const fetchBusinessSettings = async () => {
      try {
        const response = await api.get('/settings/business');
        setBusinessSettings(response.data);
      } catch (err) {
        console.error("Failed to fetch business settings:", err);
      }
    };
    fetchBusinessSettings();
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Customization Inquiry',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: 'General Customization Inquiry', message: '' });
    }, 4000);
  };

  return (
    <div className="bg-black min-h-screen py-16 text-gray-300">
      <Helmet>
        <title>Contact Studio | THE ADVENTURE GARAGE (TAG)</title>
        <meta name="description" content="Reach out to TAG Bhopal detailing studio. Get phone coordinates, maps navigation, and business hours." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-extrabold uppercase text-xs tracking-widest block mb-4">VISIT STUDIO</span>
          <h1 className="text-4xl font-black text-white uppercase tracking-tight sm:text-5xl">Contact Us</h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm text-gray-400">
            Have questions about custom wraps, paint protection coatings, or off-road conversions? Get in touch.
          </p>
          <div className="mt-4 w-24 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          
          {/* Studio Details */}
          <div className="glass-panel rounded-3xl p-8 border-white/5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white uppercase tracking-wide">Studio Coordinates</h2>
              
              <div className="space-y-6 text-sm text-gray-400">
                <div className="flex items-start">
                  <div className="bg-accent/10 p-3 rounded-2xl text-accent mr-4 flex-shrink-0 border border-accent/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Our Address</h3>
                    <a 
                      href="https://maps.app.goo.gl/QtQzPqyGq7tPPDzWA" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-accent transition-colors leading-relaxed"
                    >
                      {businessSettings?.address || "Shop No. 210, Old Secretary Gate, Sultania Rd, opposite Commissioner Office, Kohefiza, Bhopal, MP 462001"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-accent/10 p-3 rounded-2xl text-accent mr-4 flex-shrink-0 border border-accent/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Call Us</h3>
                    <a href={`tel:${businessSettings?.phone || "09560815118"}`} className="hover:text-accent font-semibold block">
                      {businessSettings?.phone || "09560815118"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-accent/10 p-3 rounded-2xl text-accent mr-4 flex-shrink-0 border border-accent/20">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">WhatsApp Chat</h3>
                    <a 
                      href={`https://wa.me/91${businessSettings?.whatsapp || "9560815118"}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-accent text-black font-extrabold text-xs uppercase px-4 py-1.5 rounded-full inline-block mt-1 hover:bg-accent-hover tracking-wider"
                    >
                      Chat Live
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-accent/10 p-3 rounded-2xl text-accent mr-4 flex-shrink-0 border border-accent/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Email Us</h3>
                    <a href={`mailto:${businessSettings?.email || "info@theadventuregarage.com"}`} className="hover:text-accent transition-colors block">
                      {businessSettings?.email || "info@theadventuregarage.com"}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-6">
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-accent mr-4 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h3 className="font-bold text-white mb-1 uppercase tracking-wider">Studio Hours</h3>
                  <p className="text-gray-400">
                    {businessSettings?.opening_hours?.days || "Monday - Saturday"}: {businessSettings?.opening_hours?.timings || "10:00 AM - 08:30 PM"}
                  </p>
                  <p className="text-red-500 font-bold mt-1">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-[#090909] rounded-3xl p-8 md:p-10 border border-white/5 relative overflow-hidden">
            <h2 className="text-2xl font-black text-white uppercase tracking-wide mb-6">Send an Inquiry</h2>
            
            {isSubmitted && (
              <div className="bg-accent/10 border border-accent/20 text-accent p-5 rounded-2xl flex items-center space-x-4 mb-6">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-sm uppercase">Message Sent Successfully</h3>
                  <p className="text-xs text-gray-400 mt-1">Thank you. Our customization consultants will reach back to you shortly.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Your Name *</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm transition" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Email Address *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm transition" placeholder="john@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm transition" placeholder="09560815118" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Subject</label>
                  <select name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm transition appearance-none">
                    <option value="General Customization Inquiry">General Customization Inquiry</option>
                    <option value="PPF & Detailing Quote">PPF & Detailing Quote</option>
                    <option value="Vinyl wrapping consultation">Vinyl Wrapping Consultation</option>
                    <option value="4x4 suspension & bumper builds">4x4 Off-Road Builds</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Your Message *</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm transition resize-none" placeholder="Provide details like car model, year, and what customization you want..."></textarea>
              </div>

              <button type="submit" className="w-full bg-accent text-black font-extrabold text-base py-4 rounded-full shadow-lg shadow-accent/10 hover:bg-accent-hover transition-all flex justify-center items-center uppercase tracking-wider">
                Send Message <Send className="w-4 h-4 ml-2" />
              </button>
            </form>
          </div>

        </div>

        {/* Map Embed */}
        <div className="bg-white/5 rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-96 relative group">
          <iframe 
            title="TAG Bhopal Location Map" 
            src={businessSettings?.map_embed_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.986877402638!2d77.3828988!3d23.2435532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4274c43d3b73%3A0xe54d24a9cfb058a5!2sThe%20Adventure%20Garage!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"}
            className="w-full h-full border-none"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
          <a 
            href="https://maps.app.goo.gl/QtQzPqyGq7tPPDzWA"
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute top-4 left-4 bg-black/85 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-bold text-white border border-white/10 hover:bg-accent hover:text-black hover:border-accent transition-all flex items-center gap-1.5 z-20 shadow-lg"
          >
            <span>Open in Maps</span>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

      </div>
    </div>
  );
};

export default Contact;
