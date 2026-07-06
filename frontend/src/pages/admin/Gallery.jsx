import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Upload, X, Trash2, Plus } from 'lucide-react';

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // New Item Form state
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    category: 'Thar',
    file_url: '',
    is_featured: false
  });
  
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const categories = ['Thar', 'SUV', '4x4', 'PPF', 'Wrap', 'Ceramic'];

  const fetchItems = async () => {
    try {
      const res = await api.get('/gallery?active_only=false');
      setItems(res.data);
    } catch (err) {
      console.error("Failed to fetch gallery items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMsg('');
    
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'gallery');

    try {
      const res = await api.post('/media/upload', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      setNewItem(prev => ({ ...prev, file_url: res.data.file_url }));
    } catch (err) {
      console.error("Failed to upload image:", err);
      setErrorMsg("Failed to upload image. Please check permissions and file size.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newItem.file_url) {
      setErrorMsg("Please upload an image first.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await api.post('/gallery/', newItem, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setShowAddModal(false);
      setNewItem({ title: '', description: '', category: 'Thar', file_url: '', is_featured: false });
      fetchItems();
    } catch (err) {
      console.error("Failed to save gallery item:", err);
      setErrorMsg("Failed to save gallery project.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/gallery/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchItems();
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  if (loading) {
    return <div className="text-zinc-500 p-6 animate-pulse">Loading gallery manager...</div>;
  }

  return (
    <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 text-gray-300">
      <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Gallery Manager</h2>
          <p className="text-xs text-zinc-500 mt-1">Manage project catalog items displayed in customer portfolios</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-accent text-black font-black uppercase text-xs tracking-wider px-5 py-3 rounded-full hover:bg-accent-hover transition flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="relative group rounded-2xl overflow-hidden border border-zinc-850 bg-zinc-950 flex flex-col">
            <div className="h-44 overflow-hidden relative">
              <img 
                src={item.file_url} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[10px] uppercase font-bold text-accent">
                {item.category}
              </div>
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-white text-sm line-clamp-1">{item.title || "Untitled Project"}</h4>
                <p className="text-[11px] text-zinc-500 line-clamp-2 mt-1">{item.description || "No description provided."}</p>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-zinc-800">
                <span className="text-[10px] text-zinc-600">
                  {item.is_featured ? "⭐ Featured" : "Standard"}
                </span>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-400 p-1 bg-red-500/5 hover:bg-red-500/10 rounded-lg transition"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-lg w-full p-8 shadow-2xl relative">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black text-white uppercase tracking-wider mb-6">Add New Project</h3>
            
            {errorMsg && (
              <div className="bg-red-950/20 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs mb-4">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase">Project Title</label>
                <input required type="text" name="title" value={newItem.title} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" placeholder="Satin Black Defender" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase">Category</label>
                <select name="category" value={newItem.category} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase">Project Description</label>
                <textarea name="description" value={newItem.description} onChange={handleInputChange} rows="2" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm resize-none" placeholder="Fully customized with Lift kits, wheels..."></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase">Upload Image</label>
                <div className="border border-dashed border-zinc-800 rounded-xl p-4 flex flex-col items-center justify-center bg-zinc-950 relative">
                  <input type="file" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <Upload className="w-6 h-6 text-zinc-600 mb-1" />
                  <span className="text-xs text-zinc-400">{isUploading ? "Uploading..." : newItem.file_url ? "Change Image" : "Upload File"}</span>
                </div>
                {newItem.file_url && (
                  <p className="text-[10px] text-accent mt-2 truncate">File uploaded: {newItem.file_url}</p>
                )}
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input type="checkbox" id="is_featured" name="is_featured" checked={newItem.is_featured} onChange={handleInputChange} className="text-accent focus:ring-0 rounded bg-zinc-950 border-zinc-800" />
                <label htmlFor="is_featured" className="text-xs text-zinc-400">Feature this project on homepage</label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-5 py-2.5 border border-zinc-800 text-zinc-400 text-xs font-bold uppercase rounded-full hover:bg-white/5">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-accent text-black text-xs font-black uppercase rounded-full hover:bg-accent-hover">Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
