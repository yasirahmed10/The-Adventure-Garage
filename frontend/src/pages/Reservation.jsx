import React, { useState } from 'react';
import { Calendar, Clock, Users, UtensilsCrossed, CheckCircle2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    seating: 'indoor',
    requests: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call would go here
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Helmet><title>Reservation Confirmed | Jaffa</title></Helmet>
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center border-t-8 border-green-500">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Received!</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Thank you, {formData.name}. Your table request for {formData.guests} guests on {formData.date} at {formData.time} has been received. 
            We will send a confirmation message to {formData.phone} shortly.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-primary-500 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet><title>Book a Table | Jaffa</title></Helmet>
      
      {/* Header Banner */}
      <div className="relative h-64 md:h-80 bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1934&auto=format&fit=crop" 
          alt="Restaurant Interior" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Book Your Table</h1>
          <p className="text-lg text-gray-200 max-w-2xl">Experience premium dining. Reserve your spot in advance to avoid waiting.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-16 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* Contact Info Sidebar */}
            <div className="md:col-span-2 bg-secondary text-white p-8 md:p-12 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6">Reservation Info</h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  For parties larger than 10 or special events, please contact us directly. We hold tables for 15 minutes past the reservation time.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-primary-500 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Operating Hours</h4>
                      <p className="text-gray-400 text-sm">Mon-Fri: 10am - 11pm</p>
                      <p className="text-gray-400 text-sm">Sat-Sun: 9am - 11:30pm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-3 p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" placeholder="john@example.com" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                    <div className="relative">
                      <input required type="date" name="date" value={formData.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
                      <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                    <div className="relative">
                      <input required type="time" name="time" value={formData.time} onChange={handleChange} className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
                      <Clock className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests *</label>
                    <div className="relative">
                      <select required name="guests" value={formData.guests} onChange={handleChange} className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none appearance-none">
                        {[1,2,3,4,5,6,7,8,9,10].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                        ))}
                      </select>
                      <Users className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Seating Preference</label>
                    <div className="relative">
                      <select name="seating" value={formData.seating} onChange={handleChange} className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none appearance-none">
                        <option value="indoor">Indoor Dining</option>
                        <option value="outdoor">Outdoor Patio</option>
                      </select>
                      <UtensilsCrossed className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests (Optional)</label>
                  <textarea name="requests" value={formData.requests} onChange={handleChange} rows="3" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none" placeholder="Anniversary, birthday, allergies, etc."></textarea>
                </div>

                <button type="submit" className="w-full bg-primary-500 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary-500/30 hover:bg-primary-600 hover:shadow-xl transition-all">
                  Confirm Reservation
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
