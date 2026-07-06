import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Sparkles, Paintbrush, Hammer, Wrench, Settings, Sun, CheckCircle, Star } from 'lucide-react';

const Menu = () => {
  const [activeTab, setActiveTab] = useState('services');

  const services = [
    {
      title: "Ceramic Coating",
      desc: "Protect your vehicle with a durable ceramic coating that enhances gloss while shielding the paint from UV rays, dirt, water spots, and minor scratches.",
      includes: ["3-Year & 5-Year Coating Options", "Hydrophobic Protection", "UV Resistance", "High Gloss Finish", "Easy Maintenance"],
      icon: <Sparkles className="w-8 h-8 text-accent" />
    },
    {
      title: "Paint Protection Film (PPF)",
      desc: "Premium self-healing TPU film that protects your vehicle from stone chips, scratches, swirl marks, and daily wear.",
      includes: ["Full Body PPF", "Partial PPF", "Gloss Finish", "Matte Finish", "Self-Healing Technology", "7–10 Years Warranty"],
      icon: <Shield className="w-8 h-8 text-accent" />
    },
    {
      title: "Vehicle Wrapping",
      desc: "Give your car a completely new look with premium vinyl wraps available in hundreds of colors and finishes.",
      includes: ["Gloss", "Matte", "Satin", "Metallic", "Chrome", "Carbon Fiber", "Printed Graphics"],
      icon: <Paintbrush className="w-8 h-8 text-accent" />
    },
    {
      title: "Premium Detailing",
      desc: "Professional detailing packages designed to restore your vehicle to showroom condition.",
      includes: ["Paint Decontamination", "Clay Bar Treatment", "Machine Polishing", "Interior Shampoo", "Engine Bay Cleaning", "Leather Conditioning"],
      icon: <CheckCircle className="w-8 h-8 text-accent" />
    },
    {
      title: "Premium Body Kits",
      desc: "Upgrade your vehicle's appearance with custom body kits that improve style and road presence.",
      includes: ["Front Lips", "Side Skirts", "Rear Diffusers", "Spoilers", "Fender Flares", "Wide Body Kits"],
      icon: <Settings className="w-8 h-8 text-accent" />
    },
    {
      title: "4x4 Modifications",
      desc: "Complete off-road transformation packages for adventure enthusiasts.",
      includes: ["Lift Kits", "Suspension Upgrades", "Off-road Bumpers", "Roof Racks", "Winches", "Snorkels", "Rock Sliders", "LED Light Bars"],
      icon: <Hammer className="w-8 h-8 text-accent" />
    },
    {
      title: "Custom Wraps",
      desc: "Personalized graphics, branding, racing stripes, camouflage, and custom-designed wraps.",
      includes: [],
      icon: <Paintbrush className="w-8 h-8 text-accent" />
    },
    {
      title: "Ambient Lighting",
      desc: "Premium multi-color interior ambient lighting with smartphone control.",
      includes: ["64 Color Options", "Music Sync", "App Control", "Dashboard Lighting", "Door Lighting", "Footwell Lighting"],
      icon: <Sun className="w-8 h-8 text-accent" />
    },
    {
      title: "OBD Digital Meters",
      desc: "Real-time digital performance displays compatible with modern vehicles.",
      includes: ["RPM", "Turbo Boost", "Coolant Temperature", "Oil Temperature", "Battery Voltage", "Fuel Economy"],
      icon: <Settings className="w-8 h-8 text-accent" />
    },
    {
      title: "Custom Thar Tail Lights",
      desc: "Stylish aftermarket LED tail lights specially designed for Mahindra Thar.",
      includes: ["Smoked Finish", "Sequential Indicators", "Dynamic Turn Signals", "Plug & Play Installation"],
      icon: <Wrench className="w-8 h-8 text-accent" />
    }
  ];

  const featuredBuilds = [
    {
      title: "Project Black Beast",
      vehicle: "Mahindra Thar",
      specs: ["Matte Black Wrap", "Full PPF", "2-Inch Lift Kit", "Steel Off-road Bumper", "LED Light Bar", "18\" Alloy Wheels", "Mud Terrain Tires", "Snorkel", "Custom Tail Lights"]
    },
    {
      title: "Project Urban Warrior",
      vehicle: "Toyota Fortuner",
      specs: ["Ceramic Coating", "Gloss Black Roof Wrap", "Body Kit Installation", "Ambient Lighting", "Interior Detailing", "Window Tint"]
    },
    {
      title: "Project Desert Hunter",
      vehicle: "Isuzu D-Max V-Cross",
      specs: ["Suspension Upgrade", "Off-road Wheels", "Roof Rack", "Winch", "Roll Bar", "LED Pods", "PPF", "Ceramic Coating"]
    },
    {
      title: "Project Stealth X5",
      vehicle: "BMW X5",
      specs: ["Satin Grey Wrap", "Full Body PPF", "Ceramic Coating", "Carbon Fiber Spoiler", "Interior Detailing", "Ambient Lighting"]
    },
    {
      title: "Project Night Rider",
      vehicle: "Jeep Wrangler Rubicon",
      specs: ["Matte Olive Wrap", "Lift Kit", "Beadlock Wheels", "Off-road Bumper", "Rock Sliders", "LED Headlights", "Roof Rack"]
    },
    {
      title: "Project Royal Defender",
      vehicle: "Land Rover Defender",
      specs: ["Graphene Ceramic Coating", "Full Interior Detail", "Premium PPF", "Custom Wheels", "Ambient Lighting", "Black Styling Package"]
    }
  ];

  const detailingPackages = [
    {
      title: "Bronze Package",
      desc: "Perfect for routine maintenance.",
      duration: "2–3 Hours",
      includes: ["Exterior Foam Wash", "Wheel Cleaning", "Tire Dressing", "Interior Vacuum", "Dashboard Cleaning", "Glass Cleaning"]
    },
    {
      title: "Silver Package",
      desc: "A deeper clean for enhanced appearance.",
      duration: "4–5 Hours",
      includes: ["Everything in Bronze", "Clay Bar Treatment", "Paint Decontamination", "Spray Wax Protection", "Interior Steam Cleaning", "Leather/Vinyl Conditioning"]
    },
    {
      title: "Gold Package",
      desc: "Ideal for restoring your vehicle's shine.",
      duration: "6–8 Hours",
      includes: ["Everything in Silver", "Single-Step Paint Correction", "Engine Bay Cleaning", "Ceramic Spray Sealant", "Trim Restoration", "Headlight Restoration"]
    },
    {
      title: "Platinum Package",
      desc: "The ultimate detailing experience.",
      duration: "1–2 Days",
      includes: ["Multi-Step Paint Correction", "Premium Ceramic Coating", "Full Interior Deep Cleaning", "Leather Conditioning", "Glass Coating", "Wheel Coating", "Engine Detailing", "Plastic Restoration", "Odor Removal", "Final Gloss Inspection"]
    }
  ];

  return (
    <div className="bg-black min-h-screen py-16 text-gray-300">
      <Helmet>
        <title>Services & Builds | TAG</title>
        <meta name="description" content="Explore our complete line of luxury detailing, wraps, ceramic coatings, and 4x4 customizations." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-accent font-extrabold uppercase text-xs tracking-widest block mb-2">TAG STUDIO CATALOG</span>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Our Services & Builds</h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm">Professional automotive customization and surface engineering</p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          <button
            onClick={() => setActiveTab('services')}
            className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
              activeTab === 'services'
                ? 'bg-accent text-black shadow-lg shadow-accent/25'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            Our Services
          </button>
          <button
            onClick={() => setActiveTab('featured')}
            className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
              activeTab === 'featured'
                ? 'bg-accent text-black shadow-lg shadow-accent/25'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            Featured Builds
          </button>
          <button
            onClick={() => setActiveTab('detailing')}
            className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
              activeTab === 'detailing'
                ? 'bg-accent text-black shadow-lg shadow-accent/25'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            Standard Detailing
          </button>
        </div>

        {/* Content Section */}
        <div className="animate-in fade-in duration-500">
          {activeTab === 'services' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((svc, idx) => (
                <div key={idx} className="glass-panel rounded-3xl p-8 border-white/5 hover:border-accent/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5 group">
                  <div className="bg-accent/10 border border-accent/20 p-4 rounded-2xl w-fit text-accent mb-6">
                    {svc.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">{svc.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{svc.desc}</p>
                  
                  {svc.includes.length > 0 && (
                    <div>
                      <span className="text-xs text-white font-bold uppercase tracking-widest block mb-3 border-b border-white/10 pb-2">Includes / Options</span>
                      <ul className="space-y-2">
                        {svc.includes.map((item, i) => (
                          <li key={i} className="flex items-start text-xs text-gray-400">
                            <Star className="w-3.5 h-3.5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'featured' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredBuilds.map((build, idx) => (
                <div key={idx} className="glass-panel rounded-3xl p-8 border-white/5 hover:border-accent/30 transition-all duration-500 group flex flex-col md:flex-row gap-6">
                  <div className="flex-grow">
                    <span className="text-accent text-xs font-bold uppercase tracking-widest block mb-1">Vehicle: {build.vehicle}</span>
                    <h3 className="text-2xl font-black text-white mb-4 uppercase">{build.title}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mt-4">
                      {build.specs.map((spec, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                          <CheckCircle className="w-4 h-4 text-accent mr-2" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'detailing' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {detailingPackages.map((pkg, idx) => (
                <div key={idx} className="glass-panel rounded-3xl p-8 border-white/5 hover:border-accent/30 transition-all duration-500 hover:-translate-y-1 relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-xl group-hover:bg-accent/10 transition-all duration-500" />
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2">{pkg.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed h-10">{pkg.desc}</p>
                    
                    <div className="mt-4 mb-6 bg-white/5 border border-white/10 px-4 py-2 rounded-lg inline-block">
                      <span className="text-accent text-xs font-bold uppercase tracking-widest">Time: {pkg.duration}</span>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                      <span className="text-xs text-white font-bold uppercase tracking-widest block mb-4">Includes</span>
                      <ul className="space-y-3">
                        {pkg.includes.map((item, i) => (
                          <li key={i} className="flex items-start text-sm text-gray-400">
                            <CheckCircle className="w-4 h-4 text-accent mr-3 flex-shrink-0 mt-0.5" />
                            <span className="leading-tight">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Menu;
