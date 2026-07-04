import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, Minus, Plus, ShoppingBag, ShieldAlert, Heart, Share2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Helmet } from 'react-helmet-async';

const FoodDetail = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // Mock data fetching based on slug
  const food = {
    id: parseInt(slug) || 1,
    name: "Mughlai Chicken Shawarma",
    description: "Rich, creamy Mughlai spices infused in juicy chicken shawarma wrap with fries. Made with tender chicken, garlic mayo, and traditional spices.",
    price: 160,
    discount_percent: 0,
    rating: 4.9,
    rating_count: 85,
    preparation_time: 15,
    ingredients: "Charcoal chicken, Mughlai cream sauce, Garlic Toum, Pickled cucumber, Crispy fries",
    allergens: "Dairy, Gluten",
    nutrition_info: { calories: 650, protein: "32g", carbs: "48g", fat: "22g" },
    is_available: true,
    type: "non_veg",
    spice_level: "medium",
    images: [
      "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1642686333215-de0f6990bf9b?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529003600303-bd51f3c83707?w=800&auto=format&fit=crop"
    ]
  };

  const actualPrice = food.price * (1 - food.discount_percent / 100);

  const handleAddToCart = () => {
    addToCart(food, quantity);
    // Add toast notification here
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <Helmet>
        <title>{food.name} | Jaffa</title>
        <meta name="description" content={food.description} />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-primary-500">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/menu" className="hover:text-primary-500">Menu</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{food.name}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Image Gallery */}
            <div className="p-6 bg-gray-50">
              <div className="relative rounded-xl overflow-hidden aspect-square mb-4 bg-white border border-gray-200">
                <img src={food.images[activeImage]} alt={food.name} className="w-full h-full object-cover" />
                {food.discount_percent > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white font-bold px-3 py-1.5 rounded-lg shadow-md">
                    {food.discount_percent}% OFF
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1 fill-yellow-400" />
                  <span className="font-bold">{food.rating}</span>
                  <span className="text-gray-500 text-xs ml-1">({food.rating_count})</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {food.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`rounded-lg overflow-hidden border-2 aspect-square ${activeImage === idx ? 'border-primary-500 ring-2 ring-primary-200' : 'border-transparent hover:border-gray-300'} transition-all`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">{food.name}</h1>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition"><Heart className="w-6 h-6" /></button>
                  <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition"><Share2 className="w-6 h-6" /></button>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center text-sm font-medium">
                  {food.type === 'veg' ? (
                    <span className="flex items-center text-green-700 bg-green-50 px-2 py-1 rounded border border-green-200">
                      <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div> Vegetarian
                    </span>
                  ) : (
                    <span className="flex items-center text-red-700 bg-red-50 px-2 py-1 rounded border border-red-200">
                      <div className="w-3 h-3 bg-red-600 transform rotate-45 mr-2"></div> Non-Veg
                    </span>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1 text-gray-400" /> {food.preparation_time} mins prep
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-end">
                  <span className="text-4xl font-bold text-primary-600">₹{actualPrice.toFixed(2)}</span>
                  {food.discount_percent > 0 && (
                    <span className="ml-3 text-lg text-gray-400 line-through mb-1">₹{food.price.toFixed(2)}</span>
                  )}
                </div>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                {food.description}
              </p>

              <div className="border-t border-b border-gray-100 py-6 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  
                  {/* Quantity */}
                  <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white w-fit">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 text-gray-600 hover:text-primary-500 hover:bg-gray-50 rounded-l-xl transition"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 text-gray-600 hover:text-primary-500 hover:bg-gray-50 rounded-r-xl transition"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button 
                    onClick={handleAddToCart}
                    disabled={!food.is_available}
                    className={`flex-1 flex items-center justify-center py-3.5 px-6 rounded-xl text-lg font-bold transition-all shadow-lg ${food.is_available ? 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-xl shadow-primary-500/30' : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'}`}
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    {food.is_available ? 'Add to Cart' : 'Currently Unavailable'}
                  </button>

                </div>
              </div>

              {/* Info Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 flex items-center">Ingredients</h4>
                  <p className="text-gray-600">{food.ingredients}</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 flex items-center"><ShieldAlert className="w-4 h-4 mr-1 text-yellow-500" /> Allergens</h4>
                  <p className="text-gray-600">{food.allergens || "None listed"}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FoodDetail;
