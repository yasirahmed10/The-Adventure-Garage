import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Circle, Clock, MapPin, Phone, Receipt, ShieldCheck, Truck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const OrderStatus = () => {
  const { orderNumber } = useParams();
  const [currentStep, setCurrentStep] = useState(2); // 1 = Placed, 2 = Preparing, 3 = Out for Delivery, 4 = Delivered
  const [eta, setEta] = useState(18); // minutes

  // Simulate order status updates for demo purposes
  useEffect(() => {
    const statusTimer = setTimeout(() => {
      setCurrentStep(3);
      setEta(8);
    }, 120000); // changes to Out for Delivery in 2 mins

    return () => clearTimeout(statusTimer);
  }, []);

  const orderDetails = {
    order_id: orderNumber || 'JAF-984712',
    date: new Date().toLocaleDateString(),
    payment_method: 'UPI (Paytm)',
    address: 'Flat 402, Sunshine Apartments, Indrapuri Sector C, Bhopal - 462022',
    items: [
      { name: 'Classic Chicken Shawarma', quantity: 2, price: 130 },
      { name: 'Peri-Peri Fries', quantity: 1, price: 120 },
      { name: 'Mint Mojito', quantity: 2, price: 90 }
    ],
    delivery_charge: 0,
    gst: 28, // 5% GST
    subtotal: 560,
    total: 588,
    rider: {
      name: 'Ramesh Kumar',
      phone: '+91 99999 88888',
      avatar: 'R'
    }
  };

  const steps = [
    { id: 1, title: 'Order Placed', desc: 'Received by Jaffa kitchen', icon: Receipt },
    { id: 2, title: 'Preparing', desc: 'Charcoal roasting in progress', icon: Clock },
    { id: 3, title: 'Out for Delivery', desc: 'Rider is on the way', icon: Truck },
    { id: 4, title: 'Delivered', desc: 'Enjoy your Jaffa Shawarma!', icon: ShieldCheck }
  ];

  return (
    <div className="bg-[#e6f4ff] min-h-screen py-12">
      <Helmet>
        <title>Track Order | Jaffa Shawarma</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Status Header */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase block mb-1">Order Number</span>
            <h1 className="text-2xl font-bold text-gray-900 font-mono">{orderDetails.order_id}</h1>
          </div>
          
          {currentStep < 4 ? (
            <div className="bg-primary-50 px-5 py-3 rounded-2xl border border-primary-100 flex items-center">
              <Clock className="w-6 h-6 text-primary-500 mr-3 animate-spin" />
              <div>
                <span className="text-[10px] text-primary-600 font-bold uppercase tracking-wider block">Estimated Delivery</span>
                <span className="text-lg font-bold text-gray-900">{eta} Mins remaining</span>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 px-5 py-3 rounded-2xl border border-green-100 flex items-center">
              <CheckCircle2 className="w-6 h-6 text-green-600 mr-3" />
              <div>
                <span className="text-[10px] text-green-600 font-bold uppercase tracking-wider block">Order Status</span>
                <span className="text-lg font-bold text-gray-900">Delivered</span>
              </div>
            </div>
          )}
        </div>

        {/* Progress Tracker */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-8">Track Progress</h2>
          
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute left-[12.5%] right-[12.5%] top-7 h-1 bg-gray-200 -translate-y-1/2 z-0">
              <div 
                className="h-full bg-primary-500 transition-all duration-1000"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {steps.map((step) => {
                const Icon = step.icon;
                const isCompleted = step.id < currentStep;
                const isActive = step.id === currentStep;
                
                return (
                  <div key={step.id} className="flex md:flex-col items-center md:text-center group gap-4 md:gap-0">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 md:mb-4 ${
                      isCompleted 
                        ? 'bg-primary-500 border-primary-500 text-white shadow-lg shadow-primary-500/20' 
                        : isActive 
                        ? 'bg-white border-primary-500 text-primary-500 ring-4 ring-primary-100 font-bold' 
                        : 'bg-white border-gray-200 text-gray-400'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`font-bold text-base transition-colors ${
                        isActive ? 'text-primary-600' : isCompleted ? 'text-gray-900' : 'text-gray-400'
                      }`}>{step.title}</h3>
                      <p className="text-gray-500 text-xs mt-1 leading-relaxed md:max-w-[150px] md:mx-auto">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Order Details & Items (Invoice) */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-gray-900 border-b pb-4 flex items-center">
              <Receipt className="w-5 h-5 mr-2 text-gray-400" /> Bill Summary
            </h2>
            
            <ul className="divide-y divide-gray-100">
              {orderDetails.items.map((item, idx) => (
                <li key={idx} className="py-4 flex justify-between text-sm">
                  <div>
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-gray-500 text-xs mt-0.5">Quantity: {item.quantity} x ₹{item.price}</p>
                  </div>
                  <span className="font-semibold text-gray-900">₹{item.quantity * item.price}</span>
                </li>
              ))}
            </ul>

            <div className="border-t pt-4 space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">₹{orderDetails.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="font-semibold text-gray-900">₹{orderDetails.delivery_charge}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (5% GST)</span>
                <span className="font-semibold text-gray-900">₹{orderDetails.gst}</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                <span className="text-base font-bold text-gray-900">Total Bill</span>
                <span className="text-xl font-bold text-primary-600">₹{orderDetails.total}</span>
              </div>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="space-y-8">
            {/* Delivery address */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-gray-400" /> Delivery Address
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">{orderDetails.address}</p>
            </div>

            {/* Rider contact details */}
            {currentStep > 1 && currentStep < 4 && (
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Delivery Partner</h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                      {orderDetails.rider.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{orderDetails.rider.name}</h3>
                      <p className="text-gray-500 text-xs">Jaffa Delivery Executive</p>
                    </div>
                  </div>
                  <a 
                    href={`tel:${orderDetails.rider.phone}`}
                    className="bg-primary-50 hover:bg-primary-100 p-2.5 rounded-xl text-primary-500 transition"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Back button */}
        <div className="mt-8 text-center">
          <Link to="/" className="text-primary-600 font-medium hover:text-primary-700">
            &larr; Return to Homepage
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OrderStatus;
