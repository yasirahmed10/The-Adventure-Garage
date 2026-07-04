import React, { useState, useEffect } from 'react';
import { Tag, Clock, Copy, Check, Gift } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Offers = () => {
  const [copiedCode, setCopiedCode] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 42, seconds: 15 });

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
          // Reset timer to 12 hours once reached zero
          return { hours: 11, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const offers = [
    {
      id: 1,
      title: "First Order Special",
      description: "Get flat 50% off on your very first order at Jaffa Shawarma.",
      code: "JAFFA50",
      type: "discount",
      badge: "NEW USER"
    },
    {
      id: 2,
      title: "Free Delivery Deal",
      description: "Order above ₹299 and get free home delivery at your doorstep.",
      code: "FREESHIP",
      type: "free_delivery",
      badge: "POPULAR"
    },
    {
      id: 3,
      title: "Weekend Feast Combo",
      description: "Get flat ₹100 off on ordering any 2 Open Platters + 2 Beverages.",
      code: "WEEKEND100",
      type: "combo",
      badge: "WEEKEND ONLY"
    }
  ];

  return (
    <div className="bg-[#e6f4ff] min-h-screen py-12">
      <Helmet>
        <title>Offers & Coupons | Jaffa Shawarma</title>
        <meta name="description" content="Check out current promo codes, flat discounts, and deal of the day at Jaffa Shawarma." />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Deals & Offers</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Enjoy your favorite Shawarmas and Turkish Baklava with these exclusive discount codes.
          </p>
          <div className="mt-4 w-24 h-1.5 bg-primary-500 mx-auto rounded-full"></div>
        </div>

        {/* Deal of the Day / Countdown Section */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 mb-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 z-0"></div>
          <div className="relative z-10 flex-1">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-red-100 text-red-700 mb-4 uppercase tracking-wider">
              <Clock className="w-4 h-4 mr-1 animate-pulse" /> Deal of the Day
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Flat 20% off on all Rice Bowls!</h2>
            <p className="text-gray-600 mb-6">Satisfy your appetite with our popular spiced Chicken Rice Bowls and Paneer Bowls.</p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => handleCopyCode("JAFFA20")}
                className="bg-primary-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-600 transition flex items-center shadow-lg shadow-primary-500/20"
              >
                {copiedCode === "JAFFA20" ? (
                  <>Copied! <Check className="w-5 h-5 ml-2" /></>
                ) : (
                  <>Copy Code: JAFFA20 <Copy className="w-5 h-5 ml-2" /></>
                )}
              </button>
            </div>
          </div>
          
          <div className="relative z-10 bg-gray-900 text-white p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center min-w-[240px]">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-4">Offer Ends In</span>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold font-mono bg-white/10 w-14 h-14 flex items-center justify-center rounded-xl">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[10px] text-gray-400 uppercase mt-2">Hours</span>
              </div>
              <span className="text-2xl font-bold mt-2">:</span>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold font-mono bg-white/10 w-14 h-14 flex items-center justify-center rounded-xl">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[10px] text-gray-400 uppercase mt-2">Minutes</span>
              </div>
              <span className="text-2xl font-bold mt-2">:</span>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold font-mono bg-white/10 w-14 h-14 flex items-center justify-center rounded-xl">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[10px] text-gray-400 uppercase mt-2">Seconds</span>
              </div>
            </div>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div 
              key={offer.id}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 rounded-md text-[10px] font-bold bg-primary-50 text-primary-600 uppercase tracking-wider border border-primary-100">
                    {offer.badge}
                  </span>
                  <div className="p-2.5 bg-primary-50 rounded-xl text-primary-500">
                    {offer.type === 'combo' ? <Gift className="w-5 h-5" /> : <Tag className="w-5 h-5" />}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{offer.description}</p>
              </div>

              <div className="border-t border-dashed pt-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase block mb-1">Coupon Code</span>
                  <span className="text-base font-bold text-gray-900 font-mono">{offer.code}</span>
                </div>
                <button 
                  onClick={() => handleCopyCode(offer.code)}
                  className={`p-2.5 rounded-xl border text-sm font-semibold transition ${
                    copiedCode === offer.code 
                      ? 'bg-green-50 border-green-200 text-green-600' 
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {copiedCode === offer.code ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Offers;
