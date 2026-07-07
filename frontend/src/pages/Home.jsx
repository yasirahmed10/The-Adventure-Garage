import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Shield, Sparkles, Paintbrush, Hammer, ChevronRight, Star, ChevronDown, CheckCircle2, Award, Zap, ShieldCheck, Clock, Phone, Globe, Settings, Wrench, BadgeIndianRupee, Users, ThumbsUp, Car } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import api from '../services/api';

// Custom CountUp hook/component for statistics
const CounterItem = ({ value, label }) => {
  const [count, setCount] = useState(0);
  const [ref, setRef] = useState(null);
  const target = parseInt(value.replace(/\D/g, ''));

  useEffect(() => {
    if (!ref) return;

    let observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / target));
        
        const timer = setInterval(() => {
          start += 1;
          setCount(start);
          if (start >= target) {
            clearInterval(timer);
            setCount(target);
          }
        }, Math.max(stepTime, 15));

        observer.disconnect();
      }
    }, { threshold: 0.1 });

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, target]);

  return (
    <div ref={setRef} className="text-center p-6 glass-panel rounded-2xl border-white/5 relative overflow-hidden group">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/5 rounded-full blur-xl group-hover:bg-accent/15 transition-all duration-500" />
      <span className="text-4xl md:text-5xl font-black text-accent block mb-2">
        {count}{value.includes('+') ? '+' : ''}{value.includes('★') ? '★' : ''}
      </span>
      <span className="text-xs uppercase tracking-widest text-gray-400 block font-semibold">{label}</span>
    </div>
  );
};

