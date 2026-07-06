import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Users as UsersIcon, Search, Shield, UserCheck, UserX, ChevronDown } from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/users/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      await api.put(`/users/${userId}/status?is_active=${!currentStatus}`, null, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchUsers();
    } catch (err) {
      console.error("Failed to update user status:", err);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone && user.phone.includes(searchTerm));
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && user.is_active) || 
      (statusFilter === 'inactive' && !user.is_active);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalUsers = users.length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const activeCount = users.filter(u => u.is_active).length;
  const inactiveCount = users.filter(u => !u.is_active).length;

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', month: 'short', day: 'numeric' 
    });
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return <div className="text-zinc-500 p-6 animate-pulse">Loading user directory...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: totalUsers, icon: UsersIcon, color: 'text-accent' },
          { label: 'Admins', value: adminCount, icon: Shield, color: 'text-violet-400' },
          { label: 'Active', value: activeCount, icon: UserCheck, color: 'text-emerald-400' },
          { label: 'Inactive', value: inactiveCount, icon: UserX, color: 'text-rose-400' },
        ].map(stat => (
          <div key={stat.label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-full blur-xl" />
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-1">{stat.label}</p>
                <h3 className="text-2xl font-black text-white">{stat.value}</h3>
              </div>
              <div className={`p-2.5 bg-zinc-950 rounded-xl border border-zinc-800 ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Panel */}
      <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 text-gray-300">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">User Directory</h2>
            <p className="text-xs text-zinc-500 mt-1">Manage registered users, roles, and access control</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="flex-grow relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-accent placeholder:text-zinc-600"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="appearance-none bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 pr-9 text-xs font-bold uppercase tracking-wider text-zinc-400 focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 pr-9 text-xs font-bold uppercase tracking-wider text-zinc-400 focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto rounded-2xl border border-zinc-800">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-zinc-950 border-b border-zinc-800">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500">User</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Contact</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Role</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Joined</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-zinc-500 font-bold text-sm">
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-zinc-950/50 transition-colors group">
                    {/* User Avatar & Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-zinc-700" />
                        ) : (
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black border border-zinc-700
                            ${user.role === 'admin' ? 'bg-violet-500/10 text-violet-400' : 'bg-accent/10 text-accent'}`}>
                            {getInitials(user.name)}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-white text-sm group-hover:text-accent transition-colors">{user.name}</p>
                          <p className="text-[10px] text-zinc-500">ID: #{user.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4">
                      <p className="text-zinc-300 text-xs">{user.email}</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">{user.phone || 'No phone'}</p>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] uppercase font-black tracking-wider border
                        ${user.role === 'admin' 
                          ? 'bg-violet-950/40 text-violet-400 border-violet-500/20' 
                          : 'bg-zinc-800/50 text-zinc-400 border-zinc-700/40'}`}>
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] uppercase font-black tracking-wider border
                        ${user.is_active 
                          ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/20' 
                          : 'bg-rose-950/40 text-rose-400 border-rose-500/20'}`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>

                    {/* Joined */}
                    <td className="px-6 py-4">
                      <span className="text-zinc-400 text-xs">{formatDate(user.created_at)}</span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleToggleStatus(user.id, user.is_active)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all
                          ${user.is_active 
                            ? 'bg-rose-500/5 text-rose-400 border-rose-500/15 hover:bg-rose-500/10' 
                            : 'bg-emerald-500/5 text-emerald-400 border-emerald-500/15 hover:bg-emerald-500/10'}`}
                      >
                        {user.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-zinc-800">
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
            Showing {filteredUsers.length} of {totalUsers} users
          </p>
        </div>
      </div>
    </div>
  );
};

export default Users;
