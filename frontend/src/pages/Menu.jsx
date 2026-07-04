import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Helmet } from 'react-helmet-async';

const Menu = () => {
  const { addToCart } = useCart();
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [foodType, setFoodType] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    // Mock data fetching
    setTimeout(() => {
      setCategories([
        { id: 1, name: 'Shawarma' },
        { id: 2, name: 'Open Shawarma Platter' },
        { id: 3, name: 'Rice Bowl' },
        { id: 4, name: 'Tortilla & Burrito' },
        { id: 5, name: 'Sandwich' },
        { id: 6, name: 'Veg Specials' },
        { id: 7, name: 'Fries & Extras' },
        { id: 8, name: 'Baklava' },
        { id: 9, name: 'Beverages' },
      ]);
      
      setFoods([
        // Shawarma
        { id: 1, name: "Classic Chicken Shawarma", category_id: 1, type: "non_veg", price: 130, rating: 4.7, image: "/images/shawarma_wrap.png", description: "Slow-roasted shaved chicken wrapped in warm pita bread with garlic sauce and pickles.", spice_level: "mild", discount_percent: 0 },
        { id: 2, name: "Spicy Chicken Shawarma", category_id: 1, type: "non_veg", price: 160, rating: 4.8, image: "/images/spicy_shawarma.png", description: "Shaved chicken with spicy harissa paste, garlic sauce, and pickles in pita.", spice_level: "hot", discount_percent: 0 },
        { id: 3, name: "Garlic Chicken Shawarma", category_id: 1, type: "non_veg", price: 160, rating: 4.6, image: "/images/garlic_shawarma.png", description: "Loaded with extra garlic toum, roasted chicken, and crispy fries wrapped in pita.", spice_level: "mild", discount_percent: 0 },
        { id: 4, name: "Barbeque Chicken Shawarma", category_id: 1, type: "non_veg", price: 180, rating: 4.7, image: "/images/bbq_shawarma.png", description: "Roasted chicken tossed in smoky BBQ sauce, wrapped with onions and cabbage.", spice_level: "mild", discount_percent: 0 },
        { id: 5, name: "Cheese Chicken Shawarma", category_id: 1, type: "non_veg", price: 170, rating: 4.8, image: "/images/cheese_shawarma.png", description: "Tender chicken shawarma with melted mozzarella cheese and signature garlic sauce.", spice_level: "mild", discount_percent: 10 },
        { id: 6, name: "Double Chicken Shawarma", category_id: 1, type: "non_veg", price: 170, rating: 4.9, image: "/images/double_shawarma.png", description: "Double portion of roasted chicken shawarma meat wrapped in toasted pita.", spice_level: "medium", discount_percent: 0 },
        { id: 7, name: "Whole Meat Chicken Shawarma", category_id: 1, type: "non_veg", price: 170, rating: 4.8, image: "/images/shawarma_wrap.png", description: "Pure chicken shawarma meat with garlic sauce, no vegetables included.", spice_level: "mild", discount_percent: 0 },
        { id: 8, name: "Mughlai Chicken Shawarma", category_id: 1, type: "non_veg", price: 160, rating: 4.9, image: "/images/mughlai_shawarma.png", description: "Rich, creamy Mughlai spices infused in juicy chicken shawarma wrap with fries.", spice_level: "medium", discount_percent: 0 },
        
        // Open Platters
        { id: 9, name: "Bhuna Spicy Chicken Open Platter", category_id: 2, type: "non_veg", price: 240, rating: 4.8, image: "/images/bhuna_platter.png", description: "Deconstructed shawarma with dry-roasted bhuna chicken, salad, pita bread, and dips.", spice_level: "hot", discount_percent: 0 },
        { id: 10, name: "Mughlai Chicken Open Platter", category_id: 2, type: "non_veg", price: 240, rating: 4.7, image: "/images/shawarma_platter.png", description: "Creamy Mughlai style chicken shawarma meat served on a platter with two warm pitas.", spice_level: "medium", discount_percent: 0 },
        { id: 11, name: "Chicken Tortilla Open Platter", category_id: 2, type: "non_veg", price: 250, rating: 4.6, image: "/images/shawarma_platter.png", description: "Tender chicken shawarma served over sliced toasted tortillas with salsa and garlic sauce.", spice_level: "medium", discount_percent: 0 },
        { id: 12, name: "Lebanese Style Open Platter", category_id: 2, type: "non_veg", price: 250, rating: 4.8, image: "/images/shawarma_platter.png", description: "Classic Lebanese style platter with shawarma meat, pickled veggies, hummus, and pita.", spice_level: "mild", discount_percent: 0 },
        
        // Rice Bowls
        { id: 13, name: "Chicken Rice Bowl", category_id: 3, type: "non_veg", price: 260, rating: 4.9, image: "/images/chicken_rice_bowl.png", description: "Spiced basmati rice topped with juicy chicken shawarma meat and signature sauce.", spice_level: "medium", discount_percent: 0 },
        { id: 14, name: "Chicken Seekh Kebab Rice Bowl", category_id: 3, type: "non_veg", price: 260, rating: 4.9, image: "/images/chicken_rice_bowl.png", description: "Skewered chicken seekh kebab served over fragrant rice with mint chutney.", spice_level: "medium", discount_percent: 0 },
        
        // Tortilla & Burrito
        { id: 15, name: "Chicken Tortilla Wrap", category_id: 4, type: "non_veg", price: 220, rating: 4.7, image: "/images/shawarma_wrap.png", description: "Grilled tortilla wrap stuffed with shredded chicken shawarma, fries, and garlic sauce.", spice_level: "mild", discount_percent: 0 },
        { id: 16, name: "Jaffa Chicken Burrito", category_id: 4, type: "non_veg", price: 210, rating: 4.9, image: "/images/spicy_shawarma.png", description: "Jaffa style Mexican burrito loaded with spiced chicken, rice, beans, and fresh salsa.", spice_level: "medium", discount_percent: 0 },
        
        // Sandwich
        { id: 17, name: "Italian Chicken Grilled Sandwich", category_id: 5, type: "non_veg", price: 190, rating: 4.6, image: "/images/grilled_sandwich.png", description: "Tender Italian herbs, grilled chicken, mozzarella, and pesto sauce in focaccia.", spice_level: "mild", discount_percent: 0 },
        { id: 18, name: "Mexican Chicken Grilled Sandwich", category_id: 5, type: "non_veg", price: 190, rating: 4.7, image: "/images/grilled_sandwich.png", description: "Spiced Mexican chicken, bell peppers, onions, and cheese in grilled sandwich.", spice_level: "medium", discount_percent: 0 },
        { id: 19, name: "Chicken Tikka Sandwich", category_id: 5, type: "non_veg", price: 180, rating: 4.8, image: "/images/grilled_sandwich.png", description: "Tandoori chicken tikka pieces with mint mayo, toasted in bread.", spice_level: "medium", discount_percent: 10 },
        
        // Veg Specials
        { id: 20, name: "Paneer Shawarma", category_id: 6, type: "veg", price: 140, rating: 4.5, image: "/images/paneer_wrap.png", description: "Grilled paneer marinated in shawarma spices, wrapped with garlic mayonnaise and salad.", spice_level: "mild", discount_percent: 0 },
        { id: 21, name: "Paneer Tortilla Wrap", category_id: 6, type: "veg", price: 180, rating: 4.6, image: "/images/paneer_wrap.png", description: "Spicy paneer chunks, onions, peppers, and melted cheese in a toasted tortilla.", spice_level: "medium", discount_percent: 0 },
        { id: 22, name: "Paneer Grilled Sandwich", category_id: 6, type: "veg", price: 160, rating: 4.6, image: "/images/paneer_wrap.png", description: "Marinated paneer slices grilled in sandwich bread with mint spread.", spice_level: "mild", discount_percent: 0 },
        { id: 23, name: "Paneer Rice Bowl", category_id: 6, type: "veg", price: 220, rating: 4.7, image: "/images/paneer_wrap.png", description: "Spiced rice bowl topped with tandoori paneer tikka chunks and salad.", spice_level: "medium", discount_percent: 0 },
        
        // Fries & Extras
        { id: 24, name: "Plain & Salted Fries", category_id: 7, type: "veg", price: 110, rating: 4.5, image: "/images/french_fries.png", description: "Classic crispy golden salted French fries.", spice_level: "mild", discount_percent: 0 },
        { id: 25, name: "Peri-Peri Fries", category_id: 7, type: "veg", price: 120, rating: 4.7, image: "/images/french_fries.png", description: "Crispy french fries tossed in spicy peri-peri seasoning.", spice_level: "hot", discount_percent: 0 },
        { id: 26, name: "Extra Pita Bread", category_id: 7, type: "veg", price: 20, rating: 4.4, image: "/images/french_fries.png", description: "One extra piece of freshly baked warm pita bread.", spice_level: "mild", discount_percent: 0 },
        { id: 27, name: "Dip (Garlic/Spicy/Cheese)", category_id: 7, type: "veg", price: 20, rating: 4.5, image: "/images/french_fries.png", description: "Choose your dip: Garlic Toum, Spicy Harissa, or Melted Cheese.", spice_level: "mild", discount_percent: 0 },
        
        // Baklava
        { id: 28, name: "Söbiyet Triangle Baklava (4pcs)", category_id: 8, type: "veg", price: 150, rating: 4.9, image: "/images/turkish_baklava.png", description: "Authentic Turkish triangle baklava filled with pistachio, almonds, and sweet clotted cream.", spice_level: "mild", discount_percent: 0 },
        { id: 29, name: "Söbiyet Triangle Baklava (8pcs)", category_id: 8, type: "veg", price: 280, rating: 4.9, image: "/images/turkish_baklava.png", description: "Authentic Turkish triangle baklava filled with pistachio, almonds, and sweet clotted cream (large portion).", spice_level: "mild", discount_percent: 0 },
        { id: 30, name: "Özel Kare Square Baklava (4pcs)", category_id: 8, type: "veg", price: 210, rating: 4.9, image: "/images/turkish_baklava.png", description: "Premium Turkish square baklava made with layers of filo pastry and premium pistachio filling.", spice_level: "mild", discount_percent: 0 },
        { id: 31, name: "Özel Kare Square Baklava (8pcs)", category_id: 8, type: "veg", price: 400, rating: 4.9, image: "/images/turkish_baklava.png", description: "Premium Turkish square baklava made with layers of filo pastry and premium pistachio filling (large portion).", spice_level: "mild", discount_percent: 0 },
        
        // Beverages
        { id: 32, name: "Lahori Zeera", category_id: 9, type: "veg", price: 20, rating: 4.6, image: "/images/cold_beverage.png", description: "Traditional spiced cumin soda drink.", spice_level: "mild", discount_percent: 0 },
        { id: 33, name: "Lahori Nimboo", category_id: 9, type: "veg", price: 20, rating: 4.5, image: "/images/cold_beverage.png", description: "Zesty lemon soda with traditional spices.", spice_level: "mild", discount_percent: 0 },
        { id: 34, name: "Mint Mojito", category_id: 9, type: "veg", price: 90, rating: 4.8, image: "/images/cold_beverage.png", description: "Refreshing blend of mint leaves, lime juice, and soda over ice.", spice_level: "mild", discount_percent: 0 },
        { id: 35, name: "Coca-Cola", category_id: 9, type: "veg", price: 40, rating: 4.6, image: "/images/cold_beverage.png", description: "Classic chilled carbonated soft drink.", spice_level: "mild", discount_percent: 0 },
        { id: 36, name: "Diet Coca-Cola", category_id: 9, type: "veg", price: 40, rating: 4.5, image: "/images/cold_beverage.png", description: "Zero sugar, zero calorie Coke.", spice_level: "mild", discount_percent: 0 },
        { id: 37, name: "Sprite", category_id: 9, type: "veg", price: 40, rating: 4.6, image: "/images/cold_beverage.png", description: "Chilled lemon-lime carbonated soft drink.", spice_level: "mild", discount_percent: 0 }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleAddToCart = (e, food) => {
    e.preventDefault();
    addToCart(food);
    // Could trigger a toast notification here
  };

  // Filter logic
  const filteredFoods = foods.filter(food => {
    const matchSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = activeCategory === 'all' || food.category_id === parseInt(activeCategory);
    const matchType = foodType === 'all' || food.type === foodType;
    return matchSearch && matchCategory && matchType;
  }).sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // popular
  });

  return (
    <div className="bg-[#e6f4ff] min-h-screen py-8">
      <Helmet>
        <title>Our Menu | Jaffa</title>
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Our Menu</h1>
            <p className="text-gray-500 mt-1">Discover our delicious offerings</p>
          </div>
          
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Search food..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center space-x-2 mb-6 border-b pb-4">
                <Filter className="w-5 h-5 text-primary-500" />
                <h2 className="text-lg font-bold">Filters</h2>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => setActiveCategory('all')}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeCategory === 'all' ? 'bg-primary-50 text-primary-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    All Categories
                  </button>
                  {categories.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeCategory === cat.id ? 'bg-primary-50 text-primary-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Food Type */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Dietary</h3>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="foodType" checked={foodType === 'all'} onChange={() => setFoodType('all')} className="text-primary-500 focus:ring-primary-500" />
                    <span>All</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="foodType" checked={foodType === 'veg'} onChange={() => setFoodType('veg')} className="text-green-500 focus:ring-green-500" />
                    <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-500 mr-2 border border-green-700"></span> Vegetarian</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="foodType" checked={foodType === 'non_veg'} onChange={() => setFoodType('non_veg')} className="text-red-500 focus:ring-red-500" />
                    <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-500 mr-2 border border-red-700"></span> Non-Veg</span>
                  </label>
                </div>
              </div>

              {/* Sort */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border-gray-300 rounded-lg text-sm focus:ring-primary-500 focus:border-primary-500 p-2 border"
                >
                  <option value="popular">Popularity</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>

            </div>
          </div>

          {/* Food Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 shadow-sm animate-pulse h-80">
                    <div className="bg-gray-200 h-40 rounded-xl mb-4"></div>
                    <div className="bg-gray-200 h-6 w-3/4 mb-2 rounded"></div>
                    <div className="bg-gray-200 h-4 w-1/2 mb-4 rounded"></div>
                    <div className="flex justify-between items-center mt-auto">
                      <div className="bg-gray-200 h-6 w-1/4 rounded"></div>
                      <div className="bg-gray-200 h-10 w-10 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredFoods.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No foods found</h3>
                <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                <button 
                  onClick={() => { setSearchTerm(''); setActiveCategory('all'); setFoodType('all'); }}
                  className="mt-6 text-primary-500 font-medium hover:text-primary-600"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredFoods.map(food => (
                  <Link key={food.id} to={`/food/${food.id}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img src={food.image} alt={food.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      
                      {food.discount_percent > 0 && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                          {food.discount_percent}% OFF
                        </div>
                      )}
                      
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center shadow-sm">
                        <Star className="w-4 h-4 text-yellow-400 mr-1 fill-yellow-400" />
                        <span className="text-sm font-bold">{food.rating}</span>
                      </div>
                      
                      <div className="absolute bottom-4 left-4">
                        {food.type === 'veg' ? (
                          <div className="w-5 h-5 bg-white rounded flex items-center justify-center shadow">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                        ) : (
                          <div className="w-5 h-5 bg-white rounded flex items-center justify-center shadow">
                            <div className="w-3 h-3 bg-red-500 rounded-[2px] transform rotate-45"></div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{food.name}</h3>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">{food.description}</p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div>
                          {food.discount_percent > 0 ? (
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-primary-600">₹{(food.price * (1 - food.discount_percent/100)).toFixed(2)}</span>
                              <span className="text-sm text-gray-400 line-through">₹{food.price}</span>
                            </div>
                          ) : (
                            <span className="text-xl font-bold text-primary-600">₹{food.price}</span>
                          )}
                        </div>
                        <button 
                          onClick={(e) => handleAddToCart(e, food)}
                          className="bg-primary-50 text-primary-600 p-2.5 rounded-full hover:bg-primary-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Menu;
