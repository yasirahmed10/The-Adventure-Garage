import React from 'react';

const Foods = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Menu Items (Foods)</h2>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
          Add Food Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
          <img 
            src="/images/food_placeholder_1.png" 
            alt="Premium Shawarma" 
            className="w-full h-48 object-cover"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Food+Image'; }}
          />
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Premium Shawarma Wrap</h3>
            <p className="text-sm text-gray-500 mb-3">Delicious premium shawarma wrap.</p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-primary-600">₹250.00</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Available</span>
            </div>
          </div>
        </div>

        {/* Add more placeholder items if needed */}
        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
            Image not found
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Chicken Platter</h3>
            <p className="text-sm text-gray-500 mb-3">Served with garlic dip and pickles.</p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-primary-600">₹450.00</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Available</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Foods;
