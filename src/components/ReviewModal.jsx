import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import ImageInput from './ImageInput';
import { 
  FaTimes, 
  FaStar, 
  FaUtensils, 
  FaCheck, 
  FaUserCheck,
  FaHeart,
  FaCommentDots
} from 'react-icons/fa';

export default function ReviewModal() {
  const { 
    reviewModalOpen, 
    closeReviewModal, 
    currentUser, 
    addReview, 
    products, 
    showToast 
  } = useShop();

  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [dishName, setDishName] = useState('');
  const [comment, setComment] = useState('');
  const [customAvatar, setCustomAvatar] = useState('');

  useEffect(() => {
    if (currentUser) {
      setCustomerName(currentUser.name || '');
      setCustomAvatar(currentUser.avatar || '');
    } else {
      if (!customerName) {
        setCustomerName('');
      }
      if (!customAvatar) {
        setCustomAvatar('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80');
      }
    }
  }, [currentUser, reviewModalOpen]);

  if (!reviewModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      showToast('Please write your review comments', 'warning');
      return;
    }

    const finalName = customerName.trim() || (currentUser ? currentUser.name : 'Chomu Foodie');

    addReview({
      name: finalName,
      avatar: customAvatar || (currentUser ? currentUser.avatar : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'),
      rating,
      comment: comment.trim(),
      dishName: dishName.trim(),
      source: currentUser ? 'Verified Customer • Chomu' : 'Chomu Local Review'
    });

    closeReviewModal();
    setComment('');
    setDishName('');
    if (!currentUser) {
      setCustomerName('');
    }
  };

  return (
    <div 
      className="admin-modal-overlay" 
      onClick={closeReviewModal} 
      style={{ zIndex: 99999 }}
    >
      <div 
        className="admin-form-modal" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '540px', maxHeight: '92vh', overflowY: 'auto' }}
      >
        <div className="admin-form-modal-header">
          <div className="admin-form-modal-title">
            <div className="admin-form-modal-icon">
              <FaStar style={{ color: '#f59e0b' }} />
            </div>
            <div>
              <h2>Share Your Fast-Food Review</h2>
              <p style={{ margin: 0 }}>
                {currentUser 
                  ? `Posting as verified customer: ${currentUser.name}` 
                  : 'Open to all foodies in Chomu! No signup required.'}
              </p>
            </div>
          </div>
          <button 
            type="button" 
            className="admin-form-modal-close" 
            onClick={closeReviewModal}
            title="Close"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div className="admin-form-modal-body" style={{ padding: '20px' }}>
            {/* If logged in: highlight account badge */}
            {currentUser ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                background: 'rgba(34, 197, 94, 0.08)',
                border: '1px solid rgba(34, 197, 94, 0.25)',
                borderRadius: '10px',
                marginBottom: '16px'
              }}>
                <img 
                  src={customAvatar || currentUser.avatar} 
                  alt={currentUser.name} 
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} 
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80';
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {currentUser.name}
                    <span style={{ fontSize: '0.72rem', background: '#22c55e', color: '#000', padding: '1px 6px', borderRadius: '10px', fontWeight: 700 }}>
                      <FaUserCheck style={{ verticalAlign: '-1px' }} /> Verified Account
                    </span>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    +91 {currentUser.phone} • Chomu Local
                  </div>
                </div>
              </div>
            ) : (
              /* If NOT logged in: simple name input */
              <div className="admin-form-group" style={{ marginBottom: '16px' }}>
                <label className="admin-form-label">
                  <span>Your Name <span className="required">*</span></span>
                  <span className="hint">Will appear on review</span>
                </label>
                <input
                  type="text"
                  required
                  className="admin-input"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Rahul Sharma / Pooja Saini"
                />
              </div>
            )}

            {/* Star rating selector */}
            <div className="admin-form-group" style={{ textAlign: 'center', margin: '12px 0 16px' }}>
              <label className="admin-form-label" style={{ justifyContent: 'center' }}>
                <span style={{ fontSize: '0.92rem' }}>Food & Service Rating</span>
              </label>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '8px 0' }}>
                {[1, 2, 3, 4, 5].map((star) => {
                  const filled = (hoverRating || rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: filled ? '#f59e0b' : 'rgba(255,255,255,0.18)',
                        fontSize: '1.9rem',
                        padding: '2px 4px',
                        transition: 'transform 0.15s ease',
                        transform: filled ? 'scale(1.15)' : 'scale(1)'
                      }}
                      title={`${star} Star`}
                    >
                      <FaStar />
                    </button>
                  );
                })}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#f59e0b', fontWeight: 700 }}>
                {rating === 5 && '🌟 Outstanding & Super Tasty! (5/5)'}
                {rating === 4 && '👍 Very Good Taste & Fast Service (4/5)'}
                {rating === 3 && '🙂 Average Experience (3/5)'}
                {rating === 2 && '😕 Needs Improvement (2/5)'}
                {rating === 1 && '😞 Poor Taste (1/5)'}
              </div>
            </div>

            {/* Favorite Dish select or custom text */}
            <div className="admin-form-group">
              <label className="admin-form-label">
                <span>Favorite Dish you tasted</span>
                <span className="hint">Optional</span>
              </label>
              <select
                className="admin-select"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
              >
                <option value="">Select dish or type below...</option>
                {products && products.slice(0, 15).map(p => (
                  <option key={p.id} value={p.name}>{p.name} (₹{p.price})</option>
                ))}
                <option value="Steamed Chicken Momos">Steamed Chicken Momos</option>
                <option value="Kurkure Paneer Momos">Kurkure Paneer Momos</option>
                <option value="Veg Hakka Chowmein">Veg Hakka Chowmein</option>
                <option value="Double Egg Chicken Roll">Double Egg Chicken Roll</option>
                <option value="Crispy Aloo Tikki Burger">Crispy Aloo Tikki Burger</option>
              </select>
            </div>

            {/* Comment */}
            <div className="admin-form-group">
              <label className="admin-form-label">
                <span>Your Review Feedback <span className="required">*</span></span>
              </label>
              <textarea
                required
                rows={3}
                className="admin-textarea"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was the momo chutney, crunchiness, spicy taste, hygiene or packaging? Share with Chomu locals..."
              />
            </div>

            {/* Review photo avatar option */}
            <div style={{ marginTop: '12px' }}>
              <ImageInput
                label="Your Profile Photo (Optional)"
                value={customAvatar}
                onChange={setCustomAvatar}
                placeholder="https://..."
                previewAspect="square"
                presetOptions={[
                  { label: 'Avatar 1', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80' },
                  { label: 'Avatar 2', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80' },
                  { label: 'Avatar 3', url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80' },
                  { label: 'Avatar 4', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80' }
                ]}
              />
            </div>
          </div>

          <div className="admin-form-modal-footer">
            <button 
              type="button" 
              className="admin-btn-cancel"
              onClick={closeReviewModal}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="admin-btn-submit"
            >
              <FaCheck /> Publish Review (Live Everywhere)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
