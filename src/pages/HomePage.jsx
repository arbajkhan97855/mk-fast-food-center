import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import ShopExperienceCard from '../components/ShopExperienceCard';
import { createWhatsAppGeneralEnquiry } from '../utils/whatsapp';
import { FAQ_LIST } from '../data/initialData';
import { 
  FaWhatsapp, 
  FaUtensils, 
  FaFire, 
  FaMotorcycle, 
  FaStar, 
  FaMapMarkerAlt as FaLocationDot, 
  FaClock, 
  FaTag, 
  FaChevronDown, 
  FaChevronUp, 
  FaArrowRight, 
  FaShieldAlt as FaShieldHalved 
} from 'react-icons/fa';

export default function HomePage() {
  const { 
    products, 
    categories, 
    combos, 
    offers, 
    reviews, 
    settings, 
    addToCart,
    openReviewModal,
    currentUser
  } = useShop();
  const navigate = useNavigate();

  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Best seller product ids from requirements: Chicken Momos, Veg Momos, Chicken Roll, Chicken Burger, Veg Chowmein, Chicken Chowmein, Paneer Roll, French Fries
  const bestSellerProducts = products.filter(p => 
    ['p3', 'p1', 'p14', 'p11', 'p5', 'p6', 'p13', 'p15'].includes(p.id)
  );

  const whatsappUrl = createWhatsAppGeneralEnquiry();

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <main>
      {/* =========================================================
          SECTION 1 — HERO SECTION
          ========================================================= */}
      <section className="hero-section">
        <div className="hero-bg-overlay" />
        <div className="hero-container">
          <div className="hero-text-content">
            <div className="hero-badge-location">
              <FaLocationDot />
              <span>{settings.shortLocation || 'Near Nagar Palika, Chomu'}</span>
            </div>

            <h1 className="hero-headline">
              Your Cravings. <br />
              <span className="highlight-word">Our Kitchen.</span>
            </h1>

            <p className="hero-subheading">
              {settings.heroSubheading || 'Fresh Momos • Loaded Burgers • Hot Chowmein • Delicious Rolls'}
            </p>

            <div className="hero-cta-group">
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-hero-order"
              >
                <FaWhatsapp style={{ fontSize: '1.25rem' }} /> ORDER ON WHATSAPP
              </a>
              <Link to="/menu" className="btn-hero-menu">
                <FaUtensils /> EXPLORE MENU
              </Link>
            </div>

            <div className="hero-highlights-strip">
              <div className="hero-feature-item">
                <FaFire /> <span>Fresh Daily Wok Prep</span>
              </div>
              <div className="hero-feature-item">
                <FaMotorcycle /> <span>Rapid Counter Takeaway</span>
              </div>
              <div className="hero-feature-item">
                <FaStar /> <span>4.9★ Local Rating</span>
              </div>
            </div>
          </div>

          {/* HERO VISUAL WITH ANIMATED FOOD CARDS */}
          <div className="hero-visual-wrap">
            <div className="hero-center-circle" />
            <img 
              src="https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=800&auto=format&fit=crop&q=80" 
              alt="Steaming Hot Dumplings and Fast Food" 
              className="hero-main-dish-img"
            />

            {/* Float Card 1: Momos */}
            <div 
              className="floating-food-card float-card-1"
              onClick={() => {
                const item = products.find(p => p.category === 'momos');
                if (item) setActiveModalProduct(item);
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=120&auto=format&fit=crop&q=80" 
                alt="Chicken Momos" 
              />
              <div className="floating-card-info">
                <h5>Chicken Momos</h5>
                <p>₹80 / plate</p>
              </div>
            </div>

            {/* Float Card 2: Burger */}
            <div 
              className="floating-food-card float-card-2"
              onClick={() => {
                const item = products.find(p => p.id === 'p11');
                if (item) setActiveModalProduct(item);
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=120&auto=format&fit=crop&q=80" 
                alt="Loaded Burger" 
              />
              <div className="floating-card-info">
                <h5>Loaded Burger</h5>
                <p>From ₹60</p>
              </div>
            </div>

            {/* Float Card 3: Chowmein */}
            <div 
              className="floating-food-card float-card-3"
              onClick={() => {
                const item = products.find(p => p.id === 'p5');
                if (item) setActiveModalProduct(item);
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1585032226651-759b368d7246?w=120&auto=format&fit=crop&q=80" 
                alt="Veg Chowmein" 
              />
              <div className="floating-card-info">
                <h5>Hot Chowmein</h5>
                <p>₹70 Street Wok</p>
              </div>
            </div>

            {/* Float Card 4: Chicken Roll */}
            <div 
              className="floating-food-card float-card-4"
              onClick={() => {
                const item = products.find(p => p.id === 'p14');
                if (item) setActiveModalProduct(item);
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?w=120&auto=format&fit=crop&q=80" 
                alt="Chicken Roll" 
              />
              <div className="floating-card-info">
                <h5>Chicken Roll</h5>
                <p>₹110 Loaded</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 2 — QUICK CATEGORIES
          ========================================================= */}
      <section className="section-wrapper">
        <div className="section-header-centered">
          <span className="section-subtitle-tag">EXPLORE OUR SPECIALTIES</span>
          <h2 className="section-title">
            Quick <span>Categories</span>
          </h2>
          <p className="section-lead">
            From piping hot steamed momos to wok-tossed street noodles, choose your favorite cravings.
          </p>
        </div>

        <div className="categories-grid">
          {categories.map(cat => (
            <Link 
              key={cat.id} 
              to={`/menu?cat=${cat.slug}`} 
              className="category-card"
            >
              <img src={cat.image} alt={cat.name} className="category-bg-img" loading="lazy" />
              <div className="category-gradient" />
              <div className="category-content">
                <h3 className="category-title">{cat.name}</h3>
                <p className="category-desc">{cat.shortDesc}</p>
                <span className="category-btn-view">
                  Explore Menu <FaArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================
          SECTION 3 — BEST SELLERS / CUSTOMER FAVORITES
          ========================================================= */}
      <section className="section-wrapper" style={{ paddingTop: '20px' }}>
        <div className="section-header-centered">
          <span className="section-subtitle-tag">TOP RATED IN CHOMU</span>
          <h2 className="section-title">
            Customer <span>Favorites</span>
          </h2>
          <p className="section-lead">
            Our most requested, repeat-ordered delicacies prepared fresh on our live roadside counter.
          </p>
        </div>

        <div className="products-grid-4">
          {bestSellerProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickView={(p) => setActiveModalProduct(p)}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/menu" className="btn-hero-menu" style={{ display: 'inline-flex' }}>
            View Full Menu & Pricing <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* =========================================================
          SECTION 4 — VALUE COMBOS SECTION
          ========================================================= */}
      <section className="section-wrapper">
        <div className="combos-banner-wrap">
          <div style={{ maxWidth: '650px', marginBottom: '32px' }}>
            <span className="section-subtitle-tag" style={{ color: 'var(--secondary)' }}>
              SUPER SAVINGS DEALS
            </span>
            <h2 className="section-title">
              Value Combos <span>Starting ₹90</span>
            </h2>
            <p className="section-lead">
              Budget-friendly meal sets paired with golden fries and chilled cold drinks. Specially curated for students, couples, and family feasts.
            </p>
          </div>

          <div className="combos-grid">
            {combos.filter(c => c.enabled !== false).map(combo => (
              <div key={combo.id} className="combo-card">
                <span className="combo-badge-top">{combo.badge}</span>
                <img src={combo.image} alt={combo.title} className="combo-img" loading="lazy" />

                <div className="combo-body">
                  <h3 className="combo-title">{combo.title}</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {combo.description}
                  </p>

                  <ul className="combo-items-list">
                    {combo.items.map((item, i) => (
                      <li key={i}>
                        <FaUtensils /> <span>{item}</span>
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

                    <button 
                      type="button" 
                      className="btn-buy-now"
                      style={{ padding: '8px 14px', fontSize: '0.8rem' }}
                      onClick={() => {
                        addToCart({
                          id: combo.id,
                          name: combo.title,
                          price: combo.price,
                          image: combo.image,
                          isVeg: combo.isVeg,
                          shortDesc: combo.description
                        }, 1);
                      }}
                    >
                      Add Combo
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 5 — PROMOTIONAL OFFERS
          ========================================================= */}
      <section className="section-wrapper" style={{ paddingTop: '0' }}>
        <div className="section-header-centered">
          <span className="section-subtitle-tag">LIMITED TIME SPECIALS</span>
          <h2 className="section-title">
            Exclusive <span>Offers</span>
          </h2>
          <p className="section-lead">
            Take advantage of these deals when ordering directly on our official WhatsApp number.
          </p>
        </div>

        <div className="offers-grid">
          {offers.filter(o => o.enabled !== false).map(offer => (
            <div key={offer.id} className="offer-card">
              <span className="offer-tag">{offer.tag}</span>
              <h3 className="offer-title">{offer.title}</h3>
              <p className="offer-desc">{offer.description}</p>
              
              <div className="offer-coupon-strip">
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block' }}>CODE</span>
                  <span className="coupon-code">{offer.code}</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {offer.expiryText}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          SECTION 6 — SHOP EXPERIENCE (ROADMAP & DIMENSIONS)
          ========================================================= */}
      <section className="section-wrapper">
        <ShopExperienceCard />
      </section>

      {/* =========================================================
          SECTION 7 — CUSTOMER REVIEWS
          ========================================================= */}
      <section className="section-wrapper">
        <div className="section-header-centered">
          <span className="section-subtitle-tag">TESTIMONIALS</span>
          <h2 className="section-title">
            Loved By <span>Chomu Locals</span>
          </h2>
          <p className="section-lead">
            Authentic customer feedback reflecting our daily street enthusiasm, spicy red momo dip, and crispy fried delicacies.
          </p>

          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={openReviewModal}
              className="btn-hero-order"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                fontSize: '0.88rem',
                borderRadius: '24px'
              }}
            >
              <FaStar style={{ color: '#f59e0b' }} /> Share Your Fast-Food Review
            </button>
            <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              ⭐ Open to everyone — No login required! Visible on all phones & admin panel.
            </span>
          </div>
        </div>

        <div className="reviews-grid">
          {reviews.map(rev => (
            <div key={rev.id} className="review-card">
              <div className="review-header">
                <img 
                  src={rev.avatar} 
                  alt={rev.name} 
                  className="review-avatar" 
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80';
                  }}
                />
                <div>
                  <div className="review-user-name" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {rev.name}
                  </div>
                  <div className="review-user-source">{rev.source} • {rev.date}</div>
                </div>
              </div>

              {rev.dishName && (
                <div style={{
                  display: 'inline-block',
                  background: 'rgba(249, 115, 22, 0.12)',
                  border: '1px solid rgba(249, 115, 22, 0.25)',
                  color: 'var(--primary-light)',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  marginBottom: '10px'
                }}>
                  🍽️ Recommended: {rev.dishName}
                </div>
              )}

              <div className="review-stars">
                {[...Array(rev.rating || 5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <p className="review-text">"{rev.comment}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          SECTION 8 — FAQ SECTION
          ========================================================= */}
      <section className="section-wrapper" style={{ paddingTop: '0' }}>
        <div className="section-header-centered">
          <span className="section-subtitle-tag">GOT QUESTIONS?</span>
          <h2 className="section-title">
            Frequently Asked <span>Questions</span>
          </h2>
          <p className="section-lead">
            Everything you need to know about takeaway, WhatsApp orders, and our Chomu outlet.
          </p>
        </div>

        <div className="faq-wrap">
          {FAQ_LIST.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button 
                  type="button" 
                  className="faq-question-btn" 
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Modal Quick View */}
      {activeModalProduct && (
        <ProductModal 
          product={activeModalProduct} 
          onClose={() => setActiveModalProduct(null)} 
        />
      )}
    </main>
  );
}
