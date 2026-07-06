import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Check, X, CheckCircle, AlertCircle, Eye, Trash2, Calendar, Clock, Car } from 'lucide-react';

const Reservations = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Detail Modal state
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = filterStatus === 'all' ? '/bookings/' : `/bookings/?status=${filterStatus}`;
      const res = await api.get(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to load bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [filterStatus]);

  const handleUpdateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await api.put(`/bookings/${id}`, {
        status: status,
        admin_notes: adminNotes
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setSelectedBooking(null);
      setAdminNotes('');
      fetchBookings();
    } catch (err) {
      console.error("Failed to update status:", err);
      setErrorMsg("Failed to update booking status.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking reference?")) return;
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/bookings/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchBookings();
    } catch (err) {
      console.error("Failed to delete booking:", err);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted':
        return <span className="px-2.5 py-1 bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] uppercase font-bold">Accepted</span>;
      case 'rejected':
        return <span className="px-2.5 py-1 bg-rose-950/40 text-rose-400 border border-rose-500/20 rounded-full text-[10px] uppercase font-bold">Rejected</span>;
      case 'completed':
        return <span className="px-2.5 py-1 bg-blue-950/40 text-blue-400 border border-blue-500/20 rounded-full text-[10px] uppercase font-bold">Completed</span>;
      default:
        return <span className="px-2.5 py-1 bg-amber-950/40 text-amber-400 border border-amber-500/20 rounded-full text-[10px] uppercase font-bold">Pending</span>;
    }
  };

  if (loading) {
    return <div className="text-zinc-500 p-6 animate-pulse">Loading booking queues...</div>;
  }

  return (
    <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 text-gray-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-zinc-800 pb-6 gap-4">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Studio Bookings</h2>
          <p className="text-xs text-zinc-500 mt-1">Manage, schedule, and log notes for detailing and customization inquiries</p>
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'accepted', 'completed', 'rejected'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                filterStatus === s 
                  ? 'bg-accent text-black font-black' 
                  : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-zinc-500 uppercase bg-zinc-950 border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4">Booking Ref</th>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Vehicle</th>
              <th className="px-6 py-4">Service</th>
              <th className="px-6 py-4">Slot</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-zinc-500 font-bold">
                  No bookings found in this category.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-accent">{booking.booking_number}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-white text-sm">{booking.name}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{booking.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-zinc-500" />
                      <span className="text-sm font-semibold">{booking.vehicle_brand} {booking.vehicle_model}</span>
                    </div>
                    {booking.vehicle_year && <span className="text-[10px] text-zinc-500 block pl-6">Year: {booking.vehicle_year}</span>}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{booking.required_service}</td>
                  <td className="px-6 py-4 text-xs">
                    <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-accent" />{booking.preferred_date}</div>
                    <div className="flex items-center gap-1.5 mt-1 text-zinc-500"><Clock className="w-3.5 h-3.5" />{booking.preferred_time}</div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(booking.status)}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      onClick={() => { setSelectedBooking(booking); setAdminNotes(booking.admin_notes || ''); }}
                      className="text-white hover:text-accent p-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition"
                      title="Inspect Booking"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(booking.id)}
                      className="text-red-500 hover:text-red-400 p-2 bg-red-500/5 hover:bg-red-500/10 rounded-lg transition"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => { setSelectedBooking(null); setAdminNotes(''); }}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black text-white uppercase tracking-wider mb-6">Inspect Detailing Inquiry</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b border-zinc-800 pb-6 text-sm">
              <div className="space-y-3">
                <p><strong className="text-zinc-400 uppercase text-xs">Reference:</strong> <span className="font-mono text-accent font-bold">{selectedBooking.booking_number}</span></p>
                <p><strong className="text-zinc-400 uppercase text-xs">Customer:</strong> {selectedBooking.name}</p>
                <p><strong className="text-zinc-400 uppercase text-xs">Phone:</strong> {selectedBooking.phone}</p>
                <p><strong className="text-zinc-400 uppercase text-xs">Email:</strong> {selectedBooking.email || 'N/A'}</p>
              </div>
              <div className="space-y-3">
                <p><strong className="text-zinc-400 uppercase text-xs">Vehicle:</strong> {selectedBooking.vehicle_brand} {selectedBooking.vehicle_model} ({selectedBooking.vehicle_year || 'Year N/A'})</p>
                <p><strong className="text-zinc-400 uppercase text-xs">Service:</strong> {selectedBooking.required_service}</p>
                <p><strong className="text-zinc-400 uppercase text-xs">Requested Slot:</strong> {selectedBooking.preferred_date} @ {selectedBooking.preferred_time}</p>
                <p><strong className="text-zinc-400 uppercase text-xs">Current Status:</strong> {selectedBooking.status.toUpperCase()}</p>
              </div>
            </div>

            {selectedBooking.message && (
              <div className="mb-8 border-b border-zinc-800 pb-6">
                <h4 className="text-xs uppercase tracking-widest text-zinc-400 font-bold mb-2">Message Requirements</h4>
                <p className="text-sm bg-zinc-950 p-4 rounded-xl text-gray-300 leading-relaxed">{selectedBooking.message}</p>
              </div>
            )}

            {selectedBooking.images && selectedBooking.images.length > 0 && (
              <div className="mb-8 border-b border-zinc-800 pb-6">
                <h4 className="text-xs uppercase tracking-widest text-zinc-400 font-bold mb-3">Vehicle Images ({selectedBooking.images.length})</h4>
                <div className="grid grid-cols-3 gap-4">
                  {selectedBooking.images.map((imgUrl, idx) => (
                    <a key={idx} href={imgUrl} target="_blank" rel="noopener noreferrer" className="relative aspect-square rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 block hover:border-accent transition">
                      <img src={imgUrl} alt="Vehicle attachment" className="w-full h-full object-cover" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Admin notes & Actions */}
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase">Internal Admin Notes</label>
              <textarea 
                value={adminNotes} 
                onChange={(e) => setAdminNotes(e.target.value)}
                rows="2"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm resize-none mb-6" 
                placeholder="Log internal observations, pricing quotes, or scheduling confirmations here..."
              />

              <div className="flex flex-wrap gap-3 justify-end border-t border-zinc-800 pt-6">
                <button 
                  onClick={() => handleUpdateStatus(selectedBooking.id, 'rejected')}
                  className="px-5 py-2.5 bg-red-950/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase rounded-full hover:bg-red-500/10"
                >
                  Reject Inquire
                </button>
                <button 
                  onClick={() => handleUpdateStatus(selectedBooking.id, 'accepted')}
                  className="px-5 py-2.5 bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase rounded-full hover:bg-emerald-500/10"
                >
                  Accept & Schedule
                </button>
                <button 
                  onClick={() => handleUpdateStatus(selectedBooking.id, 'completed')}
                  className="px-5 py-2.5 bg-blue-950/20 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase rounded-full hover:bg-blue-500/10"
                >
                  Mark Completed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservations;
