import React from 'react';
import { useShop } from '../context/ShopContext';
import { FaTag, FaCopy, FaWhatsapp, FaPercent, FaGift } from 'react-icons/fa';
import { createWhatsAppGeneralEnquiry } from '../utils/whatsapp';

export default function OffersPage() {
  const { offers, showToast } = useShop();

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    showToast(`Coupon code ${code} copied! Mention it on WhatsApp.`, 'success');
  };

  const handleClaimOffer = (offer) => {
    const text = `Hello MK Fast-Food Center! I want to claim offer: *${offer.title}* using coupon code *${offer.code}*. Please confirm the order discount for takeaway pickup in Chomu.`;
    const url = `https://wa.me/919785589164?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="section-wrapper">
      <div className="section-header-centered">
        <span className="section-subtitle-tag">SAVE MORE ON EVERY BITE</span>
        <h1 className="section-title">
          Offers & <span>Discount Deals</span>
        </h1>
        <p className="section-lead">
          Save on your favorite momos, loaded burgers, and rolls. Copy the promo code and claim it directly on our official WhatsApp ordering channel.
        </p>
      </div>

      <div className="offers-grid">
        {offers.filter(o => o.enabled !== false).map(offer => (
          <div key={offer.id} className="offer-card">
            <span className="offer-tag">
              <FaTag style={{ marginRight: '4px' }} /> {offer.tag}
            </span>
            <h2 className="offer-title">{offer.title}</h2>
            <p className="offer-desc">{offer.description}</p>

            <div className="offer-coupon-strip" style={{ marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block' }}>COUPON CODE</span>
                <span className="coupon-code">{offer.code}</span>
              </div>
              <button 
                type="button" 
                className="cart-action-link"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                onClick={() => handleCopyCode(offer.code)}
              >
                <FaCopy /> Copy
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                {offer.expiryText}
              </span>

              <button 
                type="button"
                className="btn-owner-action whatsapp"
                onClick={() => handleClaimOffer(offer)}
                style={{ fontSize: '0.8rem', padding: '6px 12px' }}
              >
                <FaWhatsapp /> Claim on WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
