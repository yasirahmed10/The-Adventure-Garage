import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import FoodDetail from './pages/FoodDetail';
import Cart from './pages/Cart';
import Reservation from './pages/Reservation';
import Gallery from './pages/Gallery';
import Offers from './pages/Offers';
import About from './pages/About';
import Contact from './pages/Contact';
import OrderStatus from './pages/OrderStatus';

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

const CustomerLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="food/:slug" element={<FoodDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="reservation" element={<Reservation />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="offers" element={<Offers />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="order/:orderNumber" element={<OrderStatus />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="foods" element={<Foods />} />
          <Route path="categories" element={<Categories />} />
          <Route path="gallery" element={<GalleryAdmin />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
