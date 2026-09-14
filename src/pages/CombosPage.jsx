import React from 'react';
import { useShop } from '../context/ShopContext';
import { FaUtensils, FaCheck, FaWhatsapp, FaCartPlus } from 'react-icons/fa';
import { createWhatsAppCustomOrder } from '../utils/whatsapp';
import { useNavigate } from 'react-router-dom';

export default function CombosPage() {
  const { combos, addToCart } = useShop();
  const navigate = useNavigate();

  const handleWhatsAppCombo = (combo) => {
    const details = combo.items ? combo.items.map(i => `• ${i}`).join('\n') : '';
    const url = createWhatsAppCustomOrder(combo.title, details, combo.price);
    window.open(url, '_blank');
  };

  const handleAddComboToCart = (combo) => {
    addToCart({
      id: combo.id,
      name: combo.title,
      price: combo.price,
      image: combo.image,
      isVeg: combo.isVeg,
      shortDesc: combo.description
    }, 1);
  };

  return (
    <div className="section-wrapper">
      <div className="section-header-centered">
        <span className="section-subtitle-tag">MONEY SAVER MEALS</span>
        <h1 className="section-title">
          Value <span>Combos & Packs</span>
        </h1>
        <p className="section-lead">
          Enjoy complete meals bundled with crispy sides and chilled drinks at unbeatable street prices.
        </p>
      </div>

      <div className="combos-grid">
        {combos.filter(c => c.enabled !== false).map(combo => (
          <div key={combo.id} className="combo-card">
            <span className="combo-badge-top">{combo.badge}</span>
            <img src={combo.image} alt={combo.title} className="combo-img" loading="lazy" />

            <div className="combo-body">
              <h2 className="combo-title">{combo.title}</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                {combo.description}
              </p>

              <ul className="combo-items-list">
                {combo.items.map((item, idx) => (
                  <li key={idx}>
                    <FaCheck style={{ color: 'var(--secondary)' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="combo-footer">
                <div className="combo-price-block">
                  <span className="combo-price-val">₹{combo.price}</span>
                  {combo.originalPrice && (
                    <span className="combo-old-price">₹{combo.originalPrice}</span>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    type="button" 
                    className="btn-add-cart"
                    style={{ padding: '8px 12px', fontSize: '0.8rem' }}
                    onClick={() => handleAddComboToCart(combo)}
                    title="Add to Cart"
                  >
                    <FaCartPlus /> Add
                  </button>

                  <button 
                    type="button" 
                    className="btn-owner-action whatsapp"
                    style={{ padding: '8px 12px', fontSize: '0.8rem' }}
                    onClick={() => handleWhatsAppCombo(combo)}
                    title="Order on WhatsApp"
                  >
                    <FaWhatsapp /> WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
