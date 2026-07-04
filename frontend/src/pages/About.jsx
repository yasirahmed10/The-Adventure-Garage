import React from 'react';
import { ChefHat, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const About = () => {
  const stats = [
    { value: '15+', label: 'Secret Spices' },
    { value: '25k+', label: 'Happy Customers' },
    { value: '4.8★', label: 'Average Rating' },
    { value: '10+', label: 'Outlets Planned' }
  ];

  return (
    <div className="bg-[#e6f4ff] min-h-screen py-12">
      <Helmet>
        <title>About Us | Jaffa Shawarma</title>
        <meta name="description" content="Read the story of Jaffa Shawarma, our heritage, culinary philosophy, and authentic spices." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Our Story</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Discover the passion, authentic ingredients, and culinary heritage behind Jaffa Shawarma.
          </p>
          <div className="mt-4 w-24 h-1.5 bg-primary-500 mx-auto rounded-full"></div>
        </div>

        {/* Brand Journey Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">How Jaffa Shawarma Began</h2>
            <p className="text-gray-600 leading-relaxed">
              Jaffa Shawarma was born out of a simple desire: to bring the authentic, rich flavors of traditional charcoal-grilled shawarma to fast food lovers. Named after the historical port city of Jaffa, known for its vibrant spice markets, our brand represents the culmination of authentic Middle Eastern grilling methods and premium culinary preparation.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every chicken breast we roast is marinated for 24 hours in our proprietary blend of 15+ spices. Slowly rotated on the vertical spit, the meat cooks in its own juices, resulting in that signature tender, aromatic flavor that makes Jaffa Shawarma so irresistible.
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-video shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop" 
              alt="Restaurant kitchen grilling"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Core Values</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">We commit to excellence in every wrap we toast.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition text-center">
            <div className="bg-primary-50 p-4 rounded-full w-fit mx-auto mb-6 text-primary-500">
              <ChefHat className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Authentic Preparation</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We stick to traditional spit-roasting, wood-fired bread baking, and fresh garlic Toum preparation to deliver genuine flavors.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition text-center">
            <div className="bg-primary-50 p-4 rounded-full w-fit mx-auto mb-6 text-primary-500">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Flawless Hygiene</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our live kitchen and daily food sourcing guarantee the cleanest environment. We maintain a zero-compromise policy on safety.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition text-center">
            <div className="bg-primary-50 p-4 rounded-full w-fit mx-auto mb-6 text-primary-500">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Made with Love</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Food brings people together. Our friendly service, custom seating, and generous portions are all geared to make you smile.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="bg-primary-500 rounded-3xl p-8 md:p-12 text-white shadow-lg shadow-primary-500/20 mb-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <span className="text-4xl md:text-5xl font-extrabold block">{stat.value}</span>
                <span className="text-sm md:text-base text-primary-100 block font-medium uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Culinary Philosophy Banner */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="space-y-4 max-w-2xl">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <Sparkles className="w-6 h-6 mr-2 text-yellow-500" /> Premium Charcoal Experience
            </h3>
            <p className="text-gray-600">
              Experience the difference of charcoal roasting. The slow heat seals in moisture while giving the chicken a delicious wood-smoked skin, perfectly complimented by fresh pickles, parsley, and garlic toum.
            </p>
          </div>
          <a 
            href="/menu" 
            className="bg-gray-900 text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-primary-500 transition shadow-md whitespace-nowrap"
          >
            Order Now
          </a>
        </div>

      </div>
    </div>
  );
};

export default About;
