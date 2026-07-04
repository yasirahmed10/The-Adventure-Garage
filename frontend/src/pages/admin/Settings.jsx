import React from 'react';

const Settings = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Restaurant Settings</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">General Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
              <input type="text" className="w-full border rounded-md p-2 focus:ring-primary-500 focus:border-primary-500" defaultValue="Jaffa Premium Food Outlet" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
              <input type="text" className="w-full border rounded-md p-2 focus:ring-primary-500 focus:border-primary-500" defaultValue="+91 9876543210" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Business Hours</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Opening Time</label>
              <input type="time" className="w-full border rounded-md p-2 focus:ring-primary-500 focus:border-primary-500" defaultValue="10:00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Closing Time</label>
              <input type="time" className="w-full border rounded-md p-2 focus:ring-primary-500 focus:border-primary-500" defaultValue="23:00" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t flex justify-end">
          <button className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
