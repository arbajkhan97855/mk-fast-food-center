import React from 'react';
import { useShop } from '../context/ShopContext';
import ShopExperienceCard from '../components/ShopExperienceCard';
import { FaPhone, FaWhatsapp, FaCheckCircle, FaUserTie, FaFire, FaClock, FaMapMarkerAlt as FaLocationDot } from 'react-icons/fa';

export default function AboutPage() {
  const { settings } = useShop();

  return (
    <div className="section-wrapper">
      <div className="about-hero">
        <span className="section-subtitle-tag">ABOUT OUR CHOMU OUTLET</span>
        <h1 className="section-title">
          The Story of <span>MK Fast-Food</span>
        </h1>
        <p className="section-lead">
          Small space, massive passion, and street flavors perfected through daily high-heat wok tossing and fresh handcrafted momos.
        </p>
      </div>

      {/* Story grid */}
      <div className="about-story-grid">
        <div className="about-story-text">
          <h3>Born on the Vibrant Streets of Chomu</h3>
          <p>
            {settings.businessName} was founded with a singular ambition: to serve the crispiest, hottest, and most flavorful fast food to the residents, students, and workers of Chomu.
          </p>
          <p>
            Situated right near Nagar Palika and New Gareeb Nawaj Hotel, our shop is a bustling roadside culinary landmark. We make our momo stuffing fresh every morning, craft our own secret fiery red chili sauce, and toss street chowmein on blazing high-flame woks to capture that authentic smoky wok-hei.
          </p>

          <ul className="about-highlights-list">
            <li>
              <FaCheckCircle /> Handcrafted daily fillings with zero preservatives
            </li>
            <li>
              <FaCheckCircle /> Signature red momo chutney and garlic mayo blend
            </li>
            <li>
              <FaCheckCircle /> Ultra-fast takeaway packaging ready in 5–10 minutes
            </li>
            <li>
              <FaCheckCircle /> Friendly neighborhood hospitality by Mumtaj & Arbaj Khan
            </li>
          </ul>
        </div>

        <div className="about-story-img">
          <img 
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80" 
            alt="MK Fast Food Street Outlet" 
          />
        </div>
      </div>

      {/* Shop dimensions & reality */}
      <ShopExperienceCard />

      {/* Meet the Owners Section */}
      <div style={{ marginTop: '70px' }}>
        <div className="section-header-centered">
          <span className="section-subtitle-tag">MEET THE FOUNDERS</span>
          <h2 className="section-title">
            Passionate Hands <span>Behind Every Order</span>
          </h2>
          <p className="section-lead">
            Meet Mumtaj Khan and Arbaj Khan — always present at the counter to ensure every momo and burger is served piping hot.
          </p>
        </div>

        <div className="owners-grid">
          {/* Owner 1: Mumtaj Khan */}
          <div className="owner-profile-card">
            <div className="owner-avatar-box">
              <FaUserTie />
            </div>
            <div className="owner-details">
              <h3>Mumtaj Khan</h3>
              <span className="owner-role-tag">Co-Founder & Counter Manager</span>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                Spearheads ingredient sourcing, kitchen hygiene, and daily fresh prep.
              </p>
              <div className="owner-phone-link">
                <FaPhone /> 9928588415
              </div>
              <div className="owner-contact-btns">
                <a href="tel:9928588415" className="btn-owner-action call">
                  <FaPhone /> Call Mumtaj
                </a>
              </div>
            </div>
          </div>

          {/* Owner 2: Arbaj Khan */}
          <div className="owner-profile-card">
            <div className="owner-avatar-box" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
              <FaUserTie />
            </div>
            <div className="owner-details">
              <h3>Arbaj Khan</h3>
              <span className="owner-role-tag">Co-Founder & Operations</span>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                Manages online/WhatsApp takeaway inquiries, customer service, and fast-track packing.
              </p>
              <div className="owner-phone-link">
                <FaPhone /> 9785589164
              </div>
              <div className="owner-contact-btns">
                <a href="tel:9785589164" className="btn-owner-action call">
                  <FaPhone /> Call Arbaj
                </a>
                <a 
                  href="https://wa.me/919785589164?text=Hello%20Arbaj%20bhai!%20I%20have%20an%20order%20query%20for%20MK%20Fast-Food%20Center." 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-owner-action whatsapp"
                >
                  <FaWhatsapp /> WhatsApp Arbaj
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
