import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import Toast from './components/Toast';
import AuthModal from './components/AuthModal';
import ReviewModal from './components/ReviewModal';

// Pages
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CombosPage from './pages/CombosPage';
import OffersPage from './pages/OffersPage';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';

// Helper component to scroll window to top on page transition
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

// Layout wrapper that hides customer Navbar, Footer, and Floating buttons on Admin Dashboard
function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin/dashboard');

  return (
    <div className="app-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}

      <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/combos" element={<CombosPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <FloatingActions />}
      <AuthModal />
      <ReviewModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <ShopProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </ShopProvider>
    </AdminAuthProvider>
  );
}
