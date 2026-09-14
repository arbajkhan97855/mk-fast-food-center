import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { createWhatsAppOrder } from '../utils/whatsapp';
import confetti from 'canvas-confetti';
import { 
  FaWhatsapp, 
  FaMotorcycle, 
  FaStore, 
  FaChair, 
  FaQrcode, 
  FaCheckCircle,
  FaShieldAlt,
  FaPhoneAlt,
  FaMoneyBillWave,
  FaCopy,
  FaUserCheck,
  FaUserLock,
  FaLock,
  FaSignInAlt,
  FaUserPlus
} from 'react-icons/fa';

export default function CheckoutPage() {
  const { cart, cartSubtotal, clearCart, addOrder, showToast, currentUser, openAuthModal } = useShop();
  const navigate = useNavigate();
  const location = useLocation();

  const stateData = location.state || {};
  const discountAmount = stateData.discountAmount || 0;
  const appliedCoupon = stateData.appliedCoupon || '';
  const packagingFee = stateData.packagingFee !== undefined ? stateData.packagingFee : (cart.length > 0 ? 10 : 0);
  const grandTotal = stateData.grandTotal || Math.max(0, cartSubtotal - discountAmount + packagingFee);

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [orderType, setOrderType] = useState('takeaway'); // 'takeaway', 'dinein', 'delivery'
  const [paymentMode, setPaymentMode] = useState('counter'); // 'counter', 'upi_online'
  const [upiRef, setUpiRef] = useState('');
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');

  // Prefill details from authenticated customer
  useEffect(() => {
    if (currentUser) {
      if (currentUser.name) setCustomerName(currentUser.name);
      if (currentUser.phone) setPhone(currentUser.phone);
      if (currentUser.address) setAddress(currentUser.address);
    }
  }, [currentUser]);
  
  // Placed order state
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderData, setPlacedOrderData] = useState(null);
  const [placedWhatsAppUrl, setPlacedWhatsAppUrl] = useState('');

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="section-wrapper" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>No Items to Checkout</h2>
        <p style={{ color: 'var(--text-muted)', margin: '14px 0 24px' }}>
          Please add delicious momos, burgers or rolls to your cart before proceeding.
        </p>
        <button 
          type="button" 
          className="btn-hero-order" 
          onClick={() => navigate('/menu')}
        >
          Browse Menu
        </button>
      </div>
    );
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Check if customer is logged in before allowing payment/order placement
    if (!currentUser) {
      showToast('Please Login or Sign Up first to complete your order and payment!', 'warning');
      openAuthModal('signup', (newUser) => {
        if (newUser) {
          setCustomerName(newUser.name);
          setPhone(newUser.phone);
          if (newUser.address) setAddress(newUser.address);
        }
      });
      return;
    }

    if (!customerName.trim()) {
      showToast('Please enter your full name', 'danger');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      showToast('Please provide a valid 10-digit mobile number', 'danger');
      return;
    }
    if (orderType === 'delivery' && !address.trim()) {
      showToast('Please enter delivery landmark in Chomu', 'danger');
      return;
    }

    const orderId = `MK-${Date.now().toString().slice(-6)}`;
    const paymentLabel = paymentMode === 'upi_online' 
      ? `Online UPI QR Paid (₹${grandTotal})` 
      : `Pay on Pickup at Counter (Cash / UPI)`;

    const orderPayload = {
      id: orderId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      orderType,
      paymentMethod: paymentLabel,
      upiRef: upiRef.trim(),
      address: address.trim(),
      instructions: instructions.trim(),
      items: [...cart],
      subtotal: cartSubtotal,
      discountAmount,
      packagingFee,
      total: grandTotal,
      coupon: appliedCoupon
    };

    // 1. Save order to LocalStorage via Context (visible immediately in Admin panel)
    addOrder(orderPayload);

    // 2. Generate WhatsApp deep link
    const whatsappUrl = createWhatsAppOrder(orderPayload);
    setPlacedWhatsAppUrl(whatsappUrl);
    setPlacedOrderData(orderPayload);

    // 3. Launch celebration confetti
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }

    // 4. Open WhatsApp synchronously during the click event
    try {
      window.open(whatsappUrl, '_blank');
    } catch (err) {
      console.warn('Direct popup prevented, button is available on next screen', err);
    }

    // 5. Update UI & clear cart
    setOrderPlaced(true);
    clearCart();
    showToast('Order saved! WhatsApp is ready to send.', 'success');
  };

  const handleCopyUPI = () => {
    navigator.clipboard?.writeText('9785589164@upi');
    showToast('UPI ID copied: 9785589164@upi', 'info');
  };

  if (orderPlaced && placedOrderData) {
    return (
      <div className="section-wrapper" style={{ textAlign: 'center', padding: '50px 20px', maxWidth: '640px', margin: '0 auto' }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid rgba(34, 197, 94, 0.4)',
          borderRadius: 'var(--radius-xl)',
          padding: '36px 24px',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <FaCheckCircle style={{ color: '#22c55e', fontSize: '3.8rem', marginBottom: '16px' }} />
          
          <h2 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '1.8rem', marginBottom: '6px' }}>
            Order Placed Successfully!
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
            Order ID: <strong style={{ color: 'var(--primary-light)' }}>#{placedOrderData.id}</strong> • Amount: <strong style={{ color: '#22c55e' }}>₹{placedOrderData.total}</strong>
          </p>

          {/* PROMINENT WHATSAPP SEND BUTTON */}
          <div style={{
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <p style={{ color: '#fff', fontSize: '0.92rem', marginBottom: '14px', lineHeight: '1.5' }}>
              📲 <strong>WhatsApp Par Order Send Karein:</strong><br />
              Neeche diye gaye button par click karke MK Fast-Food Center ko seedha WhatsApp message bhejein taaki preparation turant start ho sake!
            </p>

            <a 
              href={placedWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-place-order"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                width: '100%',
                padding: '16px 24px',
                fontSize: '1.1rem',
                textDecoration: 'none'
              }}
            >
              <FaWhatsapp style={{ fontSize: '1.6rem' }} /> Tap to Open WhatsApp & Send
            </a>
          </div>

          {/* ORDER SUMMARY PILL */}
          <div style={{ background: 'var(--bg-surface)', padding: '18px', borderRadius: 'var(--radius-md)', marginBottom: '20px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Customer Name:</span>
              <strong style={{ color: '#fff' }}>{placedOrderData.customerName}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Phone Number:</span>
              <strong style={{ color: '#fff' }}>{placedOrderData.phone}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Order Mode:</span>
              <span style={{ color: 'var(--secondary)', fontWeight: 700, textTransform: 'uppercase' }}>{placedOrderData.orderType}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Payment Status:</span>
              <span style={{ color: '#4ade80', fontWeight: 600 }}>{placedOrderData.paymentMethod}</span>
            </div>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px', marginTop: '10px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem', display: 'block', marginBottom: '4px' }}>
                Counter Pickup Location:
              </span>
              <strong style={{ color: '#fff', fontSize: '0.88rem' }}>
                Near Nagar Palika & New Gareeb Nawaj Hotel, Chomu (Rajasthan)
              </strong>
            </div>
          </div>

          {/* DIRECT CALL BUTTONS */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
            <a 
              href="tel:9928588415" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              <FaPhoneAlt style={{ color: 'var(--primary)' }} /> Call Mumtaj: 9928588415
            </a>
            <a 
              href="tel:9785589164" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              <FaPhoneAlt style={{ color: 'var(--primary)' }} /> Call Arbaj: 9785589164
            </a>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button 
              type="button" 
              className="btn-hero-menu" 
              onClick={() => navigate('/menu')}
              style={{ padding: '12px 24px', fontSize: '0.95rem' }}
            >
              Order More Food
            </button>
            <button 
              type="button" 
              className="btn-hero-order" 
              onClick={() => navigate('/')}
              style={{ padding: '12px 24px', fontSize: '0.95rem' }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-wrap">
      <div className="section-header-centered" style={{ textAlign: 'left', margin: '0 0 24px' }}>
        <span className="section-subtitle-tag">FINAL STEP</span>
        <h1 className="section-title">
          Confirm <span>Takeaway Details</span>
        </h1>
      </div>

      <div className="cart-layout-grid">
        {/* CHECKOUT FORM */}
        <div className="checkout-form-box">
          <h2 className="checkout-section-title">
            <FaStore style={{ color: 'var(--primary)' }} /> 1. Select Order Option
          </h2>

          <div className="order-type-grid">
            <div 
              className={`order-type-btn ${orderType === 'takeaway' ? 'active' : ''}`}
              onClick={() => setOrderType('takeaway')}
            >
              <FaMotorcycle />
              <span>Counter Takeaway</span>
              <small style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Ready in 5-10 mins</small>
            </div>

            <div 
              className={`order-type-btn ${orderType === 'dinein' ? 'active' : ''}`}
              onClick={() => setOrderType('dinein')}
            >
              <FaChair />
              <span>Chabutara Table</span>
              <small style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>2 tables / 4-6 seats</small>
            </div>

            <div 
              className={`order-type-btn ${orderType === 'delivery' ? 'active' : ''}`}
              onClick={() => setOrderType('delivery')}
            >
              <FaStore />
              <span>Delivery Enquiry</span>
              <small style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Near Chomu areas</small>
            </div>
          </div>

          <form onSubmit={handlePlaceOrder}>
            {/* Customer Authentication Requirement Banner */}
            <div style={{
              margin: '0 0 20px',
              padding: '16px',
              borderRadius: '12px',
              background: currentUser ? 'rgba(34, 197, 94, 0.08)' : 'rgba(249, 115, 22, 0.08)',
              border: currentUser ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(249, 115, 22, 0.35)',
            }}>
              {currentUser ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name} 
                      style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <strong style={{ color: '#fff', fontSize: '0.94rem' }}>{currentUser.name}</strong>
                        <span style={{ 
                          fontSize: '0.7rem', 
                          background: '#22c55e', 
                          color: '#000', 
                          padding: '2px 8px', 
                          borderRadius: '10px', 
                          fontWeight: 700 
                        }}>
                          <FaCheckCircle style={{ verticalAlign: '-1px', marginRight: '3px' }} /> Verified Customer
                        </span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        +91 {currentUser.phone} {currentUser.email && `• ${currentUser.email}`}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openAuthModal('login')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--primary-light)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Switch Account
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <FaUserLock style={{ color: 'var(--primary)', fontSize: '1.2rem' }} />
                    <strong style={{ color: '#fff', fontSize: '0.94rem' }}>
                      Login or Sign Up Required Before Payment
                    </strong>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.4 }}>
                    To ensure fast delivery and verify your phone number, please sign up or log in to your customer account before payment.
                  </p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => openAuthModal('signup', (newUser) => {
                        if (newUser) {
                          setCustomerName(newUser.name);
                          setPhone(newUser.phone);
                          if (newUser.address) setAddress(newUser.address);
                        }
                      })}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'linear-gradient(135deg, var(--primary), #ea580c)',
                        border: 'none',
                        color: '#fff',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      <FaUserPlus /> Create New Account (Sign Up)
                    </button>
                    <button
                      type="button"
                      onClick={() => openAuthModal('login', (u) => {
                        if (u) {
                          setCustomerName(u.name);
                          setPhone(u.phone);
                          if (u.address) setAddress(u.address);
                        }
                      })}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#fff',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      <FaSignInAlt /> Existing Customer Login
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="checkout-name">Your Full Name *</label>
              <input 
                id="checkout-name"
                type="text" 
                required 
                className="form-input" 
                placeholder="e.g. Vikas Sharma"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="checkout-phone">Mobile / WhatsApp Number *</label>
              <input 
                id="checkout-phone"
                type="tel" 
                required 
                className="form-input" 
                placeholder="e.g. 9828XXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {orderType === 'delivery' && (
              <div className="form-group">
                <label className="form-label" htmlFor="checkout-address">Delivery Address / Local Landmark in Chomu *</label>
                <input 
                  id="checkout-address"
                  type="text" 
                  required 
                  className="form-input" 
                  placeholder="e.g. Near Bus Stand, Chomu / Shop No. 4"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="checkout-instructions">Special Cooking / Packing Instructions</label>
              <textarea 
                id="checkout-instructions"
                className="form-textarea" 
                placeholder="e.g. Extra spicy red momo sauce, no onion in roll, pack extra napkins..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>

            {/* PAYMENT METHOD SELECTION */}
            <h2 className="checkout-section-title" style={{ marginTop: '28px' }}>
              <FaMoneyBillWave style={{ color: 'var(--primary)' }} /> 2. Payment Method
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div 
                onClick={() => setPaymentMode('counter')}
                style={{
                  background: paymentMode === 'counter' ? 'rgba(249, 115, 22, 0.15)' : 'var(--bg-surface)',
                  border: `2px solid ${paymentMode === 'counter' ? 'var(--primary)' : 'var(--border-color)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>
                  <FaStore style={{ color: 'var(--primary)' }} /> Pay on Pickup
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                  Cash or UPI scan at counter when collecting food
                </div>
              </div>

              <div 
                onClick={() => setPaymentMode('upi_online')}
                style={{
                  background: paymentMode === 'upi_online' ? 'rgba(34, 197, 94, 0.15)' : 'var(--bg-surface)',
                  border: `2px solid ${paymentMode === 'upi_online' ? '#22c55e' : 'var(--border-color)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>
                  <FaQrcode style={{ color: '#22c55e' }} /> UPI QR Code
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                  Scan Google Pay, PhonePe, Paytm QR now
                </div>
              </div>
            </div>

            {/* UPI QR ACCORDION IF SELECTED */}
            {paymentMode === 'upi_online' && (
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid rgba(34, 197, 94, 0.4)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '6px' }}>
                  Scan UPI QR to Pay ₹{grandTotal}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '14px' }}>
                  MK Fast-Food Center • Chomu, Jaipur (Mumtaj Khan / Arbaj Khan)
                </p>

                {/* QR Code display */}
                <div style={{
                  display: 'inline-block',
                  background: '#fff',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                  marginBottom: '14px'
                }}>
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`upi://pay?pa=9785589164@upi&pn=MK%20Fast%20Food&am=${grandTotal}&cu=INR`)}`}
                    alt="MK Fast-Food UPI QR Code"
                    style={{ width: '160px', height: '160px', display: 'block' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '14px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>UPI ID: <strong>9785589164@upi</strong></span>
                  <button 
                    type="button" 
                    onClick={handleCopyUPI}
                    style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '4px 10px', borderRadius: 'var(--radius-sm)', color: '#fff', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <FaCopy /> Copy
                  </button>
                </div>

                <div className="form-group" style={{ textAlign: 'left', marginTop: '12px' }}>
                  <label className="form-label" htmlFor="checkout-upi-ref">UPI UTR / Transaction ID (Optional)</label>
                  <input 
                    id="checkout-upi-ref"
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 423985XXXXXX"
                    value={upiRef}
                    onChange={(e) => setUpiRef(e.target.value)}
                  />
                </div>
              </div>
            )}

            {paymentMode === 'counter' && (
              <div className="payment-info-box">
                <FaStore style={{ fontSize: '1.4rem' }} />
                <div className="payment-info-content">
                  <h5>Pay on Pickup (Cash / UPI)</h5>
                  <p>
                    Pay at the counter when you pick up your hot takeaway food via Cash or UPI QR.
                  </p>
                </div>
              </div>
            )}

            <button 
              type="submit" 
              className="btn-whatsapp-place-order"
              style={{
                background: !currentUser 
                  ? 'linear-gradient(135deg, #ea580c, #c2410c)' 
                  : undefined
              }}
            >
              {!currentUser ? (
                <>
                  <FaLock style={{ fontSize: '1.2rem' }} /> LOGIN / SIGN UP TO PAY (₹{grandTotal})
                </>
              ) : (
                <>
                  <FaWhatsapp style={{ fontSize: '1.4rem' }} /> PLACE ORDER ON WHATSAPP (₹{grandTotal})
                </>
              )}
            </button>
          </form>
        </div>

        {/* ORDER SUMMARY */}
        <div className="cart-summary-box">
          <h3>Items Breakdown</h3>

          <div style={{ maxHeight: '280px', overflowY: 'auto', marginBottom: '16px' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.88rem' }}>
                <div>
                  <span style={{ color: '#fff', fontWeight: '700' }}>{item.quantity}×</span> {item.name}
                  {item.addons && item.addons.length > 0 && (
                    <div style={{ fontSize: '0.72rem', color: 'var(--secondary)' }}>
                      +{item.addons.map(a => a.name).join(', ')}
                    </div>
                  )}
                </div>
                <span style={{ color: '#fff', fontWeight: '700' }}>
                  ₹{(item.price + (item.addons || []).reduce((s, a) => s + a.price, 0)) * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="summary-calc-row">
            <span>Subtotal</span>
            <span style={{ color: '#fff' }}>₹{cartSubtotal}</span>
          </div>

          {discountAmount > 0 && (
            <div className="summary-calc-row highlight">
              <span>Discount</span>
              <span>-₹{discountAmount}</span>
            </div>
          )}

          <div className="summary-calc-row">
            <span>Packaging & Foil</span>
            <span style={{ color: '#fff' }}>₹{packagingFee}</span>
          </div>

          <div className="summary-total-row">
            <span>Payable Amount</span>
            <span>₹{grandTotal}</span>
          </div>

          <div style={{ marginTop: '20px', fontSize: '0.8rem', color: 'var(--text-dim)', textAlign: 'center' }}>
            <FaShieldAlt style={{ marginRight: '4px', color: '#22c55e' }} /> Verified Order via WhatsApp Direct Chat
          </div>
        </div>
      </div>
    </div>
  );
}
