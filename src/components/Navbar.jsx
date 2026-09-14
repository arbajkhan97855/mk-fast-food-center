import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { createWhatsAppGeneralEnquiry } from '../utils/whatsapp';
import { 
  FaUtensils, 
  FaSearch, 
  FaHeart, 
  FaShoppingBag, 
  FaWhatsapp, 
  FaBars, 
  FaTimes, 
  FaFire, 
  FaUser,
  FaSignOutAlt,
  FaMapMarkerAlt as FaLocationDot 
} from 'react-icons/fa';

export default function Navbar() {
  const { 
    cartItemCount, 
    wishlist, 
    settings, 
    currentUser, 
    openAuthModal, 
    logoutUser 
  } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const whatsappUrl = createWhatsAppGeneralEnquiry();

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Top emergency / instant order notification ribbon */}
      <div className="top-bar-alert">
        <span>
          <FaFire /> Fresh Momos & Loaded Burgers • Roadside Counter Open in Chomu: 9:00 AM – 9:30 PM
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <FaLocationDot /> Near Nagar Palika
        </span>
      </div>

      <div className="nav-container">
        {/* BRAND LOGO */}
        <Link to="/" className="brand-logo" onClick={() => setMobileOpen(false)}>
          <div className="brand-icon-box">
            <FaUtensils />
          </div>
          <div className="brand-text-wrap">
            <div className="brand-title">
              MK <span>FAST-FOOD</span>
            </div>
            <div className="brand-subtitle">CENTER • CHOMU</div>
          </div>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/menu" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink to="/combos" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Combos
              </NavLink>
            </li>
            <li>
              <NavLink to="/offers" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Offers
              </NavLink>
            </li>
            <li>
              <NavLink to="/gallery" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* ACTIONS RIGHT */}
        <div className="nav-actions">
          {/* Quick Search */}
          <button 
            type="button" 
            className="action-btn-icon"
            onClick={() => navigate('/menu')}
            title="Search food items"
            aria-label="Search food"
          >
            <FaSearch />
          </button>

          {/* Wishlist */}
          <Link 
            to="/wishlist" 
            className="action-btn-icon"
            title="Saved Favorites"
            aria-label="Wishlist"
          >
            <FaHeart />
            {wishlist.length > 0 && (
              <span className="badge-count">{wishlist.length}</span>
            )}
          </Link>

          {/* Cart */}
          <Link 
            to="/cart" 
            className="action-btn-icon"
            title="Shopping Cart"
            aria-label="Shopping Cart"
          >
            <FaShoppingBag />
            {cartItemCount > 0 && (
              <span className="badge-count">{cartItemCount}</span>
            )}
          </Link>

          {/* Customer Auth / Profile Button */}
          {currentUser ? (
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255, 255, 255, 0.07)',
                  border: '1px solid rgba(249, 115, 22, 0.4)',
                  padding: '4px 10px 4px 6px',
                  borderRadius: '24px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: 600
                }}
                title={`Logged in as ${currentUser.name}`}
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80';
                  }}
                />
                <span style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentUser.name.split(' ')[0]}
                </span>
              </button>

              {userMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '110%',
                    right: 0,
                    width: '220px',
                    background: '#0d121c',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '12px',
                    padding: '12px',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
                    zIndex: 1000
                  }}
                >
                  <div style={{ paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '8px' }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>{currentUser.name}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>+91 {currentUser.phone}</div>
                    {currentUser.address && (
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                        📍 {currentUser.address}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      logoutUser();
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#ef4444',
                      padding: '8px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <FaSignOutAlt /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openAuthModal('login')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(249, 115, 22, 0.12)',
                border: '1px solid rgba(249, 115, 22, 0.5)',
                padding: '6px 12px',
                borderRadius: '20px',
                color: '#fff',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title="Customer Login / Sign Up"
            >
              <FaUser style={{ color: 'var(--primary)', fontSize: '0.85rem' }} /> Login
            </button>
          )}

          {/* WhatsApp Order Button */}
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-whatsapp-nav"
            title="Direct WhatsApp Order"
          >
            <FaWhatsapp style={{ fontSize: '1.15rem' }} /> Order on WhatsApp
          </a>

          {/* Hamburger toggle */}
          <button 
            type="button" 
            className="btn-hamburger" 
            onClick={() => setMobileOpen(true)}
            aria-label="Toggle menu"
          >
            <FaBars />
          </button>
        </div>
      </div>
    </header>

    {/* MOBILE DRAWER PORTAL - Mounted directly to body to avoid sticky/backdrop-filter containment */}
    {typeof document !== 'undefined' && createPortal(
      <>
        <div 
          className={`mobile-drawer-overlay ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(false)}
        />

        <aside className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
          <div className="drawer-header">
            <div className="brand-logo">
              <div className="brand-icon-box" style={{ width: '38px', height: '38px', fontSize: '1.1rem' }}>
                <FaUtensils />
              </div>
              <div className="brand-text-wrap">
                <div className="brand-title" style={{ fontSize: '1.1rem' }}>
                  MK <span>FAST-FOOD</span>
                </div>
                <div className="brand-subtitle">CENTER</div>
              </div>
            </div>
            <button 
              type="button" 
              className="drawer-close-btn"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>

          {/* Customer profile card in mobile drawer */}
          <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>{currentUser.name}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>+91 {currentUser.phone}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    logoutUser();
                  }}
                  style={{
                    background: 'rgba(239, 68, 68, 0.12)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#ef4444',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openAuthModal('login');
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, var(--primary), #ea580c)',
                  border: 'none',
                  color: '#fff',
                  padding: '10px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  cursor: 'pointer'
                }}
              >
                <FaUser /> Customer Login / Sign Up
              </button>
            )}
          </div>

          <ul className="drawer-nav-list">
            <li className="drawer-nav-item">
              <NavLink to="/" onClick={() => setMobileOpen(false)}>
                Home
              </NavLink>
            </li>
            <li className="drawer-nav-item">
              <NavLink to="/menu" onClick={() => setMobileOpen(false)}>
                Full Menu & Chinese
              </NavLink>
            </li>
            <li className="drawer-nav-item">
              <NavLink to="/combos" onClick={() => setMobileOpen(false)}>
                Value Combos (From ₹90)
              </NavLink>
            </li>
            <li className="drawer-nav-item">
              <NavLink to="/offers" onClick={() => setMobileOpen(false)}>
                Special Offers & Deals
              </NavLink>
            </li>
            <li className="drawer-nav-item">
              <NavLink to="/gallery" onClick={() => setMobileOpen(false)}>
                Food & Outlet Gallery
              </NavLink>
            </li>
            <li className="drawer-nav-item">
              <NavLink to="/wishlist" onClick={() => setMobileOpen(false)}>
                Saved Favorites ({wishlist.length})
              </NavLink>
            </li>
            <li className="drawer-nav-item">
              <NavLink to="/about" onClick={() => setMobileOpen(false)}>
                About MK Outlet
              </NavLink>
            </li>
            <li className="drawer-nav-item">
              <NavLink to="/contact" onClick={() => setMobileOpen(false)}>
                Contact & Location
              </NavLink>
            </li>
          </ul>

          <div className="drawer-footer">
            <div className="drawer-shop-badge">
              <strong>MK FAST-FOOD CENTER</strong>
              <div>Near Nagar Palika & New Gareeb Nawaj Hotel, Chomu</div>
              <div style={{ color: 'var(--secondary)', marginTop: '4px' }}>9:00 AM – 9:30 PM Everyday</div>
            </div>

            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-whatsapp-place-order"
              style={{ padding: '12px', fontSize: '0.95rem' }}
            >
              <FaWhatsapp /> WhatsApp Order: 9785589164
            </a>
          </div>
        </aside>
      </>,
      document.body
    )}
  </>
  );
}
