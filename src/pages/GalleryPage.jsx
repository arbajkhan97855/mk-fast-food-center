import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import Lightbox from '../components/Lightbox';
import { FaEye } from 'react-icons/fa';

export default function GalleryPage() {
  const { gallery } = useShop();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ['all', 'Momos', 'Burgers', 'Rolls', 'Chinese', 'Sides', 'Outlet'];

  const filteredGallery = activeCategory === 'all'
    ? gallery
    : gallery.filter(g => g.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="section-wrapper">
      <div className="section-header-centered">
        <span className="section-subtitle-tag">VISUAL SHOWCASE</span>
        <h1 className="section-title">
          Food & Outlet <span>Gallery</span>
        </h1>
        <p className="section-lead">
          Take a look at our sizzling woks, fresh fillings, loaded rolls, and the lively street counter at MK Fast-Food Center in Chomu.
        </p>

        {/* Category Pills */}
        <div className="category-pills-row" style={{ justifyContent: 'center', marginTop: '24px' }}>
          {categories.map(cat => (
            <button 
              key={cat}
              type="button"
              className={`category-pill-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'all' ? 'All Photos' : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="gallery-grid">
        {filteredGallery.map(item => (
          <div 
            key={item.id} 
            className="gallery-item"
            onClick={() => setSelectedImage(item)}
            role="button"
            tabIndex={0}
          >
            <img src={item.image} alt={item.title} loading="lazy" />
            <div className="gallery-item-overlay">
              <span className="gallery-item-cat">{item.category}</span>
              <h3 className="gallery-item-title">{item.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fff', fontSize: '0.8rem', marginTop: '4px' }}>
                <FaEye /> Click to enlarge
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <Lightbox 
          image={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </div>
  );
}
