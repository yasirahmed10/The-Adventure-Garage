import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, Clock, Car, Shield, CheckCircle2, Upload, X, MapPin } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import api from '../services/api';

const Reservation = () => {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || '';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle_brand: '',
    vehicle_model: '',
    vehicle_year: '',
    required_service: initialService,
    preferred_date: '',
    preferred_time: '10:00 AM',
    message: '',
    images: []
  });

  const [services, setServices] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingNumber, setBookingNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const timeSlots = [
    "10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", 
    "04:00 PM", "05:30 PM", "07:00 PM"
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        setServices(res.data);
        if (!initialService && res.data.length > 0) {
          setFormData(prev => ({ ...prev, required_service: res.data[0].name }));
        }
      } catch (err) {
        console.error("Error fetching services, loading static list:", err);
        setServices([
          { name: "Paint Protection Film (PPF)" },
          { name: "Ceramic Coating" },
          { name: "Vehicle Wrapping" },
          { name: "Premium Detailing" },
          { name: "4x4 Modifications" },
          { name: "Custom Thar Tail Lights" }
        ]);
      }
    };
    fetchServices();
  }, [initialService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setErrorMsg('');

    for (let i = 0; i < files.length; i++) {
      const fileData = new FormData();
      fileData.append('file', files[i]);
      fileData.append('folder', 'bookings');

      try {
        const res = await api.post('/media/public-upload', fileData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, res.data.file_url]
        }));
      } catch (err) {
        console.error("Image upload failed:", err);
        setErrorMsg("Failed to upload one or more images. Please make sure they are valid image files under 10MB.");
      }
    }
    setIsUploading(false);
  };

  const removeUploadedImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    // Prepare payload
    const payload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email || null,
      vehicle_brand: formData.vehicle_brand,
      vehicle_model: formData.vehicle_model,
      vehicle_year: formData.vehicle_year ? parseInt(formData.vehicle_year) : null,
      required_service: formData.required_service,
      preferred_date: formData.preferred_date,
      preferred_time: formData.preferred_time,
      message: formData.message || null,
      images: formData.images
    };

    try {
      const res = await api.post('/bookings/', payload);
      setBookingNumber(res.data.booking_number);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Booking failed:", err);
      setErrorMsg(err.response?.data?.detail || "Something went wrong while booking. Please verify details and try again.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 text-gray-300">
        <Helmet><title>Appointment Booked | TAG Studio</title></Helmet>
        <div className="glass-panel p-8 md:p-12 rounded-3xl max-w-xl w-full text-center border-accent/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
          
          <div className="w-20 h-20 bg-accent/10 border border-accent/30 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          
          <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-4">Inquiry Received</h2>
          <p className="text-gray-400 mb-8 text-sm md:text-base leading-relaxed">
            Thank you, <span className="text-white font-bold">{formData.name}</span>. Your detailing request for your <span className="text-white font-bold">{formData.vehicle_brand} {formData.vehicle_model}</span> has been registered. Our studio manager will review and contact you shortly.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
            <span className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Booking Reference</span>
            <span className="text-xl md:text-2xl font-mono font-bold text-accent tracking-wider block">{bookingNumber}</span>
            <div className="border-t border-white/5 mt-4 pt-4 text-xs text-gray-400 space-y-2">
              <p><strong className="text-white">Service:</strong> {formData.required_service}</p>
              <p><strong className="text-white">Requested Slot:</strong> {formData.preferred_date} at {formData.preferred_time}</p>
              <p><strong className="text-white">Phone:</strong> {formData.phone}</p>
            </div>
          </div>

          <button 
            onClick={() => window.location.href = '/'}
            className="bg-accent text-black px-10 py-3.5 rounded-full font-black uppercase text-sm hover:bg-accent-hover tracking-wider transition-all"
          >
            Return to Studio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-300 py-12">
      <Helmet><title>Book Appointment | TAG Detailing & Customization Studio</title></Helmet>
      
      {/* Banner */}
      <div className="relative h-60 bg-gradient-to-b from-[#111111] to-black border-b border-white/10 flex items-center justify-center text-center px-4">
        <div className="space-y-3">
          <span className="text-accent font-extrabold uppercase text-xs tracking-widest block">BOOK STUDIO</span>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Schedule Your Build</h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-xl mx-auto">Lock in a consultation or application slot. Let our experts elevate your ride.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-panel rounded-3xl border-white/5 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            
            {/* Sidebar Info */}
            <div className="lg:col-span-2 bg-[#090909] border-r border-white/5 p-8 md:p-12 flex flex-col justify-between space-y-12">
              <div>
                <h3 className="text-xl font-extrabold text-white uppercase tracking-wide mb-6">Studio Guidelines</h3>
                <ul className="space-y-4 text-xs text-gray-400 leading-relaxed">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 mr-2 flex-shrink-0" />
                    <span>Provide accurate vehicle parameters so we can prepare custom software/templates in advance.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 mr-2 flex-shrink-0" />
                    <span>Upload current photos of the vehicle (panels, scratches, bumpers) to help us estimate correction stages.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 mr-2 flex-shrink-0" />
                    <span>We hold time slots for 20 minutes. Please call if you are running late.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-6 border-t border-white/5 pt-8 text-xs text-gray-400">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white mb-1">TAG Kohefiza Studio</h4>
                    <p>Opposite Commissioner Office, Sultania Road, Bhopal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-3 p-8 md:p-12">
              {errorMsg && (
                <div className="bg-red-900/20 border border-red-500/30 text-red-400 p-4 rounded-xl text-xs mb-6">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Client Detail */}
                <h4 className="text-xs uppercase tracking-widest text-accent font-bold border-b border-white/5 pb-2 mb-4">1. Client Info</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Full Name *</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm transition" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Phone Number *</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm transition" placeholder="09560815118" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm transition" placeholder="john@example.com" />
                </div>

                {/* Vehicle Detail */}
                <h4 className="text-xs uppercase tracking-widest text-accent font-bold border-b border-white/5 pb-2 mb-4 pt-4">2. Vehicle Info</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Brand *</label>
                    <input required type="text" name="vehicle_brand" value={formData.vehicle_brand} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm transition" placeholder="Mahindra, Toyota, Mercedes" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Model *</label>
                    <input required type="text" name="vehicle_model" value={formData.vehicle_model} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm transition" placeholder="Thar, Fortuner, C-Class" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Year</label>
                    <input type="number" name="vehicle_year" value={formData.vehicle_year} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm transition" placeholder="2025" />
                  </div>
                </div>

                {/* Service Detail */}
                <h4 className="text-xs uppercase tracking-widest text-accent font-bold border-b border-white/5 pb-2 mb-4 pt-4">3. Custom Service Selection</h4>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Required Service *</label>
                  <select required name="required_service" value={formData.required_service} onChange={handleChange} className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm transition appearance-none">
                    {services.map((svc, idx) => (
                      <option key={idx} value={svc.name}>{svc.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Preferred Date *</label>
                    <div className="relative">
                      <input required type="date" name="preferred_date" value={formData.preferred_date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm transition" />
                      <Calendar className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Preferred Time Slot *</label>
                    <div className="relative">
                      <select required name="preferred_time" value={formData.preferred_time} onChange={handleChange} className="w-full bg-[#111111] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm transition appearance-none">
                        {timeSlots.map((slot, idx) => (
                          <option key={idx} value={slot}>{slot}</option>
                        ))}
                      </select>
                      <Clock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                    </div>
                  </div>
                </div>

                {/* Upload Image Section */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Upload Vehicle Images (Optional)</label>
                  <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center bg-white/5 relative">
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*"
                      onChange={handleImageUpload} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                      disabled={isUploading}
                    />
                    <Upload className="w-8 h-8 text-gray-500 mb-2" />
                    <span className="text-xs text-gray-400 font-bold">
                      {isUploading ? "Uploading files..." : "Drag files here or click to select"}
                    </span>
                    <span className="text-[10px] text-gray-600 mt-1">Images only, Max 10MB per file.</span>
                  </div>

                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mt-4">
                      {formData.images.map((imgUrl, idx) => (
                        <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group">
                          <img src={imgUrl} alt="Upload preview" className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            onClick={() => removeUploadedImage(idx)}
                            className="absolute top-1 right-1 bg-black/75 p-1 rounded-full text-red-500 hover:text-white"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Requirements or Message (Optional)</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows="3" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm transition resize-none" placeholder="Provide details like current wrap color, panel scratches, or lift preferences..."></textarea>
                </div>

                <button type="submit" className="w-full bg-accent text-black font-extrabold text-base py-4 rounded-full shadow-lg shadow-accent/10 hover:bg-accent-hover transition-all tracking-wider uppercase">
                  Submit Booking Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
