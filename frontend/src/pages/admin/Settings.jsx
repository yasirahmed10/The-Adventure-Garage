import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Settings as SettingsIcon, LayoutTemplate, Share2, Search, PaintBucket, Upload, Globe, Save } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('business');
  const [businessSettings, setBusinessSettings] = useState({
    name: '',
    tagline: '',
    address: '',
    phone: '',
    email: '',
    whatsapp: '',
    map_embed_url: '',
    logo: '',
    favicon: '',
    opening_hours: { days: 'Mon - Sat', timings: '10:00 AM - 08:00 PM' },
    social_links: { instagram: '', facebook: '', youtube: '', twitter: '' }
  });

  const [websiteSettings, setWebsiteSettings] = useState({
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    og_image: '',
    google_analytics_id: '',
    google_search_console: '',
    primary_color: '#00B589',
    secondary_color: '#0a1f1a',
    accent_hover_color: '#00936F',
    background_color: '#09090b',
    font_family: 'Outfit',
    button_radius: 'full',
    card_radius: '3xl',
    navbar_style: 'glass',
    footer_style: 'detailed',
    glassmorphism_enabled: true,
    hero_title: '',
    hero_subtitle: '',
    hero_bg_image: '',
    cta_text: 'Book Appointment',
    about_title: '',
    about_subtitle: '',
    about_desc_1: '',
    about_desc_2: '',
    about_button_text: '',
    custom_section_enabled: false,
    custom_section_title: '',
    custom_section_subtitle: '',
    custom_section_content: '',
    custom_section_image: '',
    custom_section_cta_text: '',
    custom_section_cta_link: '',
    show_about_section: true,
    show_gallery_section: true,
    show_testimonials_section: true,
    show_services_section: true,
    show_offers_section: true
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [busRes, webRes] = await Promise.all([
          api.get('/settings/business'),
          api.get('/settings/design')
        ]);
        
        // Parse JSON fields if they come as strings, or use defaults
        const busData = { ...busRes.data };
        if (typeof busData.opening_hours === 'string') {
          try { busData.opening_hours = JSON.parse(busData.opening_hours); } catch (e) {}
        }
        if (!busData.opening_hours) {
          busData.opening_hours = { days: 'Mon - Sat', timings: '10:00 AM - 08:00 PM' };
        }
        
        if (typeof busData.social_links === 'string') {
          try { busData.social_links = JSON.parse(busData.social_links); } catch (e) {}
        }
        if (!busData.social_links) {
          busData.social_links = { instagram: '', facebook: '', youtube: '', twitter: '' };
        }

        setBusinessSettings(busData);
        setWebsiteSettings(webRes.data);
      } catch (err) {
        console.error("Failed to load settings:", err);
        setErrorMsg("Failed to load current settings.");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleBusinessChange = (e) => {
    const { name, value } = e.target;
    setBusinessSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedBusinessChange = (category, field, value) => {
    setBusinessSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleWebsiteChange = (e) => {
    const { name, value, type, checked } = e.target;
    setWebsiteSettings(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleFileUpload = async (e, type, fieldName, isBusiness = false) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', type);

    try {
      const res = await api.post('/media/upload', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (isBusiness) {
        setBusinessSettings(prev => ({ ...prev, [fieldName]: res.data.file_url }));
      } else {
        setWebsiteSettings(prev => ({ ...prev, [fieldName]: res.data.file_url }));
      }
    } catch (err) {
      console.error(`Failed to upload ${fieldName}:`, err);
      setErrorMsg(`Failed to upload ${fieldName}.`);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };
      
      await Promise.all([
        api.put('/settings/business', businessSettings, { headers }),
        api.put('/settings/design', websiteSettings, { headers })
      ]);
      
      setSuccessMsg("Settings updated successfully!");
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err) {
      console.error("Failed to save settings:", err);
      setErrorMsg("Failed to save configuration settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-zinc-500 p-6 animate-pulse">Loading settings configurations...</div>;
  }

  const tabs = [
    { id: 'business', name: 'Business Profile', icon: Globe },
    { id: 'design', name: 'Design & Theme', icon: PaintBucket },
    { id: 'social', name: 'Social Links', icon: Share2 },
    { id: 'seo', name: 'SEO & Analytics', icon: Search },
    { id: 'homepage', name: 'Homepage Content', icon: LayoutTemplate },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-zinc-900 border border-zinc-800 p-6 rounded-3xl gap-4">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            <SettingsIcon className="w-6 h-6 text-accent" /> Control Center
          </h2>
          <p className="text-xs text-zinc-500 mt-1">Manage all aspects of your studio's digital presence</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-accent text-black font-black uppercase text-xs tracking-wider px-6 py-3 rounded-xl hover:bg-accent-hover transition flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      {successMsg && (
        <div className="bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 p-4 rounded-2xl text-sm font-bold flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="bg-rose-950/40 border border-rose-500/30 text-rose-400 p-4 rounded-2xl text-sm font-bold flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-rose-500" />
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 bg-zinc-900 border border-zinc-800 rounded-3xl p-3 flex flex-row lg:flex-col overflow-x-auto gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs uppercase font-bold tracking-wider transition-all whitespace-nowrap
                ${activeTab === tab.id 
                  ? 'bg-zinc-800 text-white' 
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'}`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-accent' : ''}`} />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 min-h-[500px]">
          
          {/* TAB 1: BUSINESS PROFILE */}
          {activeTab === 'business' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8 border-b border-zinc-800 pb-4">
                <h3 className="text-lg font-black text-white uppercase tracking-wider">Business Identity</h3>
                <p className="text-xs text-zinc-500 mt-1">Core details about your detailing studio</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Garage Name</label>
                  <input type="text" name="name" value={businessSettings.name} onChange={handleBusinessChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Studio Tagline</label>
                  <input type="text" name="tagline" value={businessSettings.tagline || ''} onChange={handleBusinessChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Brand Logo URL</label>
                  <div className="flex gap-2">
                    <input type="text" name="logo" value={businessSettings.logo || ''} onChange={handleBusinessChange} className="flex-grow bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" placeholder="/logo.png" />
                    <label className="cursor-pointer bg-zinc-800 px-4 rounded-xl flex items-center justify-center hover:bg-zinc-700 transition">
                      <Upload className="w-4 h-4 text-zinc-400" />
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'brand', 'logo', true)} />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Favicon URL</label>
                  <div className="flex gap-2">
                    <input type="text" name="favicon" value={businessSettings.favicon || ''} onChange={handleBusinessChange} className="flex-grow bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" placeholder="/favicon.ico" />
                    <label className="cursor-pointer bg-zinc-800 px-4 rounded-xl flex items-center justify-center hover:bg-zinc-700 transition">
                      <Upload className="w-4 h-4 text-zinc-400" />
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'brand', 'favicon', true)} />
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Phone</label>
                  <input type="text" name="phone" value={businessSettings.phone || ''} onChange={handleBusinessChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">WhatsApp</label>
                  <input type="text" name="whatsapp" value={businessSettings.whatsapp || ''} onChange={handleBusinessChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Email</label>
                  <input type="email" name="email" value={businessSettings.email || ''} onChange={handleBusinessChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                  <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Working Days</label>
                  <input type="text" value={businessSettings.opening_hours?.days || ''} onChange={(e) => handleNestedBusinessChange('opening_hours', 'days', e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" placeholder="Mon - Sat" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Working Timings</label>
                  <input type="text" value={businessSettings.opening_hours?.timings || ''} onChange={(e) => handleNestedBusinessChange('opening_hours', 'timings', e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" placeholder="10:00 AM - 08:00 PM" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Street Address</label>
                <textarea name="address" value={businessSettings.address || ''} onChange={handleBusinessChange} rows="2" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm resize-none" />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Google Maps Iframe URL</label>
                <input type="text" name="map_embed_url" value={businessSettings.map_embed_url || ''} onChange={handleBusinessChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm font-mono text-[10px]" />
              </div>
            </div>
          )}

          {/* TAB 2: DESIGN & THEME */}
          {activeTab === 'design' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8 border-b border-zinc-800 pb-4">
                <h3 className="text-lg font-black text-white uppercase tracking-wider">Theme Configuration</h3>
                <p className="text-xs text-zinc-500 mt-1">Customize the look and feel of the customer website</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Colors */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase text-zinc-400 border-b border-zinc-800 pb-2">Color Palette</h4>
                  
                  <div className="flex items-center justify-between bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                    <span className="text-xs text-zinc-300">Primary/Accent Color</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-zinc-500 font-mono uppercase">{websiteSettings.primary_color}</span>
                      <input type="color" name="primary_color" value={websiteSettings.primary_color || '#00B589'} onChange={handleWebsiteChange} className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                    <span className="text-xs text-zinc-300">Accent Hover</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-zinc-500 font-mono uppercase">{websiteSettings.accent_hover_color}</span>
                      <input type="color" name="accent_hover_color" value={websiteSettings.accent_hover_color || '#00936F'} onChange={handleWebsiteChange} className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                    <span className="text-xs text-zinc-300">Background Base</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-zinc-500 font-mono uppercase">{websiteSettings.background_color}</span>
                      <input type="color" name="background_color" value={websiteSettings.background_color || '#09090b'} onChange={handleWebsiteChange} className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                    <span className="text-xs text-zinc-300">Secondary/Surface</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-zinc-500 font-mono uppercase">{websiteSettings.secondary_color}</span>
                      <input type="color" name="secondary_color" value={websiteSettings.secondary_color || '#0a1f1a'} onChange={handleWebsiteChange} className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0" />
                    </div>
                  </div>
                </div>

                {/* Typography & Shapes */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase text-zinc-400 border-b border-zinc-800 pb-2">Typography & Style</h4>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Font Family</label>
                    <select name="font_family" value={websiteSettings.font_family || 'Outfit'} onChange={handleWebsiteChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-accent">
                      <option value="Outfit">Outfit (Modern Tech)</option>
                      <option value="Inter">Inter (Clean UI)</option>
                      <option value="Montserrat">Montserrat (Bold Geometric)</option>
                      <option value="Poppins">Poppins (Friendly Round)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Button Radius</label>
                      <select name="button_radius" value={websiteSettings.button_radius || 'full'} onChange={handleWebsiteChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-accent">
                        <option value="none">Square (0px)</option>
                        <option value="md">Slight (6px)</option>
                        <option value="xl">Rounded (12px)</option>
                        <option value="full">Pill (999px)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Card Radius</label>
                      <select name="card_radius" value={websiteSettings.card_radius || '3xl'} onChange={handleWebsiteChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-accent">
                        <option value="none">Square (0px)</option>
                        <option value="lg">Small (8px)</option>
                        <option value="xl">Medium (12px)</option>
                        <option value="2xl">Large (16px)</option>
                        <option value="3xl">Extra Large (24px)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                     <div>
                      <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Navbar Style</label>
                      <select name="navbar_style" value={websiteSettings.navbar_style || 'glass'} onChange={handleWebsiteChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-accent">
                        <option value="glass">Glassmorphism</option>
                        <option value="solid">Solid Black</option>
                        <option value="transparent">Transparent</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Footer Style</label>
                      <select name="footer_style" value={websiteSettings.footer_style || 'detailed'} onChange={handleWebsiteChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-accent">
                        <option value="detailed">Detailed (Multi-column)</option>
                        <option value="minimal">Minimal (Single column)</option>
                      </select>
                    </div>
                  </div>

                  <label className="flex items-center gap-3 p-3 bg-zinc-950 border border-zinc-800 rounded-xl cursor-pointer hover:border-zinc-700 transition">
                    <input type="checkbox" name="glassmorphism_enabled" checked={websiteSettings.glassmorphism_enabled} onChange={handleWebsiteChange} className="w-4 h-4 text-accent bg-zinc-900 border-zinc-700 rounded focus:ring-accent focus:ring-offset-zinc-950" />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white">Enable Glassmorphism</span>
                      <span className="text-[10px] text-zinc-500">Apply blur effects to panels</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SOCIAL LINKS */}
          {activeTab === 'social' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8 border-b border-zinc-800 pb-4">
                <h3 className="text-lg font-black text-white uppercase tracking-wider">Social Media</h3>
                <p className="text-xs text-zinc-500 mt-1">Connect your brand across platforms</p>
              </div>

              <div className="space-y-4 max-w-xl">
                {['instagram', 'facebook', 'youtube', 'twitter'].map((network) => (
                  <div key={network}>
                    <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">{network} URL</label>
                    <input 
                      type="url" 
                      value={businessSettings.social_links?.[network] || ''} 
                      onChange={(e) => handleNestedBusinessChange('social_links', network, e.target.value)} 
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" 
                      placeholder={`https://${network}.com/yourhandle`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SEO & ANALYTICS */}
          {activeTab === 'seo' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8 border-b border-zinc-800 pb-4">
                <h3 className="text-lg font-black text-white uppercase tracking-wider">SEO & Tracking</h3>
                <p className="text-xs text-zinc-500 mt-1">Search engine optimization and Google Analytics</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Meta Title Tag</label>
                  <input type="text" name="meta_title" value={websiteSettings.meta_title || ''} onChange={handleWebsiteChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Meta Description</label>
                  <textarea name="meta_description" value={websiteSettings.meta_description || ''} onChange={handleWebsiteChange} rows="3" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm resize-none" />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Meta Keywords (Comma separated)</label>
                  <input type="text" name="meta_keywords" value={websiteSettings.meta_keywords || ''} onChange={handleWebsiteChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Open Graph (OG) Share Image URL</label>
                  <div className="flex gap-2">
                    <input type="text" name="og_image" value={websiteSettings.og_image || ''} onChange={handleWebsiteChange} className="flex-grow bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" placeholder="/og-image.jpg" />
                    <label className="cursor-pointer bg-zinc-800 px-4 rounded-xl flex items-center justify-center hover:bg-zinc-700 transition">
                      <Upload className="w-4 h-4 text-zinc-400" />
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'seo', 'og_image', false)} />
                    </label>
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-1">Image shown when sharing the website on social media (1200x630px recommended)</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-800 mt-6">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Google Analytics ID</label>
                    <input type="text" name="google_analytics_id" value={websiteSettings.google_analytics_id || ''} onChange={handleWebsiteChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" placeholder="G-XXXXXXXXXX" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Search Console Verification</label>
                    <input type="text" name="google_search_console" value={websiteSettings.google_search_console || ''} onChange={handleWebsiteChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" placeholder="HTML tag content attribute" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: HOMEPAGE CONTENT */}
          {activeTab === 'homepage' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8 border-b border-zinc-800 pb-4">
                <h3 className="text-lg font-black text-white uppercase tracking-wider">Homepage Layout</h3>
                <p className="text-xs text-zinc-500 mt-1">Manage sections and hero content</p>
              </div>

              <div className="space-y-6">
                <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 space-y-4">
                  <h4 className="text-[10px] font-black uppercase text-accent tracking-widest border-b border-zinc-800/50 pb-2">Hero Section</h4>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Hero Headline</label>
                    <input type="text" name="hero_title" value={websiteSettings.hero_title || ''} onChange={handleWebsiteChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" placeholder="Elevate Your Ride" />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Hero Subtitle</label>
                    <input type="text" name="hero_subtitle" value={websiteSettings.hero_subtitle || ''} onChange={handleWebsiteChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" placeholder="Premium Detailing & Customization" />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Call to Action Button Text</label>
                    <input type="text" name="cta_text" value={websiteSettings.cta_text || 'Book Appointment'} onChange={handleWebsiteChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Hero Background Video/Image</label>
                    <div className="flex gap-2">
                      <input type="text" name="hero_bg_image" value={websiteSettings.hero_bg_image || ''} onChange={handleWebsiteChange} className="flex-grow bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" placeholder="/hero-bg.mp4" />
                      <label className="cursor-pointer bg-zinc-800 px-4 rounded-xl flex items-center justify-center hover:bg-zinc-700 transition">
                        <Upload className="w-4 h-4 text-zinc-400" />
                        <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'hero', 'hero_bg_image', false)} />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 space-y-4">
                  <h4 className="text-[10px] font-black uppercase text-accent tracking-widest border-b border-zinc-800/50 pb-2">About Section</h4>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">About Section Title</label>
                    <input type="text" name="about_title" value={websiteSettings.about_title || ''} onChange={handleWebsiteChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" placeholder="BUILT NOT BOUGHT. WE DEFINE CAR CULTURE." />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">About Section Subtitle</label>
                    <input type="text" name="about_subtitle" value={websiteSettings.about_subtitle || ''} onChange={handleWebsiteChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" placeholder="THE TAG HERITAGE" />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">About Paragraph 1</label>
                    <textarea name="about_desc_1" value={websiteSettings.about_desc_1 || ''} onChange={handleWebsiteChange} rows={3} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm resize-none" placeholder="First paragraph describing the garage's history..." />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">About Paragraph 2</label>
                    <textarea name="about_desc_2" value={websiteSettings.about_desc_2 || ''} onChange={handleWebsiteChange} rows={3} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm resize-none" placeholder="Second paragraph describing services/technicians..." />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">About Button Text</label>
                    <input type="text" name="about_button_text" value={websiteSettings.about_button_text || ''} onChange={handleWebsiteChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" placeholder="Read Our Full Story" />
                  </div>
                </div>

                <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800/50 pb-2">
                    <h4 className="text-[10px] font-black uppercase text-accent tracking-widest">New Custom Section</h4>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="custom_section_enabled" 
                        checked={websiteSettings.custom_section_enabled || false} 
                        onChange={(e) => setWebsiteSettings(prev => ({ ...prev, custom_section_enabled: e.target.checked }))} 
                        className="w-3.5 h-3.5 text-accent bg-zinc-950 border-zinc-700 rounded focus:ring-accent focus:ring-offset-zinc-900" 
                      />
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Enable Section</span>
                    </label>
                  </div>
                  
                  {websiteSettings.custom_section_enabled && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Section Title</label>
                        <input type="text" name="custom_section_title" value={websiteSettings.custom_section_title || ''} onChange={handleWebsiteChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" placeholder="e.g., Performance Tuning" />
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Section Subtitle</label>
                        <input type="text" name="custom_section_subtitle" value={websiteSettings.custom_section_subtitle || ''} onChange={handleWebsiteChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" placeholder="e.g., SPECIAL PERFORMANCE MODULE" />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Main Content</label>
                        <textarea name="custom_section_content" value={websiteSettings.custom_section_content || ''} onChange={handleWebsiteChange} rows={4} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm resize-none" placeholder="Enter content for the section..." />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Section Image Link</label>
                        <div className="flex gap-2">
                          <input type="text" name="custom_section_image" value={websiteSettings.custom_section_image || ''} onChange={handleWebsiteChange} className="flex-grow bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" placeholder="/images/custom.png" />
                          <label className="cursor-pointer bg-zinc-800 px-4 rounded-xl flex items-center justify-center hover:bg-zinc-700 transition">
                            <Upload className="w-4 h-4 text-zinc-400" />
                            <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'custom', 'custom_section_image', false)} />
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Button CTA Text</label>
                          <input type="text" name="custom_section_cta_text" value={websiteSettings.custom_section_cta_text || ''} onChange={handleWebsiteChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" placeholder="e.g., Learn More" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Button CTA Link</label>
                          <input type="text" name="custom_section_cta_link" value={websiteSettings.custom_section_cta_link || ''} onChange={handleWebsiteChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-accent text-sm" placeholder="e.g., /services" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800">
                  <h4 className="text-[10px] font-black uppercase text-accent tracking-widest border-b border-zinc-800/50 pb-4 mb-4">Section Visibility</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: 'show_services_section', label: 'Services Grid' },
                      { id: 'show_about_section', label: 'About Us Section' },
                      { id: 'show_gallery_section', label: 'Recent Projects (Gallery)' },
                      { id: 'show_testimonials_section', label: 'Customer Reviews' },
                      { id: 'show_offers_section', label: 'Special Offers' }
                    ].map(section => (
                      <label key={section.id} className="flex items-center gap-3 p-3 bg-zinc-900 border border-zinc-800 rounded-xl cursor-pointer hover:border-zinc-700 transition">
                        <input 
                          type="checkbox" 
                          name={section.id} 
                          checked={websiteSettings[section.id] ?? true} 
                          onChange={handleWebsiteChange} 
                          className="w-4 h-4 text-accent bg-zinc-950 border-zinc-700 rounded focus:ring-accent focus:ring-offset-zinc-900" 
                        />
                        <span className="text-sm font-bold text-white">{section.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Settings;
