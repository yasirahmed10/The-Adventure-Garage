import React, { useEffect, useState } from 'react';
import { ShieldCheck, Award, Zap, Heart, Sparkles, Phone, Compass } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import api from '../services/api';

const About = () => {
  const [team, setTeam] = useState([]);



  const stats = [
    { value: '500+', label: 'Cars Detailed' },
    { value: '1000+', label: 'Wraps Installed' },
    { value: '300+', label: 'PPF Installations' },
    { value: '100+', label: '4x4 Builds' }
  ];


  return (
    <div className="bg-black min-h-screen py-16 text-gray-300">
      <Helmet>
        <title>About Us | THE ADVENTURE GARAGE (TAG)</title>
        <meta name="description" content="Discover the story, vision, and team of Bhopal's elite automotive customization and detailing garage." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center mb-20">
          <span className="text-accent font-extrabold uppercase text-xs tracking-widest block mb-4">WHO WE ARE</span>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">Our Story</h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-gray-400">
            Learn about our passion, custom standards, and elite automotive craftsmanship.
          </p>
          <div className="mt-4 w-24 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        {/* Brand Journey Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24 rounded-3xl p-8 md:p-12 glass-panel border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
          <div className="space-y-6 relative z-10">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white uppercase">How The Adventure Garage Began</h2>
            <p className="leading-relaxed text-gray-400">
              THE ADVENTURE GARAGE (TAG) was established with a singular mission: to provide vehicle owners in Bhopal and Central India with an international standard of automotive modification, paint protection, and premium detailing. Located in Kohefiza, Bhopal, we have built a state-of-the-art facility featuring dust-free application booths, computerized PPF cutting plotters, and advanced infrared paint curing tools.
            </p>
            <p className="leading-relaxed text-gray-400">
              We live by the code "Built Not Bought". To us, every car, SUV, or off-roader is an empty canvas waiting to be engineered into a reflection of its owner's lifestyle. Our team specializes in complex wraps, custom 4x4 Thar accessories, certified 9H ceramic glass coatings, and self-healing clear paint protection films.
            </p>
          </div>
          <div className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=800&auto=format&fit=crop" 
              alt="Garage detailer preparing car"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white uppercase">Our Core Values</h2>
          <p className="text-gray-400 text-sm md:text-base mt-2">The principles that guide every wrap, coating, and modification we install.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-28">
          <div className="glass-panel p-8 rounded-3xl border-white/5 hover:border-accent/20 transition-all duration-300 text-center relative group">
            <div className="bg-accent/10 p-4 rounded-full w-fit mx-auto mb-6 text-accent border border-accent/20">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Microscopic Precision</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              We tuck every edge, use knife-less tape to prevent paint cuts, and double-inspect wrap lines under critical lighting to ensure a factory-like finish.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border-white/5 hover:border-accent/20 transition-all duration-300 text-center relative group">
            <div className="bg-accent/10 p-4 rounded-full w-fit mx-auto mb-6 text-accent border border-accent/20">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Premium Product Integrity</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              We never use cheap unbranded films. From 10-year TPU self-healing films to 9H quartz liquids, we only deploy materials from verified international brands.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border-white/5 hover:border-accent/20 transition-all duration-300 text-center relative group">
            <div className="bg-accent/10 p-4 rounded-full w-fit mx-auto mb-6 text-accent border border-accent/20">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Designed for Adventure</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Our 4x4 custom parts are built to withstand off-road abuse. We combine form and function, ensuring that your vehicle is ready to explore terrains.
            </p>
          </div>
        </div>

        {/* Stats Grid Banner */}
        <div className="bg-gradient-to-r from-[#111111] via-accent/10 to-[#111111] rounded-3xl p-8 md:p-12 border border-accent/20 text-white shadow-2xl mb-28 relative overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <span className="text-3xl md:text-5xl font-black text-accent block">{stat.value}</span>
                <span className="text-xs text-gray-400 block font-semibold uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>


        {/* Bottom CTA Banner */}
        <div className="glass-panel border-white/5 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
          <div className="space-y-4 max-w-2xl relative z-10">
            <h3 className="text-xl md:text-2xl font-bold text-white flex items-center uppercase">
              <Sparkles className="w-5 h-5 mr-2 text-accent" /> Premium Custom Consultations
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We offer free vehicle inspections and quote estimates. Visit our Kohefiza studio today and discuss your vision with Vikram and our design team.
            </p>
          </div>
          <Link 
            to="/book-appointment" 
            className="bg-accent text-black font-extrabold px-8 py-4 rounded-full text-base hover:bg-accent-hover tracking-wider uppercase transition shadow-lg shadow-accent/20 relative z-10 whitespace-nowrap"
          >
            Book Appointment
          </Link>
        </div>

      </div>
    </div>
  );
};

export default About;
