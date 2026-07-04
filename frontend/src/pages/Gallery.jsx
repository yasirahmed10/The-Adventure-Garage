import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);

  const tabs = [
    { id: 'all', name: 'All Photos' },
    { id: 'dishes', name: 'Our Dishes' },
    { id: 'interior', name: 'Restaurant View' },
    { id: 'events', name: 'Special Moments' }
  ];

  const galleryItems = [
    {
      id: 1,
      category: 'dishes',
      title: 'Mughlai Chicken Shawarma',
      image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=800&auto=format&fit=crop',
      description: 'Slow-roasted chicken infused with creamy Mughlai spices.'
    },
    {
      id: 2,
      category: 'dishes',
      title: 'Classic Chicken Shawarma',
      image: 'https://images.unsplash.com/photo-1642686333215-de0f6990bf9b?w=800&auto=format&fit=crop',
      description: 'Traditional Lebanese recipe wrap.'
    },
    {
      id: 3,
      category: 'dishes',
      title: 'Turkish Söbiyet Baklava',
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&auto=format&fit=crop',
      description: 'Rich flaky Turkish pastry with pistachios.'
    },
    {
      id: 4,
      category: 'interior',
      title: 'Cozy Dining Space',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop',
      description: 'Warm lighting and comfortable seating for families.'
    },
    {
      id: 5,
      category: 'interior',
      title: 'Live Shawarma Grill',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop',
      description: 'Watch your shawarma roasted fresh.'
    },
    {
      id: 6,
      category: 'events',
      title: 'Birthday Celebration',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop',
      description: 'Hosting beautiful gatherings for our customers.'
    },
    {
      id: 7,
      category: 'dishes',
      title: 'Chicken Rice Bowl',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop',
      description: 'Spiced basmati rice loaded with chicken shawarma.'
    },
    {
      id: 8,
      category: 'events',
      title: 'Weekend Buffet',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop',
      description: 'Gatherings enjoying Jaffa delicacies.'
    }
  ];

  const filteredItems = activeTab === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeTab);

  return (
    <div className="bg-[#e6f4ff] min-h-screen py-12">
      <Helmet>
        <title>Gallery | Jaffa Shawarma</title>
        <meta name="description" content="View beautiful pictures of Jaffa Shawarma outlets, live kitchen, and premium platters." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Our Gallery</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            A visual journey of our authentic Shawarmas, premium outlets, and guest moments.
          </p>
          <div className="mt-4 w-24 h-1.5 bg-primary-500 mx-auto rounded-full"></div>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center space-x-2 sm:space-x-4 mb-10 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => setLightboxImage(item)}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 p-3 rounded-full text-primary-500 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>
              </div>
              <div className="p-4 flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 transition-all duration-300">
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition"
            >
              <X className="w-7 h-7" />
            </button>
            <div 
              className="max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video max-h-[70vh] bg-black">
                <img 
                  src={lightboxImage.image} 
                  alt={lightboxImage.title} 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 md:p-8 bg-white border-t">
                <span className="inline-block px-3 py-1 rounded-md text-xs font-bold bg-primary-50 text-primary-600 mb-3 uppercase tracking-wider">
                  {lightboxImage.category}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{lightboxImage.title}</h2>
                <p className="text-gray-600 text-base">{lightboxImage.description}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Gallery;
