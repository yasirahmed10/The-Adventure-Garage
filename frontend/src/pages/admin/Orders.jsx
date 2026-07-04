import React from 'react';

const Orders = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Orders Management</h2>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
          Export Orders
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-6 py-4 font-medium text-gray-900">ORD-A1B2</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">₹45.99</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Preparing</span>
              </td>
              <td className="px-6 py-4">Today, 12:30 PM</td>
            </tr>
            <tr className="border-b">
              <td className="px-6 py-4 font-medium text-gray-900">ORD-C3D4</td>
              <td className="px-6 py-4">Jane Smith</td>
              <td className="px-6 py-4">₹12.50</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Delivered</span>
              </td>
              <td className="px-6 py-4">Today, 11:15 AM</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-gray-900">ORD-E5F6</td>
              <td className="px-6 py-4">Mike Johnson</td>
              <td className="px-6 py-4">₹89.00</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span>
              </td>
              <td className="px-6 py-4">Today, 10:45 AM</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