// Before & After comparison slider
const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-4xl h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 select-none cursor-ew-resize"
      onMouseMove={(e) => isDragging && handleMove(e.clientX)}
      onTouchMove={handleTouchMove}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* Before Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=1200&auto=format&fit=crop" 
          alt="Before detailing" 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-red-500 uppercase tracking-widest border border-red-500/30">
          Dirty / Scratched
        </div>
      </div>

      {/* After Image (Clipped) */}
      <div 
        className="absolute inset-0"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img 
          src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1200&auto=format&fit=crop" 
          alt="After detailing" 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-accent uppercase tracking-widest border border-accent/30">
          TAG Mirror Finish
        </div>
      </div>

      {/* Slider Line & Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-accent cursor-ew-resize z-30"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg border-2 border-black z-40">
          <svg className="w-6 h-6 text-black fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// FAQ Accordion Item
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-2 font-bold text-base md:text-lg text-white hover:text-accent transition-colors"
      >
        <span>{question}</span>
        <ChevronDown className={`w-5 h-5 text-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-sm md:text-base text-gray-400 mt-2 leading-relaxed pb-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Home = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Hero Section Interactive Showcase Data
  const heroCars = [
    { id: 'mustang', name: "Mustang GT", image: "/images/mustang_gt.png", tag: "V8 Custom Wraps" },
    { id: 'g-class', name: "Mercedes G-Class", image: "/images/mercedes_g_class.png", tag: "Elite Ceramic Protection" },
    { id: 'range-rover', name: "Range Rover", image: "/images/range_rover.png", tag: "Self-Healing PPF" },
    { id: 'land-cruiser', name: "Land Cruiser", image: "/images/land_cruiser.png", tag: "Extreme 4x4 Offroad Build" }
  ];
  
  const [activeCarIndex, setActiveCarIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotation timer logic
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveCarIndex((prev) => (prev + 1) % heroCars.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, heroCars.length]);

  useEffect(() => {
    const fetchHomeSettings = async () => {
      try {
        const response = await api.get('/settings/design');
        setSettings(response.data);
      } catch (err) {
        console.error("Failed to fetch design settings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeSettings();
  }, []);

  const heroVideo = "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054273f1d237197b5f14e7a2b97063a&profile_id=139&oauth2_token_id=57447761";

  const brandLogos = [
    { name: "Toyota", icon: "/images/toyota.png" },
    { name: "Mahindra", icon: "/images/mahindra.png" },
    { name: "Jeep", icon: "/images/jeep.png" },
    { name: "Ford", icon: "/images/ford.png" },
    { name: "Mercedes", icon: "/images/mercedes.png" },
    { name: "BMW", icon: "/images/bmw.png" },
    { name: "Audi", icon: "/images/audi.png" },
    { name: "Tata", icon: "/images/tata.png" }
  ];

  const services = [
    {
      title: "Ceramic Coating",
      desc: "Durable ceramic coating enhancing gloss while shielding from UV, dirt, and scratches.",
      icon: <Sparkles className="w-8 h-8 text-accent" />,
      link: "/services",
      img: "/images/services/ceramic_coating.png"
    },
    {
      title: "Paint Protection Film (PPF)",
      desc: "Premium self-healing TPU film protecting from chips, scratches, and daily wear.",
      icon: <Shield className="w-8 h-8 text-accent" />,
      link: "/services",
      img: "/images/services/ppf.png"
    },
    {
      title: "Vehicle Wrapping",
      desc: "Premium vinyl wraps in hundreds of colors, matte, gloss, and carbon fiber finishes.",
      icon: <Paintbrush className="w-8 h-8 text-accent" />,
      link: "/services",
      img: "/images/services/vehicle_wrapping.png"
    },
    {
      title: "Premium Detailing",
      desc: "Professional detailing packages designed to restore your vehicle to showroom condition.",
      icon: <Star className="w-8 h-8 text-accent" />,
      link: "/services",
      img: "/images/services/premium_detailing.png"
    },
    {
      title: "Premium Body Kits",
      desc: "Upgrade appearance with custom front lips, diffusers, spoilers, and wide body kits.",
      icon: <Wrench className="w-8 h-8 text-accent" />,
      link: "/services",
      img: "/images/services/premium_body_kits.png"
    },
    {
      title: "4x4 Modifications",
      desc: "Complete off-road packages: lift kits, bumpers, winches, and massive off-road alloys.",
      icon: <Hammer className="w-8 h-8 text-accent" />,
      link: "/services",
      img: "/images/services/offroad_modifications.png"
    },
    {
      title: "Custom Wraps",
      desc: "Personalized graphics, racing stripes, camouflage, and custom-designed liveries.",
      icon: <Paintbrush className="w-8 h-8 text-accent" />,
      link: "/services",
      img: "/images/services/custom_wraps.png"
    },
    {
      title: "Ambient Lighting",
      desc: "Premium multi-color interior ambient lighting with smartphone app control.",
      icon: <Zap className="w-8 h-8 text-accent" />,
      link: "/services",
      img: "/images/services/ambient_lighting.png"
    },
    {
      title: "OBD Digital Meters",
      desc: "Real-time performance displays for RPM, turbo boost, temps, and fuel economy.",
      icon: <Settings className="w-8 h-8 text-accent" />,
      link: "/services",
      img: "/images/services/obd_digital_meters.png"
    },
    {
      title: "Custom Thar Tail Lights",
      desc: "Stylish aftermarket LED sequential and dynamic tail lights specially for Mahindra Thar.",
      icon: <CheckCircle2 className="w-8 h-8 text-accent" />,
      link: "/services",
      img: "/images/services/thar_tail_lights.png"
    }
  ];

  const whyChooseUs = [
    { title: "Certified Detailing Professionals", desc: "Our detailers and technicians are globally certified and highly experienced.", icon: <Award className="w-6 h-6" /> },
    { title: "Premium International Products", desc: "We use elite, industry-leading international brands for all our services.", icon: <Globe className="w-6 h-6" /> },
    { title: "Advanced Detailing Equipment", desc: "State-of-the-art clean rooms, infrared curing lamps, and dust filters.", icon: <Settings className="w-6 h-6" /> },
    { title: "Genuine 4x4 Accessories", desc: "Sourcing and installing only the most authentic parts for your off-road builds.", icon: <Wrench className="w-6 h-6" /> },
    { title: "Warranty on Selected Services", desc: "Rest assured with official warranty options on our premium installations.", icon: <ShieldCheck className="w-6 h-6" /> },
    { title: "Transparent Pricing", desc: "No hidden fees, just upfront pricing tailored to your specific vehicle needs.", icon: <BadgeIndianRupee className="w-6 h-6" /> },
    { title: "Experienced Installation Team", desc: "Executing each project with microscopic precision and deep expertise.", icon: <Users className="w-6 h-6" /> },
    { title: "Customer Satisfaction Guaranteed", desc: "We don't just finish the job; we ensure you leave with complete peace of mind.", icon: <ThumbsUp className="w-6 h-6" /> },
    { title: "High-Quality Finish", desc: "Delivering perfection with a mirror-like finish and flawless wrap tucks.", icon: <Star className="w-6 h-6" /> },
    { title: "Personalized Vehicle Care", desc: "Every car is unique. We tailor our services to match your exact vision.", icon: <Car className="w-6 h-6" /> }
  ];

  const heroTitle = settings?.hero_title || "Transform Your Ride Into An Adventure";
  const heroSubtitle = settings?.hero_subtitle || "Bhopal's ultimate custom shop for Paint Protection Film (PPF), high-end wraps, ceramic shield coatings, and extreme 4x4 builds.";
  const heroBg = settings?.hero_bg_image || heroVideo;
  const ctaText = settings?.cta_text || "Book Appointment";

  const aboutTitle = settings?.about_title || "BUILT NOT BOUGHT. WE DEFINE CAR CULTURE.";
  const aboutSubtitle = settings?.about_subtitle || "THE TAG HERITAGE";
  const aboutDesc1 = settings?.about_desc_1 || "THE ADVENTURE GARAGE (TAG) is Bhopal’s premium automotive customization studio. Founded on the principle of extreme craftsmanship, we don’t just apply wraps or spray coatings; we customize each vehicle as a personal masterpiece.";
  const aboutDesc2 = settings?.about_desc_2 || "Whether you want to shield your luxury supercar with self-healing PPF, change colors with premium vinyl, or convert your Mahindra Thar into a menacing 4x4 beast, our certified technicians execute each project with microscopic precision.";
  const aboutBtnText = settings?.about_button_text || "Read Our Full Story";

  const showAbout = settings?.show_about_section ?? true;
  const showServices = settings?.show_services_section ?? true;
  const showGallery = settings?.show_gallery_section ?? true;
  const showTestimonials = settings?.show_testimonials_section ?? true;
  const showOffers = settings?.show_offers_section ?? true;

  const customSectionEnabled = settings?.custom_section_enabled || false;
  const customSectionTitle = settings?.custom_section_title || "";
  const customSectionSubtitle = settings?.custom_section_subtitle || "";
  const customSectionContent = settings?.custom_section_content || "";
  const customSectionImage = settings?.custom_section_image || "";
  const customSectionCtaText = settings?.custom_section_cta_text || "";
  const customSectionCtaLink = settings?.custom_section_cta_link || "";

  if (loading) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 lg:py-0">
        {/* Background Loop Video */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black z-10" />
          {heroBg.endsWith('.mp4') || heroBg.endsWith('.webm') || heroBg.includes('video') ? (
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover scale-105"
            >
              <source src={heroBg} type="video/mp4" />
            </video>
          ) : (
            <img 
              src={heroBg} 
              alt="Hero BG" 
              className="w-full h-full object-cover scale-105"
            />
          )}
        </div>

        {/* Hero Content Grid */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Heading & Subtitle */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-accent font-extrabold tracking-widest text-xs uppercase inline-block mb-6 border border-accent/20 px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-sm">
                  Premium Automotive Customization
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-none mb-6 whitespace-pre-line">
                  {heroTitle}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                  {heroSubtitle}
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-5">
                  <Link 
                    to="/book-appointment" 
                    className="w-full sm:w-auto bg-accent text-black font-extrabold text-base px-8 py-4 rounded-full hover:bg-accent-hover tracking-wider uppercase transition shadow-lg shadow-accent/20 hover:scale-105 text-center font-semibold"
                  >
                    {ctaText}
                  </Link>
                  <Link 
                    to="/services" 
                    className="w-full sm:w-auto glass-panel text-white font-extrabold text-base px-8 py-4 rounded-full hover:bg-white/10 tracking-wider uppercase transition flex items-center justify-center"
                  >
                    <span>View Services</span>
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Car Showcase */}
            <div className="lg:col-span-5 w-full flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md lg:max-w-full"
              >
                {/* Car Showcase Container */}
                <div 
                  className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden glass-panel border-white/5 shadow-2xl hover:border-accent/30 transition-all duration-500 flex items-center justify-center group"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {/* Subtle Background Glow behind the car */}
                  <div className="absolute -inset-10 bg-accent/5 rounded-full blur-3xl opacity-50 group-hover:bg-accent/10 transition-all duration-500 z-0" />
                  
                  {/* Car Image with smooth exit/enter transition */}
                  <div className="absolute inset-0 z-10 w-full h-full overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeCarIndex}
                        src={heroCars[activeCarIndex].image}
                        alt={heroCars[activeCarIndex].name}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1, 
                          transition: { 
                            opacity: { duration: 0.5 },
                            scale: { duration: 0.5 }
                          }
                        }}
                        exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.4 } }}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    </AnimatePresence>
                  </div>

                  {/* Gradient Overlay on top of the image to ensure high contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10 z-20 pointer-events-none" />

                  {/* Active Spec/Custom Tag */}
                  <div className="absolute top-4 left-4 z-30 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-xs font-black tracking-widest text-accent uppercase">
                    {heroCars[activeCarIndex].tag}
                  </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {heroCars.map((car, idx) => (
                    <button
                      key={car.id}
                      onClick={() => setActiveCarIndex(idx)}
                      className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 border ${
                        idx === activeCarIndex
                          ? "bg-accent border-accent text-black shadow-lg shadow-accent/20 scale-105 cursor-pointer"
                          : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer"
                      }`}
                    >
                      {car.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <span className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Scroll Down</span>
          <div className="w-[2px] h-10 bg-gradient-to-b from-accent to-transparent animate-bounce" />
        </div>
      </section>

      {/* 2. Brand Story / About TAG */}
      {showAbout && (
        <section className="py-24 bg-[#0a0a0a] border-y border-white/5 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent opacity-50" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Story Text */}
              <div className="space-y-8">
                <span className="text-accent font-black uppercase text-xs tracking-widest block">{aboutSubtitle}</span>
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight whitespace-pre-line">
                  {aboutTitle}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  {aboutDesc1}
                </p>
                <p className="text-gray-400 leading-relaxed">
                  {aboutDesc2}
                </p>
                <div>
                  <Link to="/about" className="text-accent font-extrabold text-sm uppercase tracking-widest hover:underline flex items-center">
                    <span>{aboutBtnText}</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Statistics Counters */}
              <div className="grid grid-cols-2 gap-6">
                <CounterItem value="500+" label="Cars Detailed" />
                <CounterItem value="1000+" label="Wraps Installed" />
                <CounterItem value="300+" label="PPF Installations" />
                <CounterItem value="100+" label="4x4 Builds" />
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 2b. Custom Dynamic Section */}
      {customSectionEnabled && (
        <section className="py-24 bg-black border-b border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className={`grid grid-cols-1 ${customSectionImage ? 'lg:grid-cols-2' : ''} gap-16 items-center`}>
              
              {/* Content Text */}
              <div className="space-y-8">
                {customSectionSubtitle && (
                  <span className="text-accent font-black uppercase text-xs tracking-widest block">
                    {customSectionSubtitle}
                  </span>
                )}
                {customSectionTitle && (
                  <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight whitespace-pre-line">
                    {customSectionTitle}
                  </h2>
                )}
                {customSectionContent && (
                  <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                    {customSectionContent}
                  </p>
                )}
                {customSectionCtaText && (
                  <div>
                    <Link 
                      to={customSectionCtaLink || "/services"} 
                      className="inline-block bg-accent text-black font-extrabold text-xs px-8 py-3.5 rounded-full hover:bg-accent-hover tracking-wider uppercase transition shadow-lg shadow-accent/15"
                    >
                      {customSectionCtaText}
                    </Link>
                  </div>
                )}
              </div>

              {/* Optional Section Image */}
              {customSectionImage && (
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                  <img 
                    src={customSectionImage} 
                    alt={customSectionTitle || "Custom Section"} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* 3. Customization Services */}
      {showServices && (
        <section className="py-28 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-accent font-extrabold uppercase text-xs tracking-widest block mb-4">OUR SPECIALTIES</span>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
                PREMIUM GARAGE SERVICES
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Explore our core custom services. Every service uses state-of-the-art tooling and comes backed with premium warranties.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((svc, i) => (
                <div 
                  key={i} 
                  className="group relative rounded-3xl overflow-hidden glass-panel border-white/5 flex flex-col hover:border-accent/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/5"
                >
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent z-10" />
                    <img 
                      src={svc.img} 
                      alt={svc.title} 
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur-sm p-3 rounded-2xl border border-white/10 text-accent">
                      {svc.icon}
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">{svc.title}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed">{svc.desc}</p>
                    </div>
                    <Link 
                      to={svc.link} 
                      className="text-white hover:text-accent font-extrabold text-xs uppercase tracking-widest flex items-center pt-4"
                    >
                      <span>Learn More</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/services" 
                className="inline-block bg-white/5 border border-white/10 hover:border-accent/30 text-white font-extrabold px-8 py-3.5 rounded-full text-sm uppercase tracking-widest transition-all duration-300 hover:bg-white/10"
              >
                Explore All 10+ Services
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 4. Before & After Interactive Slider */}
      {showGallery && (
        <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-accent font-extrabold uppercase text-xs tracking-widest block mb-4">THE PROOF</span>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
                INTERACTIVE COMPARISON
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Drag the metallic orange slider horizontally to view the before & after results of our multi-stage paint correction detailing.
              </p>
            </div>

            <BeforeAfterSlider />
          </div>
        </section>
      )}

      {/* 5. Why Choose TAG */}
      <section className="py-28 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-accent font-extrabold uppercase text-xs tracking-widest block mb-4">WHY CHOOSE US</span>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
              THE TAG STANDARD OF EXCELLENCE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {whyChooseUs.map((item, idx) => (
              <div 
                key={idx} 
                className="p-8 rounded-3xl glass-panel border-white/5 hover:border-accent/20 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-xl group-hover:bg-accent/15 transition-all duration-500" />
                <div className="bg-accent/10 border border-accent/20 p-3 rounded-2xl w-fit text-accent mb-6">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      {showTestimonials && (
        <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-accent font-extrabold uppercase text-xs tracking-widest block mb-4">REVIEWS</span>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
                WHAT OUR CLIENTS SAY
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Review 1 */}
              <div className="p-8 rounded-3xl glass-panel border-white/5 relative">
                <div className="flex items-center space-x-1 text-accent mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                  "Brought my brand new Mahindra Thar to TAG for a full 4x4 suspension lift and dynamic LED tail lights. The team did an incredible job, absolutely zero wiring issues, and the ride is super smooth. Easily the best custom garage in Bhopal!"
                </p>
                <div>
                  <h4 className="font-bold text-white">Arjun Sharma</h4>
                  <p className="text-xs text-accent uppercase font-bold tracking-widest mt-1">Mahindra Thar 4x4 Build</p>
                </div>
              </div>
              {/* Review 2 */}
              <div className="p-8 rounded-3xl glass-panel border-white/5 relative">
                <div className="flex items-center space-x-1 text-accent mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                  "Exceptional Paint Protection Film (PPF) installation on my Mercedes C-Class. Edges are completely tucked and invisible. The self-healing works like magic under warm water. Very professional behavior and luxury service."
                </p>
                <div>
                  <h4 className="font-bold text-white">Priyanka Verma</h4>
                  <p className="text-xs text-accent uppercase font-bold tracking-widest mt-1">Mercedes C-Class PPF</p>
                </div>
              </div>
              {/* Review 3 */}
              <div className="p-8 rounded-3xl glass-panel border-white/5 relative">
                <div className="flex items-center space-x-1 text-accent mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                  "Opted for a satin black full vinyl wrap for my Fortuner and Ceramic Coating on top. TAG transformed it completely. It looks like a stealth bomber! Highly recommended studio for luxury car wraps in MP."
                </p>
                <div>
                  <h4 className="font-bold text-white">Kabir Mehta</h4>
                  <p className="text-xs text-accent uppercase font-bold tracking-widest mt-1">Fortuner Satin Wrap</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7. Brands We Work With Slider */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-gray-500 font-bold block">ELITE BRANDS IN OUR PORTFOLIO</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 hover:opacity-75 transition-opacity duration-300">
            <span className="text-white font-extrabold text-2xl tracking-widest uppercase">TOYOTA</span>
            <span className="text-white font-extrabold text-2xl tracking-widest uppercase">MAHINDRA</span>
            <span className="text-white font-extrabold text-2xl tracking-widest uppercase">JEEP</span>
            <span className="text-white font-extrabold text-2xl tracking-widest uppercase">FORD</span>
            <span className="text-white font-extrabold text-2xl tracking-widest uppercase">MERCEDES</span>
            <span className="text-white font-extrabold text-2xl tracking-widest uppercase">BMW</span>
            <span className="text-white font-extrabold text-2xl tracking-widest uppercase">TATA</span>
          </div>
        </div>
      </section>

      {/* 8. FAQ Accordion */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-accent font-extrabold uppercase text-xs tracking-widest block mb-4">FAQ</span>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="glass-panel border-white/5 rounded-3xl p-8 space-y-2">
            <FAQItem 
              question="What is the difference between PPF and Ceramic Coating?" 
              answer="Paint Protection Film (PPF) is a thick polyurethane barrier that physically absorbs rock chips, gravel, and scratches. Ceramic Coating is a silica-based liquid glass layer that chemically bonds to paint, providing extreme gloss, hydrophobic wash properties, and UV protection, but does not prevent heavy rock chips." 
            />
            <FAQItem 
              question="Will wrapping my car damage its factory paint?" 
              answer="No. As long as your vehicle has original OEM factory paint, high-quality wraps from Avery or 3M will protect your paint and can be removed safely without leaving residues or peeling clear coat." 
            />
            <FAQItem 
              question="How long does a detailing or PPF treatment take?" 
              answer="A standard full detailing takes 1-2 days. Full body PPF or wrapping takes 3-4 days to allow proper surface preparation, detailing, film installation, and edge setting." 
            />
            <FAQItem 
              question="Is 4x4 modification legal under RTO rules?" 
              answer="Suspension upgrades and external utility parts (bumper guards, winches, snorkels) are widely accepted for off-road operations. Direct modifications to chassis frames or vehicle dimensions are subject to RTO guidelines; we always advise clients on standard-compliant modifications." 
            />
          </div>
        </div>
      </section>

      {/* 9. Booking CTA banner */}
      {showOffers && (
        <section className="py-24 bg-gradient-to-r from-black via-accent/25 to-black relative">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">READY TO REIMAGINE YOUR VEHICLE?</h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">Book a slot today for a detailing consultation or off-road custom build design at our Kohefiza studio.</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/book-appointment" className="bg-accent text-black font-extrabold text-lg px-10 py-4 rounded-full hover:bg-accent-hover tracking-wider uppercase transition shadow-lg shadow-accent/20">
                Book Appointment
              </Link>
              <a href="tel:09560815118" className="bg-white/5 border border-white/20 text-white font-extrabold text-lg px-10 py-4 rounded-full hover:bg-white/10 tracking-wider uppercase transition flex items-center justify-center">
                <Phone className="w-5 h-5 mr-3 text-accent" />
                <span>Call Studio</span>
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
