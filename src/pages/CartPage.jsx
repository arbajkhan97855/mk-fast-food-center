import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowRight, FaTag, FaCheck } from 'react-icons/fa';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartSubtotal, showToast } = useShop();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'MKNEW10' || code === 'CHICKEN15' || code === 'STUDENT90') {
      const discount = code === 'CHICKEN15' ? 15 : 10;
      setDiscountPercent(discount);
      setAppliedCoupon(code);
      showToast(`Coupon ${code} applied successfully! (${discount}% OFF)`, 'success');
    } else {
      showToast('Invalid coupon code. Try MKNEW10 or CHICKEN15', 'danger');
    }
  };

  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const packagingFee = cart.length > 0 ? 10 : 0;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + packagingFee);

  if (cart.length === 0) {
    return (
      <div className="section-wrapper" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <div className="empty-state-box">
          <div className="empty-state-icon">
            <FaShoppingBag />
          </div>
          <h2>Your Cart is Empty</h2>
          <p>
            You haven't added any of our delicious momos, burgers, or chowmein yet. Browse our menu and satisfy your cravings!
          </p>
          <Link to="/menu" className="btn-hero-order" style={{ display: 'inline-flex', marginTop: '14px' }}>
            Browse Menu & Order
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-wrap">
      <div className="section-header-centered" style={{ textAlign: 'left', margin: '0 0 24px' }}>
        <span className="section-subtitle-tag">YOUR SELECTION</span>
        <h1 className="section-title">
          Review Your <span>Takeaway Order</span>
        </h1>
      </div>

      <div className="cart-layout-grid">
        {/* ITEMS LIST */}
        <div className="cart-items-card">
          <div className="cart-header-row">
            <h2>Order Items ({cart.length})</h2>
            <Link to="/menu" style={{ color: 'var(--primary)', fontSize: '0.88rem', fontWeight: '700' }}>
              + Add More Items
            </Link>
          </div>

          {cart.map(item => {
            const addonsSum = (item.addons || []).reduce((s, a) => s + a.price, 0);
            const itemUnitPrice = item.price + addonsSum;
            const rowTotal = itemUnitPrice * item.quantity;

            return (
              <div key={item.id} className="cart-item-row">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="cart-item-thumb"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&auto=format&fit=crop&q=80";
                  }}
                />

                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  {item.addons && item.addons.length > 0 && (
                    <span className="cart-item-addons-tag">
                      Add-ons: {item.addons.map(a => a.name).join(', ')} (+₹{addonsSum})
                    </span>
                  )}
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    ₹{itemUnitPrice} each
                  </span>
                </div>

                {/* Quantity Controls */}
                <div className="qty-stepper" style={{ transform: 'scale(0.95)' }}>
                  <button 
                    type="button" 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease item quantity"
                  >
                    <FaMinus style={{ fontSize: '0.75rem' }} />
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    type="button" 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase item quantity"
                  >
                    <FaPlus style={{ fontSize: '0.75rem' }} />
                  </button>
                </div>

                <div className="cart-item-price">
                  ₹{rowTotal}
                </div>

                <button 
                  type="button" 
                  className="cart-item-delete"
                  onClick={() => removeFromCart(item.id)}
                  title="Remove item"
                  aria-label="Remove item"
                >
                  <FaTrash />
                </button>
              </div>
            );
          })}
        </div>

        {/* SUMMARY SIDEBAR */}
        <div className="cart-summary-box">
          <h3>Order Summary</h3>

          <div className="summary-calc-row">
            <span>Item Subtotal</span>
            <span style={{ color: '#fff', fontWeight: '700' }}>₹{cartSubtotal}</span>
          </div>

          {discountAmount > 0 && (
            <div className="summary-calc-row highlight">
              <span>Promo Discount ({discountPercent}%)</span>
              <span>-₹{discountAmount}</span>
            </div>
          )}

          <div className="summary-calc-row">
            <span>Takeaway Packaging & Foil</span>
            <span style={{ color: '#fff' }}>₹{packagingFee}</span>
          </div>

          {/* Coupon Code Input */}
          <form onSubmit={handleApplyCoupon} style={{ margin: '20px 0', display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              placeholder="Coupon (e.g. MKNEW10)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="form-input"
              style={{ textTransform: 'uppercase', padding: '8px 12px', fontSize: '0.85rem' }}
            />
            <button 
              type="submit" 
              className="btn-add-cart"
              style={{ padding: '8px 14px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
            >
              Apply
            </button>
          </form>

          {appliedCoupon && (
            <div style={{ fontSize: '0.78rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '14px' }}>
              <FaCheck /> Coupon <strong>{appliedCoupon}</strong> active!
            </div>
          )}

          <div className="summary-total-row">
            <span>Grand Total</span>
            <span>₹{grandTotal}</span>
          </div>

          <button 
            type="button" 
            className="btn-checkout-cta"
            onClick={() => navigate('/checkout', { state: { discountAmount, appliedCoupon, packagingFee, grandTotal } })}
          >
            Proceed to Checkout <FaArrowRight />
          </button>

          <Link to="/menu" className="btn-continue-shopping">
            Continue Ordering Food
          </Link>
        </div>
      </div>
    </div>
  );
}
