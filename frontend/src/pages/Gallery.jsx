import React, { useState, useEffect } from 'react';
import { X, ZoomIn, Grid } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import api from '../services/api';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [lightboxItem, setLightboxItem] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'all', name: 'All Builds' },
    { id: 'Thar', name: 'Mahindra Thar' },
    { id: 'SUV', name: 'Luxury SUVs' },
    { id: '4x4', name: 'Off-Road 4x4' },
    { id: 'PPF', name: 'Paint Protection (PPF)' },
    { id: 'Wrap', name: 'Vinyl Wraps' },
    { id: 'Ceramic', name: 'Ceramic Glass' }
  ];

  const defaultProjects = [
    {
      id: 1,
      category: 'Thar',
      title: 'Stealth Black Thar 4x4',
      file_url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop',
      description: 'Fully customized Mahindra Thar with 33-inch mud tires, steel bumpers, and dual off-road winches.'
    },
    {
      id: 2,
      category: 'Ceramic',
      title: 'Mercedes Benz E-Class Quartz',
      file_url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop',
      description: 'Showroom gloss restoration featuring dual-layer 9H nano ceramic coat.'
    },
    {
      id: 3,
      category: 'Wrap',
      title: 'Satin Dark Grey Fortuner',
      file_url: 'https://images.unsplash.com/photo-1611245785530-ab08a8a47de4?q=80&w=800&auto=format&fit=crop',
      description: 'Full stealth color change wrap utilizing premium Avery Dennison vinyl.'
    },
    {
      id: 4,
      category: 'PPF',
      title: 'Audi RS5 Gloss Armor',
      file_url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop',
      description: 'Full body self-healing paint protection film installation.'
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/gallery');
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects, loading static default list:", err);
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredItems = activeTab === 'all' 
    ? projects 
    : projects.filter(item => item.category === activeTab);

  return (
    <div className="bg-black min-h-screen py-16 text-gray-300">
      <Helmet>
        <title>Featured Custom Projects Gallery | TAG</title>
        <meta name="description" content="Explore our portfolio of completed luxury vehicle wraps, ceramic coatings, and Thar 4x4 customizations." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-extrabold uppercase text-xs tracking-widest block mb-4">STUDIO PORTFOLIO</span>
          <h1 className="text-4xl font-black text-white uppercase tracking-tight sm:text-5xl">Featured Projects</h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm text-gray-400">
            A showcase of custom vehicle builds and surface protection coatings engineered in our Bhopal workshop.
          </p>
          <div className="mt-4 w-24 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center space-x-2 sm:space-x-4 mb-12 overflow-x-auto pb-4 scrollbar-thin">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-accent text-black shadow-lg shadow-accent/25'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass-panel rounded-3xl overflow-hidden animate-pulse h-64 border-white/5"></div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="glass-panel rounded-3xl p-12 text-center border-white/5 max-w-md mx-auto">
            <h3 className="font-bold text-white mb-2 uppercase">No projects loaded</h3>
            <p className="text-gray-400 text-xs">There are no completed projects in this category currently.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => setLightboxItem(item)}
                className="group glass-panel rounded-3xl overflow-hidden border-white/5 hover:border-accent/30 transition-all duration-500 cursor-pointer flex flex-col h-full hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                  <img 
                    src={item.file_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-accent text-black p-3.5 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-accent uppercase font-bold tracking-widest block mb-2">{item.category}</span>
                    <h3 className="font-bold text-white text-base mb-1 group-hover:text-accent transition-colors">{item.title}</h3>
                    <p className="text-gray-400 text-[11px] leading-relaxed line-clamp-2">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        {lightboxItem && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 transition-all duration-300"
            onClick={() => setLightboxItem(null)}
          >
            <button 
              onClick={() => setLightboxItem(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-3 rounded-full transition z-55"
            >
              <X className="w-6 h-6" />
            </button>
            <div 
              className="max-w-4xl w-full glass-panel rounded-3xl overflow-hidden border-white/10 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-h-[60vh] bg-black flex items-center justify-center">
                <img 
                  src={lightboxItem.file_url} 
                  alt={lightboxItem.title} 
                  className="w-full max-h-[60vh] object-contain"
                />
              </div>
              <div className="p-8 bg-[#0e0e0e] border-t border-white/5">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black bg-accent/10 text-accent mb-3 uppercase tracking-widest border border-accent/20">
                  {lightboxItem.category}
                </span>
                <h2 className="text-2xl font-black text-white uppercase mb-2">{lightboxItem.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed">{lightboxItem.description}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Gallery;
