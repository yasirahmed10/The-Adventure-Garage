import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Helmet } from 'react-helmet-async';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const deliveryCharge = cartTotal > 0 && cartTotal < 299 ? 40 : 0;
  const tax = (cartTotal - discount) * 0.05;
  const finalTotal = cartTotal - discount + deliveryCharge + tax;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'JAFFA50') {
      setDiscount(50);
    } else {
      alert("Invalid coupon code");
      setDiscount(0);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      // In a real app, redirect to login or show modal, then redirect back to cart/checkout
      alert("Please login to proceed to checkout");
      return;
    }
    // Navigate to a dedicated checkout page or show checkout form here
    alert("Proceeding to checkout...");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <Helmet><title>Cart | Jaffa</title></Helmet>
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
          <div className="w-20 h-20 bg-primary-50 text-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/menu" className="block w-full bg-primary-500 text-white font-semibold py-3 rounded-xl hover:bg-primary-600 transition-colors">
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <Helmet><title>Cart | Jaffa</title></Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {cart.map((item) => (
                      <li key={item.id} className="py-6 flex flex-col sm:flex-row">
                        <div className="flex-shrink-0 w-full sm:w-24 h-48 sm:h-24 mb-4 sm:mb-0 rounded-lg overflow-hidden border border-gray-200">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="sm:ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3 className="line-clamp-1"><Link to={`/food/${item.id}`}>{item.name}</Link></h3>
                              <p className="ml-4">₹{((item.price * (1 - item.discount_percent/100)) * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">₹{(item.price * (1 - item.discount_percent/100)).toFixed(2)} each</p>
                          </div>
                          
                          <div className="flex-1 flex items-end justify-between text-sm mt-4">
                            <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 text-gray-600 hover:text-primary-500 hover:bg-gray-50 rounded-l-lg transition"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 font-medium">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 text-gray-600 hover:text-primary-500 hover:bg-gray-50 rounded-r-lg transition"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            <button 
                              type="button" 
                              onClick={() => removeFromCart(item.id)}
                              className="font-medium text-red-500 hover:text-red-700 flex items-center transition"
                            >
                              <Trash2 className="w-4 h-4 mr-1" /> Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 p-4 border-t border-gray-200">
                <Link to="/menu" className="text-primary-600 font-medium hover:text-primary-700 flex items-center justify-center md:justify-start">
                  &larr; Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <form onSubmit={handleApplyCoupon} className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Have a coupon code?</label>
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 uppercase"
                    placeholder="ENTER CODE"
                  />
                  <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
                    Apply
                  </button>
                </div>
                {discount > 0 && <p className="text-green-600 text-xs mt-2">Coupon applied successfully!</p>}
              </form>

              <dl className="space-y-4 text-sm text-gray-600 border-t pt-6">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="font-medium text-gray-900">₹{cartTotal.toFixed(2)}</dd>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <dt>Discount</dt>
                    <dd className="font-medium">-₹{discount.toFixed(2)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="flex items-center">
                    Delivery Charge
                    {deliveryCharge === 0 && <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Free</span>}
                  </dt>
                  <dd className="font-medium text-gray-900">₹{deliveryCharge.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Taxes (5% GST)</dt>
                  <dd className="font-medium text-gray-900">₹{tax.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                  <dt className="text-base font-bold text-gray-900">Total</dt>
                  <dd className="text-xl font-bold text-primary-600">₹{finalTotal.toFixed(2)}</dd>
                </div>
              </dl>

              {!user && (
                <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    <Link to="/login" className="font-bold underline">Login or Register</Link> to checkout faster and track your orders.
                  </p>
                </div>
              )}

              <div className="mt-6">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-primary-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-500/30 hover:bg-primary-600 hover:shadow-xl transition-all flex justify-center items-center"
                >
                  Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 flex items-center justify-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Delivery available within 10km radius
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
