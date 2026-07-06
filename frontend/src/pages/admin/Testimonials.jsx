import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Star, Check, X, Trash2, MessageSquare } from 'lucide-react';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [replyText, setReplyText] = useState('');
  const [activeReplyId, setActiveReplyId] = useState(null);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = filterStatus === 'all' ? '/testimonials/admin/all' : `/testimonials/admin/all?status=${filterStatus}`;
      const res = await api.get(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setReviews(res.data);
    } catch (err) {
      console.error("Failed to load testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [filterStatus]);

  const handleUpdateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await api.put(`/testimonials/${id}`, { status }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchReviews();
    } catch (err) {
      console.error("Failed to update testimonial status:", err);
    }
  };

  const handleSaveReply = async (id) => {
    if (!replyText.trim()) return;
    try {
      const token = localStorage.getItem('token');
      await api.put(`/testimonials/${id}`, { reply: replyText }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setActiveReplyId(null);
      setReplyText('');
      fetchReviews();
    } catch (err) {
      console.error("Failed to save reply:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/testimonials/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchReviews();
    } catch (err) {
      console.error("Failed to delete review:", err);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex text-accent">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-current' : ''}`} />
        ))}
      </div>
    );
  };

  if (loading) {
    return <div className="text-zinc-500 p-6 animate-pulse">Loading testimonials...</div>;
  }

  return (
    <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 text-gray-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-zinc-800 pb-6 gap-4">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Reviews Manager</h2>
          <p className="text-xs text-zinc-500 mt-1">Approve, reject, or reply to customer feedback on services</p>
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'approved', 'rejected'].map((s) => (
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

      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-zinc-500 text-center py-12 font-bold">No reviews found in this category.</p>
        ) : (
          reviews.map((rev) => (
            <div key={rev.id} className="border border-zinc-850 p-6 rounded-2xl bg-zinc-950 flex flex-col md:flex-row justify-between gap-6 hover:border-zinc-800 transition-colors">
              <div className="flex-grow space-y-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-white text-base">{rev.reviewer_name}</h3>
                  {renderStars(rev.rating)}
                  <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold border ml-2
                    ${rev.status === 'approved' ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/20' : 
                      rev.status === 'rejected' ? 'bg-rose-950/40 text-rose-400 border-rose-500/20' : 
                      'bg-amber-950/40 text-amber-400 border-amber-500/20'}`}
                  >
                    {rev.status}
                  </span>
                </div>
                {rev.service && (
                  <p className="text-[10px] text-accent uppercase font-black tracking-wider">Service Done: {rev.service.name}</p>
                )}
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed italic">"{rev.review}"</p>
                
                {rev.reply && (
                  <div className="bg-zinc-900 border border-zinc-850 p-3 rounded-xl mt-3 text-xs">
                    <p className="text-zinc-500 font-bold uppercase tracking-widest text-[9px]">TAG Reply:</p>
                    <p className="text-zinc-300 mt-1 leading-relaxed">{rev.reply}</p>
                  </div>
                )}

                {activeReplyId === rev.id && (
                  <div className="mt-3 flex gap-2">
                    <input 
                      type="text" 
                      value={replyText} 
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write administrative reply..."
                      className="flex-grow bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                    <button 
                      onClick={() => handleSaveReply(rev.id)}
                      className="bg-accent text-black font-black uppercase text-[10px] tracking-wider px-4 py-2.5 rounded-xl hover:bg-accent-hover transition"
                    >
                      Post
                    </button>
                    <button 
                      onClick={() => { setActiveReplyId(null); setReplyText(''); }}
                      className="border border-zinc-850 text-zinc-500 hover:text-white px-3 py-2.5 rounded-xl text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="flex md:flex-col gap-2 justify-end items-end h-fit">
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleUpdateStatus(rev.id, 'approved')}
                    className="p-2 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/10 transition"
                    title="Approve Review"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus(rev.id, 'rejected')}
                    className="p-2 bg-rose-500/5 hover:bg-rose-500/10 text-rose-400 rounded-lg border border-rose-500/10 transition"
                    title="Reject Review"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={() => { setActiveReplyId(rev.id); setReplyText(rev.reply || ''); }}
                    className="p-2 bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-white rounded-lg border border-zinc-800 transition flex items-center gap-1.5 text-xs"
                    title="Reply to Review"
                  >
                    <MessageSquare className="w-4 h-4" /> Reply
                  </button>
                  <button 
                    onClick={() => handleDelete(rev.id)}
                    className="p-2 bg-red-500/5 hover:bg-red-500/10 text-red-500 hover:bg-red-500/15 rounded-lg border border-red-500/10 transition"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Testimonials;
