import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import ImageInput from './ImageInput';
import { 
  FaTimes, 
  FaUserCheck, 
  FaUserPlus, 
  FaSignInAlt, 
  FaPhoneAlt, 
  FaLock, 
  FaUser, 
  FaMapMarkerAlt, 
  FaEnvelope,
  FaShieldAlt,
  FaCheck
} from 'react-icons/fa';

export default function AuthModal() {
  const { 
    authModalOpen, 
    authModalTab, 
    setAuthModalTab, 
    closeAuthModal, 
    loginUser, 
    signupUser,
    showToast 
  } = useShop();

  // Login form state
  const [loginPhoneOrEmail, setLoginPhoneOrEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupAddress, setSignupAddress] = useState('');
  const [signupAvatar, setSignupAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80');

  if (!authModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginPhoneOrEmail.trim()) {
      showToast('Please enter your mobile number or email', 'warning');
      return;
    }
    if (!loginPassword) {
      showToast('Please enter your password', 'warning');
      return;
    }

    loginUser({
      phoneOrEmail: loginPhoneOrEmail,
      password: loginPassword
    });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!signupName.trim()) {
      showToast('Please enter your full name', 'warning');
      return;
    }
    if (!signupPhone.trim() || signupPhone.trim().replace(/\D/g, '').length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'warning');
      return;
    }
    if (!signupPassword || signupPassword.length < 4) {
      showToast('Password should be at least 4 characters long', 'warning');
      return;
    }

    signupUser({
      name: signupName,
      phone: signupPhone,
      email: signupEmail,
      password: signupPassword,
      address: signupAddress,
      avatar: signupAvatar
    });
  };

  const handleFillDemoUser = () => {
    setLoginPhoneOrEmail('9785589164');
    setLoginPassword('password123');
    showToast('Demo customer credentials filled!', 'info');
  };

  const avatarPresets = [
    { label: 'Boy 1', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80' },
    { label: 'Girl 1', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
    { label: 'Boy 2', url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80' },
    { label: 'Girl 2', url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80' },
  ];

  return (
    <div 
      className="admin-modal-overlay" 
      onClick={closeAuthModal} 
      style={{ zIndex: 99999 }}
    >
      <div 
        className="admin-form-modal" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '480px', maxHeight: '92vh', overflowY: 'auto' }}
      >
        {/* Header */}
        <div className="admin-form-modal-header" style={{ padding: '18px 22px' }}>
          <div className="admin-form-modal-title">
            <div className="admin-form-modal-icon">
              {authModalTab === 'signup' ? <FaUserPlus /> : <FaSignInAlt />}
            </div>
            <div>
              <h2>{authModalTab === 'signup' ? 'Create Customer Account' : 'Customer Sign In'}</h2>
              <p>MK Fast-Food Center • Chomu</p>
            </div>
          </div>
          <button 
            type="button" 
            className="admin-form-modal-close" 
            onClick={closeAuthModal}
            title="Close"
          >
            <FaTimes />
          </button>
        </div>

        {/* Tab switchers */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '12px 22px 0', gap: '8px', background: '#0e131d' }}>
          <button
            type="button"
            onClick={() => setAuthModalTab('login')}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              border: authModalTab === 'login' ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.06)',
              background: authModalTab === 'login' ? 'rgba(249, 115, 22, 0.15)' : 'transparent',
              color: authModalTab === 'login' ? '#fff' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <FaSignInAlt /> Login
          </button>
          <button
            type="button"
            onClick={() => setAuthModalTab('signup')}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              border: authModalTab === 'signup' ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.06)',
              background: authModalTab === 'signup' ? 'rgba(249, 115, 22, 0.15)' : 'transparent',
              color: authModalTab === 'signup' ? '#fff' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <FaUserPlus /> New Sign Up
          </button>
        </div>

        {/* Body Form */}
        <div className="admin-form-modal-body" style={{ padding: '18px 22px' }}>
          {authModalTab === 'login' ? (
            <form onSubmit={handleLoginSubmit}>
              <div className="admin-form-group">
                <label className="admin-form-label">
                  <span>Mobile Number or Email <span className="required">*</span></span>
                </label>
                <div className="admin-input-wrap">
                  <span className="admin-input-prefix"><FaPhoneAlt size={12} /></span>
                  <input
                    type="text"
                    required
                    value={loginPhoneOrEmail}
                    onChange={(e) => setLoginPhoneOrEmail(e.target.value)}
                    placeholder="e.g. 9785589164 or email"
                    className="admin-input with-prefix"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">
                  <span>Password <span className="required">*</span></span>
                </label>
                <div className="admin-input-wrap">
                  <span className="admin-input-prefix"><FaLock size={12} /></span>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    className="admin-input with-prefix"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '8px 0 16px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                  Required for Checkout & Writing Reviews
                </span>
                <button
                  type="button"
                  onClick={handleFillDemoUser}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  Fill Demo Customer
                </button>
              </div>

              <button
                type="submit"
                className="admin-btn-submit"
                style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
              >
                <FaSignInAlt /> Login to Account
              </button>

              <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                New customer?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalTab('signup')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Create Account here
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit}>
              {/* Full Name */}
              <div className="admin-form-group">
                <label className="admin-form-label">
                  <span>Full Name <span className="required">*</span></span>
                </label>
                <div className="admin-input-wrap">
                  <span className="admin-input-prefix"><FaUser size={12} /></span>
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="admin-input with-prefix"
                  />
                </div>
              </div>

              {/* Phone and Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">
                    <span>Mobile Number <span className="required">*</span></span>
                  </label>
                  <div className="admin-input-wrap">
                    <span className="admin-input-prefix"><FaPhoneAlt size={12} /></span>
                    <input
                      type="tel"
                      required
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      placeholder="10-digit mobile"
                      className="admin-input with-prefix"
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">
                    <span>Email Address</span>
                  </label>
                  <div className="admin-input-wrap">
                    <span className="admin-input-prefix"><FaEnvelope size={12} /></span>
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="Optional email"
                      className="admin-input with-prefix"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="admin-form-group">
                <label className="admin-form-label">
                  <span>Create Password <span className="required">*</span></span>
                </label>
                <div className="admin-input-wrap">
                  <span className="admin-input-prefix"><FaLock size={12} /></span>
                  <input
                    type="password"
                    required
                    minLength={4}
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="At least 4 characters"
                    className="admin-input with-prefix"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="admin-form-group">
                <label className="admin-form-label">
                  <span>Local Address / Landmark in Chomu</span>
                </label>
                <div className="admin-input-wrap">
                  <span className="admin-input-prefix"><FaMapMarkerAlt size={12} /></span>
                  <input
                    type="text"
                    value={signupAddress}
                    onChange={(e) => setSignupAddress(e.target.value)}
                    placeholder="e.g. Near Nagar Palika, Subhash Chowk, Chomu"
                    className="admin-input with-prefix"
                  />
                </div>
              </div>

              {/* Profile Photo with Dual Mode (File Upload & Live URL) */}
              <ImageInput
                label="Customer Profile Photo / Avatar"
                value={signupAvatar}
                onChange={setSignupAvatar}
                presetOptions={avatarPresets}
                placeholder="https://..."
                previewAspect="square"
              />

              <button
                type="submit"
                className="admin-btn-submit"
                style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '10px' }}
              >
                <FaUserCheck /> Complete Sign Up & Continue
              </button>

              <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalTab('login')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Sign in here
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
