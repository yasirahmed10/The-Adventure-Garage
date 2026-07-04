import React from 'react';

const Gallery = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Gallery</h2>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
          Upload Image
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="relative group rounded-lg overflow-hidden border">
          <img 
            src="/images/restaurant_placeholder_1.png" 
            alt="Restaurant Interior" 
            className="w-full h-40 object-cover"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Gallery+Image'; }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="text-white px-3 py-1 border border-white rounded hover:bg-white hover:text-black">Delete</button>
          </div>
        </div>
        
        <div className="relative group rounded-lg overflow-hidden border">
          <img 
            src="/images/food_placeholder_1.png" 
            alt="Food" 
            className="w-full h-40 object-cover"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Gallery+Image'; }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="text-white px-3 py-1 border border-white rounded hover:bg-white hover:text-black">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
