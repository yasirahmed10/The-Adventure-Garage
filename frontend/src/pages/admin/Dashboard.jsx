import React, { useState, useEffect } from 'react';
import { 
  CalendarCheck, 
  Users, 
  Wrench, 
  CheckSquare, 
  Clock, 
  ArrowUpRight, 
  Car
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from 'recharts';
import api from '../../services/api';

const Dashboard = () => {
  const [data, setData] = useState({
    stats: {
      total_bookings: 0,
      pending_bookings: 0,
      accepted_bookings: 0,
      completed_bookings: 0,
      today_bookings: 0,
      total_users: 0,
      total_services: 0
    },
    charts: {
      bookings_last_7_days: []
    }
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const [analRes, bookRes] = await Promise.all([
          api.get('/analytics/dashboard', { headers: { 'Authorization': `Bearer ${token}` } }),
          api.get('/bookings/?limit=5', { headers: { 'Authorization': `Bearer ${token}` } })
        ]);
        setData(analRes.data);
        setRecentBookings(bookRes.data);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const StatCard = ({ title, value, icon: Icon, colorClass }) => (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-xl group-hover:bg-accent/10 transition-all" />
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-2">{title}</p>
          <h3 className="text-3xl font-black text-white">{value}</h3>
        </div>
        <div className={`p-3 bg-zinc-950 rounded-2xl border border-zinc-800 ${colorClass}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <div className="text-zinc-500 p-6 animate-pulse">Loading dashboard analytics...</div>;
  }

  const { stats, charts } = data;

  return (
    <div className="space-y-8 text-gray-300">
      <div>
        <h1 className="text-2xl font-black text-white uppercase tracking-tight">Studio Overview</h1>
        <p className="text-xs text-zinc-500 mt-1">Real-time detailing queue and booking conversion stats</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Inquiries" 
          value={stats.total_bookings} 
          icon={CalendarCheck} 
          colorClass="text-accent"
        />
        <StatCard 
          title="Active Detailing Jobs" 
          value={stats.accepted_bookings} 
          icon={Wrench} 
          colorClass="text-blue-400"
        />
        <StatCard 
          title="Pending Queue" 
          value={stats.pending_bookings} 
          icon={Clock} 
          colorClass="text-amber-400"
        />
        <StatCard 
          title="Active Services" 
          value={stats.total_services} 
          icon={CheckSquare} 
          colorClass="text-emerald-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Bookings Chart */}
        <div className="lg:col-span-3 bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Booking Flow (Last 7 Days)</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.bookings_last_7_days} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f1f1f" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 10 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 10 }} allowDecimals={false} />
                <RechartsTooltip 
                  cursor={{ fill: 'rgba(0,181,137,0.03)' }}
                  contentStyle={{ backgroundColor: '#0a1f1a', border: '1px solid #0b201b', borderRadius: '12px' }}
                />
                <Bar dataKey="bookings" fill="#00B589" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Bookings List */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-3xl flex flex-col justify-between">
          <div className="mb-6">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Recent Inquiries</h2>
          </div>
          
          <div className="space-y-4 flex-grow">
            {recentBookings.length === 0 ? (
              <p className="text-xs text-zinc-500 font-bold py-8 text-center">No recent inquiries.</p>
            ) : (
              recentBookings.map((b) => (
                <div key={b.id} className="flex justify-between items-center bg-zinc-950 p-4 border border-zinc-850 rounded-2xl">
                  <div className="space-y-1">
                    <p className="font-bold text-white text-xs">{b.name}</p>
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                      <Car className="w-3.5 h-3.5" />
                      <span>{b.vehicle_brand} {b.vehicle_model}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-extrabold border
                    ${b.status === 'accepted' ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/20' : 
                      b.status === 'completed' ? 'bg-blue-950/40 text-blue-400 border-blue-500/20' : 
                      b.status === 'rejected' ? 'bg-rose-950/40 text-rose-400 border-rose-500/20' : 
                      'bg-amber-950/40 text-amber-400 border-amber-500/20'}`}
                  >
                    {b.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
