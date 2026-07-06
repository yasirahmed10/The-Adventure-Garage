import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, Check, HelpCircle, ChevronDown, Calendar, Phone, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import api from '../services/api';

const BeforeAfterSlider = ({ before, after }) => {
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

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-xl border border-white/10 select-none cursor-ew-resize"
      onMouseMove={(e) => isDragging && handleMove(e.clientX)}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchMove={(e) => e.touches.length > 0 && handleMove(e.touches[0].clientX)}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
    >
      <div className="absolute inset-0">
        <img src={before} alt="Before" className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded-full text-xs font-bold text-red-500 uppercase tracking-wider">Before</div>
      </div>
      <div className="absolute inset-0" style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}>
        <img src={after} alt="After" className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full text-xs font-bold text-accent uppercase tracking-wider">After TAG Finish</div>
      </div>
      <div className="absolute top-0 bottom-0 w-1 bg-accent cursor-ew-resize z-30" style={{ left: `${sliderPosition}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg border-2 border-black">
          <svg className="w-4 h-4 text-black fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-2 font-bold text-white hover:text-accent transition-colors"
      >
        <span className="text-sm md:text-base">{question}</span>
        <ChevronDown className={`w-4 h-4 text-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <p className="text-xs md:text-sm text-gray-400 mt-2 leading-relaxed pb-2">
          {answer}
        </p>
      )}
    </div>
  );
};

const FoodDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  const defaultDetails = {
    "ceramic-coating": {
      name: "Ceramic Coating",
      description: "Our Ceramic Coating service utilizes advanced nano-quartz technology to establish a semi-permanent bond with the clear coat of your vehicle. This glass-like shell shields your vehicle against oxidation, acid etching, bird droppings, and UV fading while adding a brilliant candy-like gloss.",
      cover_image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1200&auto=format&fit=crop",
      price: 18000,
      benefits: [
        "Certified 9H glass hardness scratch shield",
        "Deep reflectivity and candy gloss enhancement",
        "Hydrophobic layer makes washing simple and quick",
        "3-Year & 5-Year packages available with official warranties"
      ],
      faqs: [
        { question: "How long does Ceramic Coating last?", answer: "Depending on the coating variant chosen, it will provide protection and gloss for 2 to 5 years with regular check-ups." },
        { question: "Can a ceramic coating prevent stone chips?", answer: "No. Ceramic coatings only shield against fine swirls and chemical oxidation. For complete protection against gravel impact, consider our TPU Paint Protection Film." }
      ],
      before_img: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop",
      after_img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop"
    },
    "paint-protection-film-ppf": {
      name: "Paint Protection Film (PPF)",
      description: "Paint Protection Film (PPF) is an elite thermoplastic polyurethane (TPU) layer applied directly to your car's exterior. It features advanced self-healing capabilities that make light swirls and key scratches disappear under direct solar warmth or warm water.",
      cover_image: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=1200&auto=format&fit=crop",
      price: 65000,
      benefits: [
        "Microscopic self-healing coating cures minor scratches",
        "Protects against sandblast, flying gravel, and key impacts",
        "Optical transparency enhances depth without paint color shifts",
        "10-Year warranty certificate against yellowing or peeling"
      ],
      faqs: [
        { question: "Is PPF worth the investment?", answer: "Yes, PPF is the absolute highest level of protection available for automotive paint, preserving factory clear coat and increasing vehicle resale value." },
        { question: "Can you wrap matte painted cars?", answer: "Yes! We offer specialized Matte PPF that protects matte surfaces or transforms gloss paint into a sleek satin finish." }
      ],
      before_img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop",
      after_img: "https://images.unsplash.com/photo-1611245785530-ab08a8a47de4?q=80&w=800&auto=format&fit=crop"
    }
  };

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const res = await api.get(`/services/${slug}`);
        setService(res.data);
      } catch (err) {
        console.error("Error fetching detail, loading fallback:", err);
        // Fallback matching slug key
        const fallback = defaultDetails[slug] || defaultDetails["ceramic-coating"];
        setService(fallback);
      } finally {
        setLoading(false);
      }
    };
    fetchServiceDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen py-24 flex items-center justify-center text-gray-500">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="bg-black min-h-screen py-24 flex flex-col items-center justify-center text-gray-400 px-4">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4 animate-bounce" />
        <h2 className="text-2xl font-black text-white uppercase tracking-wider mb-2">Service Not Found</h2>
        <p className="text-sm text-gray-500 mb-6">The requested detailing service page could not be located.</p>
        <Link to="/services" className="bg-accent text-black font-bold px-6 py-2.5 rounded-full uppercase tracking-wider text-xs">
          Back to Services
        </Link>
      </div>
    );
  }

  // Fallbacks for before/after comparison
  const beforeImage = service.before_img || "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop";
  const afterImage = service.after_img || service.cover_image || "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop";

  return (
    <div className="bg-black min-h-screen text-gray-300">
      <Helmet>
        <title>{`${service.name} | TAG Detailing Studio`}</title>
        <meta name="description" content={service.short_description || service.description} />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative h-[40vh] md:h-[50vh] w-full flex items-end">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
          <img src={service.cover_image} alt={service.name} className="w-full h-full object-cover" />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10">
          <Link to="/services" className="inline-flex items-center text-xs font-bold text-accent uppercase tracking-widest hover:underline mb-4">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Services
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">{service.name}</h1>
        </div>
      </section>

      {/* Detail Content */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-extrabold text-white uppercase tracking-wide">About the Service</h2>
              <p className="leading-relaxed text-gray-400 text-sm md:text-base">{service.description}</p>
            </div>

            {/* Benefits Checklist */}
            {service.benefits && service.benefits.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-extrabold text-white uppercase tracking-wide">Key Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="bg-accent/10 p-1.5 rounded-full text-accent flex-shrink-0 mt-0.5 border border-accent/20">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-xs md:text-sm text-gray-300 leading-normal">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Before & After Slider */}
            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl font-extrabold text-white uppercase tracking-wide">Before & After Showcase</h2>
              <BeforeAfterSlider before={beforeImage} after={afterImage} />
            </div>

          </div>

          {/* Sidebar CTA & FAQs */}
          <div className="space-y-8">
            
            {/* Pricing & Booking Card */}
            <div className="glass-panel border-white/5 p-8 rounded-3xl space-y-6">
              <div>
                <span className="text-xs text-gray-500 block">Estimated Cost Starts</span>
                <span className="text-2xl md:text-3xl font-black text-accent block mt-1">
                  {service.price ? `₹${service.price.toLocaleString()}` : "Custom Quote"}
                </span>
                <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">
                  *Actual pricing varies based on vehicle segments (Hatchback, Sedan, SUV, Luxury) and paint condition.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/5">
                <Link 
                  to={`/book-appointment?service=${encodeURIComponent(service.name)}`}
                  className="w-full bg-accent text-black font-extrabold py-3.5 rounded-full text-xs tracking-wider uppercase text-center block hover:bg-accent-hover transition duration-300"
                >
                  Book Appointment
                </Link>
                <a 
                  href="tel:09560815118"
                  className="w-full border border-white/10 text-white font-extrabold py-3.5 rounded-full text-xs tracking-wider uppercase text-center block hover:bg-white/5 transition duration-300"
                >
                  Call detailing Experts
                </a>
              </div>
            </div>

            {/* FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="glass-panel border-white/5 p-8 rounded-3xl">
                <h3 className="font-extrabold text-white uppercase tracking-wider text-sm mb-6 flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2 text-accent" /> FAQs
                </h3>
                <div className="space-y-2">
                  {service.faqs.map((faq, idx) => (
                    <FAQItem key={idx} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </section>
    </div>
  );
};

export default FoodDetail;
