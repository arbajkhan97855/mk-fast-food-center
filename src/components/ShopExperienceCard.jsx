import React from 'react';
import { FaStore, FaChair, FaMotorcycle, FaClock, FaMapMarkerAlt as FaLocationDot, FaUsers } from 'react-icons/fa';
import { useShop } from '../context/ShopContext';

export default function ShopExperienceCard() {
  const { settings } = useShop();

  return (
    <div className="shop-exp-box">
      <div>
        <span className="section-subtitle-tag">LOCAL CHOMU FOOD BRAND</span>
        <h2 className="section-title">
          Compact Outlet. <span>Massive Flavors.</span>
        </h2>
        <p className="section-lead" style={{ marginBottom: '24px' }}>
          We proudly run an authentic, high-speed roadside fast-food outlet located near Nagar Palika and New Gareeb Nawaj Hotel in Chomu. Designed for rapid hygiene, intense wok fires, and fast takeaway packing.
        </p>

        <div className="shop-dimensions-card">
          <div className="dimension-row">
            <div className="dimension-label">
              <FaStore />
              <span>Inside Kitchen Prep</span>
            </div>
            <span className="dimension-val">Approx 8 ft × 6 ft (Hygienic High-Heat Kitchen)</span>
          </div>

          <div className="dimension-row">
            <div className="dimension-label">
              <FaChair />
              <span>Outside Roadside Chabutara</span>
            </div>
            <span className="dimension-val">6 ft Depth (2 Tables • 4–6 Guests Seating)</span>
          </div>

          <div className="dimension-row">
            <div className="dimension-label">
              <FaMotorcycle />
              <span>Takeaway & Counter Pickup</span>
            </div>
            <span className="dimension-val">Instant 5–10 Mins WhatsApp Pre-Ordering</span>
          </div>

          <div className="dimension-row">
            <div className="dimension-label">
              <FaUsers />
              <span>Favorite Hangout For</span>
            </div>
            <span className="dimension-val">Evening Crowd, Coaching Students, Families</span>
          </div>

          <div className="dimension-row">
            <div className="dimension-label">
              <FaLocationDot />
              <span>Physical Address</span>
            </div>
            <span className="dimension-val">Near Nagar Palika, Chomu (Jaipur)</span>
          </div>
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <div style={{
          background: 'linear-gradient(135deg, #181d29, #0f131a)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80" 
            alt="MK Fast-Food Center Chomu Roadside Outlet"
            style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--secondary)', fontWeight: '800', fontSize: '1rem', marginBottom: '2px' }}>
                <FaClock /> 9 AM – 9:30 PM
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Open 7 Days a Week</span>
            </div>

            <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4ade80', fontWeight: '800', fontSize: '1rem', marginBottom: '2px' }}>
                ⚡ 5-10 Min Pickup
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Zero Waiting on WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
