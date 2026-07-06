import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Upload, X, Trash2, Edit, Plus, PlusCircle, CheckCircle, Info } from 'lucide-react';

const Foods = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form State
  const [form, setForm] = useState({
    name: '',
    short_description: '',
    description: '',
    price: '',
    cover_image: '',
    benefitsText: '',  // split by new lines
    faqsText: '[]',    // JSON string for raw edit, or helper
    is_active: true,
    is_featured: false,
    display_order: 0
  });

  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchServices = async () => {
    try {
      const res = await api.get('/services?active_only=false');
      setServices(res.data);
    } catch (err) {
      console.error("Failed to load services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMsg('');
    
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'services');

    try {
      const res = await api.post('/media/upload', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      setForm(prev => ({ ...prev, cover_image: res.data.file_url }));
    } catch (err) {
      console.error("Upload failed:", err);
      setErrorMsg("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      name: '',
      short_description: '',
      description: '',
      price: '',
      cover_image: '',
      benefitsText: '',
      faqsText: '[\n  {"question": "How long does it take?", "answer": "Usually 1-2 days."}\n]',
      is_active: true,
      is_featured: false,
      display_order: 0
    });
    setErrorMsg('');
    setShowModal(true);
  };

  const openEditModal = (svc) => {
    setEditingId(svc.id);
    setForm({
      name: svc.name,
      short_description: svc.short_description || '',
      description: svc.description || '',
      price: svc.price !== null ? svc.price : '',
      cover_image: svc.cover_image || '',
      benefitsText: svc.benefits ? svc.benefits.join('\n') : '',
      faqsText: svc.faqs ? JSON.stringify(svc.faqs, null, 2) : '[]',
      is_active: svc.is_active,
      is_featured: svc.is_featured,
      display_order: svc.display_order,
    });
    setErrorMsg('');
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Parse benefits
    const benefits = form.benefitsText.split('\n').map(b => b.trim()).filter(b => b.length > 0);
    
    // Parse FAQs
    let faqs = [];
    try {
      faqs = JSON.parse(form.faqsText);
    } catch (err) {
      setErrorMsg("Invalid FAQ JSON structure. Make sure it matches list of objects.");
      return;
    }

    const payload = {
      name: form.name,
      short_description: form.short_description || null,
      description: form.description || null,
      price: form.price ? parseFloat(form.price) : null,
      cover_image: form.cover_image || null,
      benefits: benefits,
      faqs: faqs,
      is_active: form.is_active,
      is_featured: form.is_featured,
      display_order: parseInt(form.display_order)
    };

    const token = localStorage.getItem('token');
    try {
      if (editingId) {
        await api.put(`/services/${editingId}`, payload, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } else {
        await api.post('/services/', payload, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }
      setShowModal(false);
      fetchServices();
    } catch (err) {
      console.error("Failed to save service:", err);
      setErrorMsg("Failed to save service package.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service? All reviews linking to it will lose their association.")) return;
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/services/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchServices();
    } catch (err) {
      console.error("Failed to delete service:", err);
    }
  };

  if (loading) {
    return <div className="text-zinc-500 p-6 animate-pulse">Loading service catalog...</div>;
  }

  return (
    <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 text-gray-300">
      <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Services Manager</h2>
          <p className="text-xs text-zinc-500 mt-1">Configure service descriptions, benefits, prices, and SEO tags</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-accent text-black font-black uppercase text-xs tracking-wider px-5 py-3 rounded-full hover:bg-accent-hover transition flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc) => (
          <div key={svc.id} className="border border-zinc-850 rounded-2xl overflow-hidden bg-zinc-950 flex flex-col justify-between group">
            <div className="relative h-44 overflow-hidden bg-zinc-900">
              {svc.cover_image ? (
                <img src={svc.cover_image} alt={svc.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">No Cover Image</div>
              )}
              {svc.is_featured && (
                <div className="absolute top-2 left-2 bg-accent text-black text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Featured
                </div>
              )}
            </div>

            <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors truncate">{svc.name}</h3>
                <p className="text-zinc-500 text-xs line-clamp-2 mt-1">{svc.short_description || "No description provided."}</p>
              </div>

              <div className="flex justify-between items-center border-t border-zinc-800 pt-4 mt-auto">
                <div>
                  <span className="text-[10px] text-zinc-500 block">Pricing Starts</span>
                  <span className="font-bold text-white text-sm">
                    {svc.price ? `₹${svc.price.toLocaleString()}` : "Get Quote"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => openEditModal(svc)}
                    className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-accent rounded-lg transition"
                    title="Edit Service"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(svc.id)}
                    className="p-2 bg-red-500/5 border border-red-500/10 text-red-500 hover:bg-red-500/15 rounded-lg transition"
                    title="Delete Service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative max-h-[95vh] overflow-y-auto">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black text-white uppercase tracking-wider mb-6">
              {editingId ? "Edit Service details" : "Create Detailing Package"}
            </h3>

            {errorMsg && (
              <div className="bg-red-950/20 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs mb-4">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase">Service Name *</label>
                  <input required type="text" name="name" value={form.name} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" placeholder="Ceramic Coating" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase">Starting Price (₹)</label>
                  <input type="number" name="price" value={form.price} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" placeholder="18000" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase">Short Description (Cards view)</label>
                <input type="text" name="short_description" value={form.short_description} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" placeholder="Ultra-hydrophobic quartz paint shield..." />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase">Full Description (Detail view)</label>
                <textarea name="description" value={form.description} onChange={handleInputChange} rows="3" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm resize-none" placeholder="Deep technical description of the process, layers, and curing times..."></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase">Benefits Checklist (One benefit per line)</label>
                <textarea name="benefitsText" value={form.benefitsText} onChange={handleInputChange} rows="3" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm resize-none font-mono" placeholder="Self-healing TPU clear film&#10;10-Year non-yellowing warranty&#10;Protects against gravel impact"></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase">FAQs JSON (Must be valid JSON array of objects)</label>
                <textarea name="faqsText" value={form.faqsText} onChange={handleInputChange} rows="3" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm resize-none font-mono" placeholder='[\n  {"question": "How long does it last?", "answer": "Up to 5 years."}\n]'></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase">Cover Image</label>
                <div className="border border-dashed border-zinc-800 rounded-xl p-4 flex flex-col items-center justify-center bg-zinc-950 relative">
                  <input type="file" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <Upload className="w-6 h-6 text-zinc-600 mb-1" />
                  <span className="text-xs text-zinc-400">{isUploading ? "Uploading..." : form.cover_image ? "Change Image" : "Upload File"}</span>
                </div>
                {form.cover_image && (
                  <p className="text-[10px] text-accent mt-2 truncate">Current path: {form.cover_image}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="is_active" name="is_active" checked={form.is_active} onChange={handleInputChange} className="text-accent focus:ring-0 rounded bg-zinc-950 border-zinc-800" />
                  <label htmlFor="is_active" className="text-xs text-zinc-400">Active (Visible on website)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="is_featured" name="is_featured" checked={form.is_featured} onChange={handleInputChange} className="text-accent focus:ring-0 rounded bg-zinc-950 border-zinc-800" />
                  <label htmlFor="is_featured" className="text-xs text-zinc-400">Feature on homepage grid</label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-zinc-800">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 border border-zinc-800 text-zinc-400 text-xs font-bold uppercase rounded-full hover:bg-white/5">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-accent text-black text-xs font-black uppercase rounded-full hover:bg-accent-hover">Save Package</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Foods;
