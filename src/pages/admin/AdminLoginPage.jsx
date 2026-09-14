import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { FaLock, FaShieldAlt, FaKey } from 'react-icons/fa';

export default function AdminLoginPage() {
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const success = login(username, password);
    if (success === true || success?.success) {
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError('Invalid username or password. ');
    }
  };

  // const handleQuickLogin = () => {
  //   setUsername('admin');
  //   setPassword('1234arbaj');
  //   const success = login('admin', '1234arbaj');
  //   if (success === true || success?.success) {
  //     navigate('/admin/dashboard', { replace: true });
  //   }
  // };

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <div className="admin-login-icon">
          <FaShieldAlt />
        </div>

        <h2>Owner Admin Portal</h2>
        <p>Manage products, pricing, orders, and shop settings for MK Fast-Food Center.</p>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#f87171', padding: '10px', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-username">Username</label>
            <input 
              id="admin-username"
              type="text" 
              required 
              className="form-input" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="admin-password">Password</label>
            <input 
              id="admin-password"
              type="password" 
              required 
              className="form-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="e.g. 1234arbaj"
            />
          </div>

          <button 
            type="submit" 
            className="btn-hero-order" 
            style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
          >
            <FaLock style={{ fontSize: '0.9rem' }} /> Log In to Dashboard
          </button>

          
        </form>

     
      </div>
    </div>
  );
}
