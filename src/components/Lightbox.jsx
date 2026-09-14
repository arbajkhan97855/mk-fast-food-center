import React from 'react';
import { FaTimes } from 'react-icons/fa';

export default function Lightbox({ image, onClose }) {
  if (!image) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-box" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          style={{ top: '-14px', right: '-14px' }}
          aria-label="Close image preview"
        >
          <FaTimes />
        </button>
        <img src={image.image} alt={image.title || 'Food view'} />
        {image.title && (
          <div className="lightbox-caption">
            <strong>{image.title}</strong>
            {image.category && <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--secondary)' }}>{image.category}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
