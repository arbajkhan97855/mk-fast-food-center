import React, { useState } from 'react';
import { FaWhatsapp, FaPhone, FaTimes } from 'react-icons/fa';
import { useShop } from '../context/ShopContext';
import { createWhatsAppGeneralEnquiry } from '../utils/whatsapp';

export default function FloatingActions() {
  const { settings } = useShop();
  const [showCallModal, setShowCallModal] = useState(false);

  const whatsappUrl = createWhatsAppGeneralEnquiry();

  return (
    <>
      <div className="floating-actions-wrap">
        {/* Floating Call Button */}
        <button 
          className="fab-btn fab-call"
          onClick={() => setShowCallModal(true)}
          aria-label="Call Owners"
        >
          <FaPhone />
          <span className="fab-tooltip">Call Arbaj / Mumtaj</span>
        </button>

        {/* Floating WhatsApp Button */}
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fab-btn fab-whatsapp"
          aria-label="Order on WhatsApp"
        >
          <FaWhatsapp />
          <span className="fab-tooltip">WhatsApp: {settings.whatsappNumber || '9785589164'}</span>
        </a>
      </div>

      {/* CALL MODAL DIALOG */}
      {showCallModal && (
        <div className="call-modal-overlay" onClick={() => setShowCallModal(false)}>
          <div className="call-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="call-modal-header">
              <h3>Call MK Fast-Food Center</h3>
              <button 
                className="modal-close-btn" 
                style={{ position: 'static', width: '32px', height: '32px' }}
                onClick={() => setShowCallModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>
              Speak directly with the owners for instant takeaway prep, counter inquiries or customized orders.
            </p>

            {/* Owner 1: Mumtaj Khan */}
            <div className="owner-call-card">
              <div className="owner-info">
                <h4>Mumtaj Khan</h4>
                <p>Co-Owner • 9928588415</p>
              </div>
              <a href="tel:9928588415" className="btn-owner-dial">
                <FaPhone style={{ fontSize: '0.75rem' }} /> Call Mumtaj
              </a>
            </div>

            {/* Owner 2: Arbaj Khan */}
            <div className="owner-call-card">
              <div className="owner-info">
                <h4>Arbaj Khan</h4>
                <p>Co-Owner • WhatsApp: 9785589164</p>
              </div>
              <a href="tel:9785589164" className="btn-owner-dial">
                <FaPhone style={{ fontSize: '0.75rem' }} /> Call Arbaj
              </a>
            </div>

            <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
              Open: {settings.openingHours || '9:00 AM – 9:30 PM'} • Near Nagar Palika, Chomu
            </div>
          </div>
        </div>
      )}
    </>
  );
}
