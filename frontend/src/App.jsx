import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import FoodDetail from './pages/FoodDetail';
import Reservation from './pages/Reservation';
import Gallery from './pages/Gallery';
import Offers from './pages/Offers';
import About from './pages/About';
import Contact from './pages/Contact';

import ScrollToTop from './components/ScrollToTop';

// Admin imports
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Orders from './pages/admin/Orders';
import Reservations from './pages/admin/Reservations';
import Foods from './pages/admin/Foods';
import Categories from './pages/admin/Categories';
import GalleryAdmin from './pages/admin/Gallery';
import Testimonials from './pages/admin/Testimonials';
import Users from './pages/admin/Users';
import Settings from './pages/admin/Settings';
import AdminLogin from './pages/admin/Login';

// Cart Provider fallback (mock context so package imports won't fail)
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { HelmetProvider } from 'react-helmet-async';

const CustomerLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-300">
      <Navbar />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Customer Routes */}
              <Route path="/" element={<CustomerLayout />}>
                <Route index element={<Home />} />
                {/* Support both old paths and clean new paths */}
                <Route path="menu" element={<Menu />} />
                <Route path="services" element={<Menu />} />
                
                <Route path="food/:slug" element={<FoodDetail />} />
                <Route path="services/:slug" element={<FoodDetail />} />
                
                <Route path="reservation" element={<Reservation />} />
                <Route path="book-appointment" element={<Reservation />} />
                
                <Route path="gallery" element={<Gallery />} />
                <Route path="offers" element={<Offers />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="orders" element={<Orders />} />
                <Route path="reservations" element={<Reservations />} />
                <Route path="bookings" element={<Reservations />} /> {/* Alias */}
                <Route path="foods" element={<Foods />} />
                <Route path="services" element={<Foods />} /> {/* Alias */}
                <Route path="categories" element={<Categories />} />
                <Route path="gallery" element={<GalleryAdmin />} />
                <Route path="testimonials" element={<Testimonials />} />
                <Route path="users" element={<Users />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
