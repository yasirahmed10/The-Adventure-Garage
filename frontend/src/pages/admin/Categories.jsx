import React from 'react';

const Categories = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Categories</h2>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
          Add Category
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3">Category Name</th>
              <th className="px-6 py-3">Slug</th>
              <th className="px-6 py-3">Item Count</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-6 py-4 font-medium text-gray-900">Shawarmas</td>
              <td className="px-6 py-4">shawarmas</td>
              <td className="px-6 py-4">12</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-6 py-4 font-medium text-gray-900">Platters</td>
              <td className="px-6 py-4">platters</td>
              <td className="px-6 py-4">8</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
