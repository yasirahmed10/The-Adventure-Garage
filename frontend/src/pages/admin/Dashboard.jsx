import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  CalendarCheck,
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_orders: 1248,
    today_orders: 42,
    monthly_revenue: 12450.50,
    total_revenue: 145000.00,
    today_reservations: 12,
    total_users: 856
  });

  const [loading, setLoading] = useState(false);

  const revenueData = [
    { name: 'Mon', revenue: 1200 },
    { name: 'Tue', revenue: 900 },
    { name: 'Wed', revenue: 1500 },
    { name: 'Thu', revenue: 1100 },
    { name: 'Fri', revenue: 2400 },
    { name: 'Sat', revenue: 3200 },
    { name: 'Sun', revenue: 2800 },
  ];

  const StatCard = ({ title, value, icon: Icon, trend, trendUp }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className="p-3 bg-primary-50 rounded-lg">
          <Icon className="w-6 h-6 text-primary-500" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        {trendUp ? (
          <span className="text-green-500 flex items-center font-medium">
            <ArrowUpRight className="w-4 h-4 mr-1" /> {trend}
          </span>
        ) : (
          <span className="text-red-500 flex items-center font-medium">
            <ArrowDownRight className="w-4 h-4 mr-1" /> {trend}
          </span>
        )}
        <span className="text-gray-400 ml-2">vs last week</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back, Admin.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue (Month)" 
          value={`₹${stats.monthly_revenue.toLocaleString()}`} 
          icon={IndianRupee} 
          trend="12.5%" 
          trendUp={true} 
        />
        <StatCard 
          title="Orders Today" 
          value={stats.today_orders} 
          icon={ShoppingBag} 
          trend="5.2%" 
          trendUp={true} 
        />
        <StatCard 
          title="Reservations Today" 
          value={stats.today_reservations} 
          icon={CalendarCheck} 
          trend="2.1%" 
          trendUp={false} 
        />
        <StatCard 
          title="Total Customers" 
          value={stats.total_users} 
          icon={Users} 
          trend="8.4%" 
          trendUp={true} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Revenue Overview (Last 7 Days)</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} tickFormatter={(value) => `₹${value}`} />
                <RechartsTooltip 
                  cursor={{ fill: '#fff7ed' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="revenue" fill="#F97316" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
            <button className="text-primary-600 text-sm font-medium hover:text-primary-700">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3 rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'ORD-A1B2', customer: 'John Doe', amount: 45.99, status: 'Preparing' },
                  { id: 'ORD-C3D4', customer: 'Jane Smith', amount: 12.50, status: 'Delivered' },
                  { id: 'ORD-E5F6', customer: 'Mike Johnson', amount: 89.00, status: 'Pending' },
                  { id: 'ORD-G7H8', customer: 'Sarah Williams', amount: 34.20, status: 'Out for Delivery' },
                  { id: 'ORD-I9J0', customer: 'Robert Brown', amount: 22.99, status: 'Delivered' },
                ].map((order, idx) => (
                  <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-4 font-medium text-gray-900">{order.id}</td>
                    <td className="px-4 py-4">{order.customer}</td>
                    <td className="px-4 py-4 font-medium">₹{order.amount.toFixed(2)}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                          order.status === 'Preparing' ? 'bg-blue-100 text-blue-700' : 
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-purple-100 text-purple-700'}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
