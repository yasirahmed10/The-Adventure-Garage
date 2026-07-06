import React, { useState, useEffect } from 'react';
import { Tag, Clock, Check, Gift, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 22, seconds: 0 });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const defaultOffers = [
    {
      id: 1,
      title: "Monsoon Detailing Shield",
      description: "Get flat 15% off on our certified dual-layer 9H Ceramic Coating packages. Drive with permanent rain and mud repellency.",
      discount_value: 15,
      discount_type: "percentage",
      min_amount: 15000,
      offer_type: "seasonal",
      banner_image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Satin Stealth Wrap Bundle",
      description: "Upgrade to a full body Satin Vinyl Wrap and get a free hydrophobic Ceramic Shield topping (worth ₹10,000) for maximum longevity.",
      discount_value: 10000,
      discount_type: "flat",
      min_amount: 45000,
      offer_type: "package",
      banner_image: "https://images.unsplash.com/photo-1611245785530-ab08a8a47de4?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Thar Off-Road Makeover Combo",
      description: "Book a suspension lift kit + 33-inch mud tire package and receive a free pair of Dynamic LED Sequential Tail Lights.",
      discount_value: 6500,
      discount_type: "flat",
      min_amount: 35000,
      offer_type: "package",
      banner_image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await api.get('/offers');
        setOffers(res.data);
      } catch (err) {
        console.error("Error fetching offers, loading fallbacks:", err);
        setOffers(defaultOffers);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  return (
    <div className="bg-black min-h-screen py-16 text-gray-300">
      <Helmet>
        <title>Exclusive Detailing & Customization Offers | TAG</title>
        <meta name="description" content="Check out current promotional bundles, detailing discounts, and package offers at THE ADVENTURE GARAGE." />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-extrabold uppercase text-xs tracking-widest block mb-4">TAG EXCLUSIVE PACKAGES</span>
          <h1 className="text-4xl font-black text-white uppercase tracking-tight sm:text-5xl">Deals & Offers</h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm text-gray-400">
            Make the most of our limited-time detailing packages and customized build bundles.
          </p>
          <div className="mt-4 w-24 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        {/* Deal of the Day / Countdown Banner */}
        <div className="glass-panel rounded-3xl p-8 md:p-10 border-white/5 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
          <div className="relative z-10 flex-1 space-y-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black bg-accent/10 border border-accent/20 text-accent uppercase tracking-widest">
              <Clock className="w-4 h-4 mr-1.5 animate-pulse" /> Flash Custom Deal
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase leading-none">FREE 4x4 SNORKEL INSTALLATION</h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
              Book a full metal heavy-duty front bumper modification today and get a rugged off-road snorkel installed absolutely free.
            </p>
            <div className="pt-2">
              <Link 
                to="/book-appointment" 
                className="bg-accent text-black font-extrabold px-6 py-3 rounded-full hover:bg-accent-hover text-xs uppercase tracking-widest inline-flex items-center transition"
              >
                <span>Book Deal Now</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
          
          <div className="relative z-10 bg-[#0f0f0f] border border-white/5 p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center min-w-[260px]">
            <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-4 block">OFFER EXPIRES IN</span>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-black font-mono bg-white/5 border border-white/5 w-12 h-12 flex items-center justify-center rounded-xl text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[9px] text-gray-500 uppercase mt-2 font-bold tracking-wider">Hrs</span>
              </div>
              <span className="text-2xl font-bold mt-1 text-accent">:</span>
              <div className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-black font-mono bg-white/5 border border-white/5 w-12 h-12 flex items-center justify-center rounded-xl text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[9px] text-gray-500 uppercase mt-2 font-bold tracking-wider">Mins</span>
              </div>
              <span className="text-2xl font-bold mt-1 text-accent">:</span>
              <div className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-black font-mono bg-white/5 border border-white/5 w-12 h-12 flex items-center justify-center rounded-xl text-white">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[9px] text-gray-500 uppercase mt-2 font-bold tracking-wider">Secs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div 
              key={offer.id}
              className="glass-panel rounded-3xl overflow-hidden border-white/5 hover:border-accent/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img 
                    src={offer.banner_image || "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=600&auto=format&fit=crop"} 
                    alt={offer.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-accent text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    {offer.offer_type === 'package' ? 'Bundle Package' : 'Seasonal discount'}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-extrabold text-white uppercase tracking-wide">{offer.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{offer.description}</p>
                </div>
              </div>

              <div className="p-6 border-t border-white/5 mt-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">Value Discount</span>
                  <span className="text-lg font-black text-white">
                    {offer.discount_type === 'percentage' ? `${offer.discount_value}% OFF` : `₹${offer.discount_value.toLocaleString()} OFF`}
                  </span>
                </div>
                
                <Link 
                  to={`/book-appointment?service=${encodeURIComponent(offer.title)}`}
                  className="bg-white/5 border border-white/10 hover:bg-accent hover:text-black hover:border-accent p-2.5 rounded-full text-white transition-all duration-300"
                >
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Offers;
