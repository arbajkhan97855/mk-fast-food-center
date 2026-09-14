import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  FaPhone, 
  FaWhatsapp, 
  FaEnvelope, 
  FaMapMarkerAlt as FaLocationDot, 
  FaClock, 
  FaPaperPlane, 
  FaMapMarkerAlt 
} from 'react-icons/fa';
import { createWhatsAppGeneralEnquiry } from '../utils/whatsapp';

export default function ContactPage() {
  const { settings, addEnquiry, showToast } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    queryType: 'Takeaway Order',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      showToast('Please enter your name and phone number', 'danger');
      return;
    }

    // Save to local state/localStorage
    addEnquiry(formData);

    // Deep link to WhatsApp with structured query
    const text = `*New Customer Enquiry — MK Fast-Food Center*\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `🏷️ *Topic:* ${formData.queryType}\n` +
      `💬 *Message:* ${formData.message || 'No additional notes'}\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `Please reply with counter timings or takeaway confirmation.`;

    const whatsappUrl = `https://wa.me/919785589164?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');

    // Reset form
    setFormData({
      name: '',
      phone: '',
      queryType: 'Takeaway Order',
      message: ''
    });
  };

  return (
    <div className="section-wrapper">
      <div className="section-header-centered">
        <span className="section-subtitle-tag">GET IN TOUCH</span>
        <h1 className="section-title">
          Contact & <span>Outlet Location</span>
        </h1>
        <p className="section-lead">
          Pre-order your takeaway, check today's special items, or discuss small party snacking bundles.
        </p>
      </div>

      <div className="contact-layout-grid">
        {/* CONTACT DETAILS & MAP */}
        <div className="contact-info-card">
          <div className="contact-channel-item">
            <div className="channel-icon">
              <FaLocationDot />
            </div>
            <div className="channel-details">
              <h4>Shop Location</h4>
              <p>
                Near Nagar Palika and New Gareeb Nawaj Hotel, <br />
                Chomu, Jaipur, Rajasthan - 303702, India
              </p>
            </div>
          </div>

          <div className="contact-channel-item">
            <div className="channel-icon">
              <FaClock />
            </div>
            <div className="channel-details">
              <h4>Operating Hours</h4>
              <p>Monday to Sunday: 9:00 AM – 9:30 PM</p>
              <p style={{ color: 'var(--secondary)', fontSize: '0.8rem' }}>Piping hot fresh momos & wok dishes all day</p>
            </div>
          </div>

          <div className="contact-channel-item">
            <div className="channel-icon">
              <FaPhone />
            </div>
            <div className="channel-details">
              <h4>Phone Contacts</h4>
              <p>
                Mumtaj Khan: <a href="tel:9928588415">9928588415</a> <br />
                Arbaj Khan: <a href="tel:9785589164">9785589164</a>
              </p>
            </div>
          </div>

          <div className="contact-channel-item">
            <div className="channel-icon" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}>
              <FaWhatsapp />
            </div>
            <div className="channel-details">
              <h4>Direct WhatsApp</h4>
              <p>
                Chat with Arbaj: <a href="https://wa.me/919785589164" target="_blank" rel="noreferrer">9785589164</a>
              </p>
            </div>
          </div>

          <div className="contact-channel-item">
            <div className="channel-icon">
              <FaEnvelope />
            </div>
            <div className="channel-details">
              <h4>Official Email</h4>
              <p>
                <a href="mailto:mkfastfood@gmail.com">mkfastfood@gmail.com</a>
              </p>
            </div>
          </div>

          {/* Interactive Directions / Map Box */}
          <div className="map-embed-box">
            <iframe 
              title="MK Fast-Food Center Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14214.23869274291!2d75.7135246!3d27.1654157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396cf346ec1f7e31%3A0x1bb8996b72a420b9!2sChomu%2C%20Rajasthan%20303702!5e0!3m2!1sen!2sin!4v1694000000000!5m2!1sen!2sin"
              loading="lazy"
            />
            <div className="map-placeholder-fallback">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#fff', fontWeight: '700' }}>
                <FaMapMarkerAlt style={{ color: 'var(--primary)' }} />
                <span>Near Nagar Palika & New Gareeb Nawaj Hotel, Chomu</span>
              </div>
              <a 
                href="https://maps.google.com/?q=Nagar+Palika+Chomu+Rajasthan"
                target="_blank"
                rel="noreferrer"
                className="btn-directions"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* QUICK ENQUIRY FORM */}
        <div className="checkout-form-box">
          <h2 className="checkout-section-title">
            <FaPaperPlane style={{ color: 'var(--primary)' }} /> Send Quick Enquiry
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
            Fill out the form below. Submitting will open WhatsApp directly with our counter team to confirm your question or order.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">Your Full Name *</label>
              <input 
                id="contact-name"
                type="text" 
                required 
                className="form-input" 
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-phone">Phone / WhatsApp Number *</label>
              <input 
                id="contact-phone"
                type="tel" 
                required 
                className="form-input" 
                placeholder="e.g. 9829XXXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-query-type">Reason for Contact</label>
              <select 
                id="contact-query-type"
                className="form-select"
                value={formData.queryType}
                onChange={(e) => setFormData({ ...formData, queryType: e.target.value })}
              >
                <option value="Takeaway Order">Quick Takeaway Order</option>
                <option value="Combo Inquiry">Combo or Meal Pack Query</option>
                <option value="Party Bulk Order">Bulk Food / Birthday Party Order</option>
                <option value="Feedback">Feedback or Suggestion</option>
                <option value="General Question">General Question</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">Your Message / Order Details</label>
              <textarea 
                id="contact-message"
                className="form-textarea" 
                placeholder="Tell us what you'd like to order, quantity, or any custom spice preferences..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button 
              type="submit" 
              className="btn-whatsapp-place-order"
              style={{ marginTop: '10px' }}
            >
              <FaWhatsapp style={{ fontSize: '1.3rem' }} /> SEND VIA WHATSAPP (9785589164)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
