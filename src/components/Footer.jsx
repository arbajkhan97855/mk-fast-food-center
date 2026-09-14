import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  FaUtensils, 
  FaPhone, 
  FaWhatsapp, 
  FaEnvelope, 
  FaMapMarkerAlt as FaLocationDot, 
  FaClock, 
  FaLock, 
  FaArrowRight 
} from 'react-icons/fa';

export default function Footer() {
  const { settings } = useShop();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* BRAND COLUMN */}
        <div className="footer-brand">
          <div className="brand-logo">
            <div className="brand-icon-box">
              <FaUtensils />
            </div>
            <div className="brand-text-wrap">
              <div className="brand-title">
                MK <span>FAST-FOOD</span>
              </div>
              <div className="brand-subtitle">CENTER • CHOMU</div>
            </div>
          </div>

          <p>
            {settings.businessName} is Chomu's go-to destination for steaming hot momos, loaded crunchy burgers, fiery chowmein, and loaded rolls. Made fresh on high heat for instant roadside takeaway.
          </p>

          <div className="footer-hours-tag">
            <FaClock />
            <span>Open Everyday: {settings.openingHours || '9:00 AM – 9:30 PM'}</span>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/"><FaArrowRight style={{ fontSize: '0.7rem', marginRight: '6px' }} /> Home</Link></li>
            <li><Link to="/menu"><FaArrowRight style={{ fontSize: '0.7rem', marginRight: '6px' }} /> Food Menu</Link></li>
            <li><Link to="/combos"><FaArrowRight style={{ fontSize: '0.7rem', marginRight: '6px' }} /> Value Combos</Link></li>
            <li><Link to="/offers"><FaArrowRight style={{ fontSize: '0.7rem', marginRight: '6px' }} /> Offers & Deals</Link></li>
            <li><Link to="/gallery"><FaArrowRight style={{ fontSize: '0.7rem', marginRight: '6px' }} /> Food Gallery</Link></li>
            <li><Link to="/about"><FaArrowRight style={{ fontSize: '0.7rem', marginRight: '6px' }} /> About Us</Link></li>
            <li><Link to="/contact"><FaArrowRight style={{ fontSize: '0.7rem', marginRight: '6px' }} /> Contact Us</Link></li>
          </ul>
        </div>

        {/* POPULAR CATEGORIES */}
        <div className="footer-col">
          <h4>Menu Categories</h4>
          <ul>
            <li><Link to="/menu?cat=momos">Steamed & Fried Momos</Link></li>
            <li><Link to="/menu?cat=chinese">Desi Chinese Chowmein</Link></li>
            <li><Link to="/menu?cat=burgers">Crispy Loaded Burgers</Link></li>
            <li><Link to="/menu?cat=rolls">Tawa Kathi Rolls</Link></li>
            <li><Link to="/menu?cat=chinese">Chilli Chicken & Paneer</Link></li>
            <li><Link to="/menu?cat=fries">Peri Peri Fries</Link></li>
            <li><Link to="/menu?cat=drinks">Chilled Soft Drinks</Link></li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div className="footer-col">
          <h4>Contact Owners</h4>
          <div className="footer-contact-item">
            <FaPhone />
            <div>
              <strong>Mumtaj Khan</strong>: <a href="tel:9928588415">9928588415</a>
            </div>
          </div>
          <div className="footer-contact-item">
            <FaPhone />
            <div>
              <strong>Arbaj Khan</strong>: <a href="tel:9785589164">9785589164</a>
            </div>
          </div>
          <div className="footer-contact-item">
            <FaWhatsapp style={{ color: '#22c55e' }} />
            <div>
              <strong>WhatsApp</strong>: <a href={`https://wa.me/919785589164`} target="_blank" rel="noreferrer">9785589164</a>
            </div>
          </div>
          <div className="footer-contact-item">
            <FaEnvelope />
            <div>
              <a href="mailto:mkfastfood@gmail.com">mkfastfood@gmail.com</a>
            </div>
          </div>
        </div>

        {/* LOCATION */}
        <div className="footer-col">
          <h4>Our Location</h4>
          <div className="footer-contact-item">
            <FaLocationDot />
            <div>
              Near Nagar Palika and New Gareeb Nawaj Hotel, Chomu, Jaipur, Rajasthan - 303702, India
            </div>
          </div>
          <div style={{ marginTop: '14px' }}>
            <Link to="/contact" className="btn-directions" style={{ fontSize: '0.78rem', padding: '6px 14px' }}>
              View Map & Directions
            </Link>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom">
        <div>
          © 2026 MK FAST-FOOD CENTER. All Rights Reserved. • Fresh • Hot • Delicious
        </div>

        {/* Small professional Admin Panel link at bottom right */}
        <Link to="/admin" className="footer-admin-link" title="Manager / Admin Portal">
          <FaLock style={{ fontSize: '0.75rem' }} /> Admin Panel
        </Link>
      </div>
    </footer>
  );
}
