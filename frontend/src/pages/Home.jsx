import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Star, Clock, Truck, ShieldCheck, MapPin } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  // Mock data for initial render
  const heroSlides = [
    {
      id: 1,
      image: "/images/shawarma_wrap.png",
      title: "Authentic Lebanese Shawarmas",
      subtitle: "Experience the true taste of slow-roasted chicken wrapped in warm, freshly-baked pita bread.",
      buttonText: "Order Now",
      buttonLink: "/menu"
    },
    {
      id: 2,
      image: "/images/chicken_rice_bowl.png",
      title: "Premium Spiced Rice Bowls",
      subtitle: "Fragrant basmati rice bowls topped with roasted chicken shawarma and our signature garlic sauce.",
      buttonText: "View Menu",
      buttonLink: "/menu"
    }
  ];

  const categories = [
    { id: 1, name: "Shawarmas", image: "/images/shawarma_wrap.png" },
    { id: 2, name: "Open Platters", image: "/images/shawarma_platter.png" },
    { id: 3, name: "Rice Bowls", image: "/images/chicken_rice_bowl.png" },
    { id: 8, name: "Turkish Baklava", image: "/images/turkish_baklava.png" },
  ];

  const popularFoods = [
    { id: 8, name: "Mughlai Chicken Shawarma", price: 160, rating: 4.9, image: "/images/mughlai_shawarma.png", description: "Rich, creamy Mughlai spices infused in juicy chicken shawarma wrap with fries." },
    { id: 16, name: "Jaffa Chicken Burrito", price: 210, rating: 4.9, image: "/images/spicy_shawarma.png", description: "Jaffa style Mexican burrito loaded with spiced chicken, rice, beans, and fresh salsa." },
    { id: 13, name: "Chicken Rice Bowl", price: 260, rating: 4.9, image: "/images/chicken_rice_bowl.png", description: "Spiced basmati rice topped with juicy chicken shawarma meat and signature sauce." },
    { id: 14, name: "Chicken Seekh Kebab Rice Bowl", price: 260, rating: 4.9, image: "/images/chicken_rice_bowl.png", description: "Skewered chicken seekh kebab served over fragrant rice with mint chutney." },
  ];

  return (
    <div className="w-full">
      <Helmet>
        <title>Jaffa | Premium Food Outlet</title>
        <meta name="description" content="Experience premium dining and home delivery with Jaffa." />
      </Helmet>

      {/* Hero Slider */}
      <section className="relative h-[600px] w-full">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          className="h-full w-full"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full w-full">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl"
                  >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-8 font-light">
                      {slide.subtitle}
                    </p>
                    <Link
                      to={slide.buttonLink}
                      className="inline-block bg-primary-500 text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      {slide.buttonText}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:shadow-md transition-shadow">
              <div className="bg-primary-100 p-4 rounded-full mb-4 text-primary-500">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Hot and fresh food delivered to your door in under 30 minutes.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:shadow-md transition-shadow">
              <div className="bg-primary-100 p-4 rounded-full mb-4 text-primary-500">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-600">We use only the finest, freshest ingredients sourced locally.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:shadow-md transition-shadow">
              <div className="bg-primary-100 p-4 rounded-full mb-4 text-primary-500">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Multiple Locations</h3>
              <p className="text-gray-600">Find a Jaffa outlet near you and enjoy the same great taste everywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Our Menu</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link key={cat.id} to={`/menu?category=${cat.id}`} className="group relative rounded-2xl overflow-hidden aspect-square cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
                <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 text-center">
                  <h3 className="text-xl font-bold text-white tracking-wide">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Dishes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Dishes</h2>
              <div className="w-24 h-1 bg-primary-500 rounded-full"></div>
            </div>
            <Link to="/menu" className="text-primary-600 font-medium hover:text-primary-700 hidden sm:block">View Full Menu &rarr;</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularFoods.map((food) => (
              <div key={food.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img src={food.image} alt={food.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center shadow-sm">
                    <Star className="w-4 h-4 text-yellow-400 mr-1 fill-yellow-400" />
                    <span className="text-sm font-bold">{food.rating}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{food.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{food.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary-600">₹{food.price}</span>
                    <button className="bg-gray-900 text-white p-2 rounded-full hover:bg-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/menu" className="inline-block bg-primary-50 text-primary-600 font-medium px-6 py-3 rounded-full">View Full Menu</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-secondary">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Hungry? We're open!</h2>
          <p className="text-xl text-gray-300 mb-10">Book a table for a premium dining experience or order online for fast home delivery.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/reservation" className="bg-primary-500 text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-primary-600 transition shadow-lg hover:shadow-primary-500/30">
              Book a Table
            </Link>
            <Link to="/menu" className="bg-white text-secondary font-bold text-lg px-8 py-4 rounded-full hover:bg-gray-100 transition shadow-lg">
              Order Delivery
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
