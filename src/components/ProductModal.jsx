import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import VegBadge from './VegBadge';
import { PRODUCT_ADDONS } from '../data/initialData';
import { createWhatsAppProductEnquiry } from '../utils/whatsapp';
import { FaTimes, FaStar, FaHeart, FaRegHeart, FaCartPlus, FaBolt, FaWhatsapp, FaPlus, FaMinus, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function ProductModal({ product, onClose }) {
  const { addToCart, isInWishlist, toggleWishlist } = useShop();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  const toggleAddon = (addon) => {
    setSelectedAddons(prev => {
      const exists = prev.some(a => a.id === addon.id);
      if (exists) {
        return prev.filter(a => a.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = product.price + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedAddons);
    onClose();
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedAddons);
    onClose();
    navigate('/checkout');
  };

  const handleWhatsAppEnquiry = () => {
    const url = createWhatsAppProductEnquiry(product.name);
    window.open(url, '_blank');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes />
        </button>

        <div className="modal-img-wrap">
          <img 
            src={product.image} 
            alt={product.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80";
            }}
          />
        </div>

        <div className="modal-content-wrap">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <VegBadge isVeg={product.isVeg} showLabel={true} />
            <button 
              className="action-btn-icon"
              style={{ width: '36px', height: '36px' }}
              onClick={() => toggleWishlist(product.id)}
              title={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isFavorited ? <FaHeart style={{ color: '#ef4444' }} /> : <FaRegHeart />}
            </button>
          </div>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: '#fff', marginBottom: '6px' }}>
            {product.name}
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#facc15', fontWeight: '700' }}>
              <FaStar />
              <span>{product.rating || '4.8'}</span>
              <span style={{ color: 'var(--text-dim)' }}>({product.reviewsCount || 100}+ reviews)</span>
            </div>
            {product.prepTime && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                <FaClock style={{ color: 'var(--primary)' }} />
                <span>{product.prepTime}</span>
              </div>
            )}
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '16px' }}>
            {product.description || product.shortDesc}
          </p>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '18px' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: '800', color: '#fff' }}>
              ₹{totalPrice}
            </span>
            {product.oldPrice && (
              <span style={{ fontSize: '1rem', color: 'var(--text-dim)', textDecoration: 'line-through' }}>
                ₹{product.oldPrice * quantity}
              </span>
            )}
            {addonsTotal > 0 && (
              <span style={{ fontSize: '0.78rem', color: 'var(--secondary)' }}>
                (Includes +₹{addonsTotal} add-ons)
              </span>
            )}
          </div>

          {/* Optional Addons */}
          <div className="modal-addons-section">
            <h4>
              <span>Custom Add-ons & Spices</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: '400' }}>Optional</span>
            </h4>
            {PRODUCT_ADDONS.map(addon => {
              const isChecked = selectedAddons.some(a => a.id === addon.id);
              return (
                <div 
                  key={addon.id} 
                  className="addon-row"
                  onClick={() => toggleAddon(addon)}
                >
                  <div className="addon-left">
                    <input 
                      type="checkbox" 
                      checked={isChecked}
                      onChange={() => {}}
                      style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
                    />
                    <span>{addon.name}</span>
                  </div>
                  <span className="addon-price">
                    {addon.price > 0 ? `+₹${addon.price}` : 'FREE'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quantity & CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>Quantity:</span>
            <div className="qty-stepper">
              <button 
                type="button" 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                <FaMinus style={{ fontSize: '0.8rem' }} />
              </button>
              <span>{quantity}</span>
              <button 
                type="button" 
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                <FaPlus style={{ fontSize: '0.8rem' }} />
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
            <button 
              type="button" 
              className="btn-add-cart" 
              style={{ padding: '12px' }}
              onClick={handleAddToCart}
            >
              <FaCartPlus /> Add to Cart (₹{totalPrice})
            </button>
            <button 
              type="button" 
              className="btn-buy-now"
              style={{ padding: '12px' }}
              onClick={handleBuyNow}
            >
              <FaBolt /> Buy Now
            </button>
          </div>

          <button 
            type="button"
            className="btn-owner-action whatsapp"
            style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
            onClick={handleWhatsAppEnquiry}
          >
            <FaWhatsapp style={{ fontSize: '1.1rem' }} /> Ask About This Item on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
