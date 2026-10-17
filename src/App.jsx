
import React, { useEffect, Suspense, lazy } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import { ShopProvider } from './context/ShopContext';
import { AdminAuthProvider } from './context/AdminAuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';
import FloatingActions from './components/FloatingActions';
import Toast from './components/Toast';
import AuthModal from './components/AuthModal';
import ReviewModal from './components/ReviewModal';

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const MenuPage = lazy(() => import('./pages/MenuPage'));
const CombosPage = lazy(() => import('./pages/CombosPage'));
const OffersPage = lazy(() => import('./pages/OffersPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));

const AdminLoginPage = lazy(
  () => import('./pages/admin/AdminLoginPage')
);
const AdminDashboard = lazy(
  () => import('./pages/admin/AdminDashboard')
);

// Scroll to top on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function AppLayout() {
  const location = useLocation();
  const isAdminRoute =
    location.pathname.startsWith('/admin/dashboard');

  return (
    <div
      className="app-shell"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <ScrollToTop />
      <SEOHead />

      {!isAdminRoute && <Navbar />}

      <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <Suspense
          fallback={
            <div
              role="status"
              style={{
                minHeight: '40vh',
                display: 'grid',
                placeItems: 'center',
                padding: '24px'
              }}
            >
              Loading page...
            </div>
          }
        >
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

            <Route path="/admin" element={<AdminLoginPage />} />
            <Route
              path="/admin/dashboard"
              element={<AdminDashboard />}
            />

            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
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
