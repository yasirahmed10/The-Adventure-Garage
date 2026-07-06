import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  ShieldCheck, 
  Image as ImageIcon,
  MessageSquare,
  Settings as SettingsIcon,
  Users as UsersIcon,
  LogOut,
  Menu,
  Wrench,
  Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Bookings', path: '/admin/bookings', icon: CalendarCheck },
    { name: 'Services', path: '/admin/services', icon: Wrench },
    { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
    { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
    { name: 'Users', path: '/admin/users', icon: UsersIcon },
    { name: 'Settings', path: '/admin/settings', icon: SettingsIcon },
  ];

  return (
    <div className="flex h-screen bg-black text-gray-300">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-[#090909] border-r border-white/5 hidden md:flex flex-col">
        <div className="h-20 flex items-center justify-center space-x-3 border-b border-white/5 px-6">
          <img src="/logo.png" alt="TAG Logo" className="h-10 w-10 object-contain rounded-full border border-white/20" />
          <div className="flex flex-col">
            <span className="text-sm font-black text-white tracking-widest leading-none">TAG CONTROL</span>
            <span className="text-[9px] text-accent font-bold tracking-widest mt-1">ADMIN PORTAL</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-1.5 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`${
                    isActive 
                      ? 'bg-accent/10 text-accent font-bold border-l-2 border-accent' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  } group flex items-center px-4 py-3 text-xs uppercase tracking-widest font-bold rounded-lg transition-all duration-300`}
                >
                  <Icon className={`${isActive ? 'text-accent' : 'text-gray-500 group-hover:text-gray-400'} mr-3 flex-shrink-0 h-4 w-4`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-white/5 space-y-1">
          <Link 
            to="/"
            className="flex items-center w-full px-4 py-3 text-xs uppercase tracking-widest font-bold text-gray-400 rounded-lg hover:bg-white/5 hover:text-white transition-all duration-300"
          >
            <Globe className="mr-3 flex-shrink-0 h-4 w-4" />
            View Website
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-xs uppercase tracking-widest font-bold text-red-500 rounded-lg hover:bg-red-500/5 transition-all"
          >
            <LogOut className="mr-3 flex-shrink-0 h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Drawer (Only visible when mobileOpen is true) */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 md:hidden flex">
          <div className="w-64 bg-[#090909] border-r border-white/5 flex flex-col h-full">
            <div className="h-20 flex items-center justify-center space-x-3 border-b border-white/5 px-6">
              <img src="/logo.png" alt="TAG Logo" className="h-10 w-10 object-contain rounded-full border border-white/20" />
              <div className="flex flex-col">
                <span className="text-sm font-black text-white tracking-widest leading-none">TAG CONTROL</span>
                <span className="text-[9px] text-accent font-bold tracking-widest mt-1">ADMIN PORTAL</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto py-6">
              <nav className="space-y-1.5 px-3">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`${
                        isActive 
                          ? 'bg-accent/10 text-accent font-bold border-l-2 border-accent' 
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      } group flex items-center px-4 py-3 text-xs uppercase tracking-widest font-bold rounded-lg transition-all`}
                    >
                      <Icon className={`${isActive ? 'text-accent' : 'text-gray-400'} mr-3 flex-shrink-0 h-4 w-4`} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="p-4 border-t border-white/5 space-y-1">
              <Link 
                to="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center w-full px-4 py-3 text-xs uppercase tracking-widest font-bold text-gray-400 rounded-lg hover:bg-white/5 hover:text-white transition-all"
              >
                <Globe className="mr-3 flex-shrink-0 h-4 w-4" />
                View Website
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-xs uppercase tracking-widest font-bold text-red-500 rounded-lg hover:bg-red-500/5 transition-all"
              >
                <LogOut className="mr-3 flex-shrink-0 h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-[#090909] border-b border-white/5 flex items-center justify-between px-6 z-10">
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-4 ml-auto">
            <span className="text-xs uppercase font-extrabold tracking-widest text-gray-400">TAG Administrator</span>
            <div className="h-9 w-9 rounded-full bg-accent text-black font-black flex items-center justify-center text-sm">
              T
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-black p-6 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
