import React from 'react';

const Reservations = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Reservations</h2>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
          Add Reservation
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Date & Time</th>
              <th className="px-6 py-3">Guests</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-6 py-4 font-medium text-gray-900">RES-101</td>
              <td className="px-6 py-4">Alice Wonderland</td>
              <td className="px-6 py-4">Tomorrow, 7:00 PM</td>
              <td className="px-6 py-4">4</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Confirmed</span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-gray-900">RES-102</td>
              <td className="px-6 py-4">Bob Builder</td>
              <td className="px-6 py-4">Friday, 8:30 PM</td>
              <td className="px-6 py-4">2</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservations;
