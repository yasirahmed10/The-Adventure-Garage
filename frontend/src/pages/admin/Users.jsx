import React from 'react';

const Users = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">User Management</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Joined</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-6 py-4 font-medium text-gray-900">Admin User</td>
              <td className="px-6 py-4">admin@jaffa.com</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">Admin</span>
              </td>
              <td className="px-6 py-4">Jan 01, 2026</td>
              <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer">Edit</td>
            </tr>
            <tr className="border-b">
              <td className="px-6 py-4 font-medium text-gray-900">John Doe</td>
              <td className="px-6 py-4">john@example.com</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Customer</span>
              </td>
              <td className="px-6 py-4">Mar 15, 2026</td>
              <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer">Edit</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
