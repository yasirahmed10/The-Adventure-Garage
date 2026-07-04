import React from 'react';

const Testimonials = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Testimonials</h2>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
          Add Testimonial
        </button>
      </div>

      <div className="space-y-4">
        <div className="border rounded-lg p-4 bg-gray-50 flex justify-between items-start">
          <div>
            <h3 className="font-bold text-gray-900">Sarah Williams</h3>
            <div className="text-yellow-500 text-sm my-1">★★★★★</div>
            <p className="text-gray-600 text-sm mt-2">"The best shawarma I've ever had! The ambiance is wonderful too."</p>
          </div>
          <div className="flex space-x-2 text-sm">
            <button className="text-blue-600 hover:underline">Edit</button>
            <button className="text-red-600 hover:underline">Delete</button>
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-gray-50 flex justify-between items-start">
          <div>
            <h3 className="font-bold text-gray-900">John Doe</h3>
            <div className="text-yellow-500 text-sm my-1">★★★★☆</div>
            <p className="text-gray-600 text-sm mt-2">"Great food, quick delivery. Highly recommended."</p>
          </div>
          <div className="flex space-x-2 text-sm">
            <button className="text-blue-600 hover:underline">Edit</button>
            <button className="text-red-600 hover:underline">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
