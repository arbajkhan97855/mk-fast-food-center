import React from 'react';
import { useShop } from '../context/ShopContext';
import VegBadge from './VegBadge';
import { FaStar, FaHeart, FaRegHeart, FaCartPlus, FaBolt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart, isInWishlist, toggleWishlist } = useShop();
  const navigate = useNavigate();

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.oldPrice && product.oldPrice > product.price
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    navigate('/checkout');
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div 
      className="product-card" 
      onClick={() => onQuickView && onQuickView(product)}
      role="button"
      tabIndex={0}
    >
      <div className="card-img-wrap">
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80";
          }}
        />

        <div className="card-badges">
          {discountPercent > 0 && (
            <span className="badge-pill discount">{discountPercent}% OFF</span>
          )}
          {product.isBestseller && (
            <span className="badge-pill bestseller">BESTSELLER</span>
          )}
          {product.isPopular && !product.isBestseller && (
            <span className="badge-pill popular">POPULAR</span>
          )}
        </div>

        <button 
          className={`wishlist-heart-btn ${isFavorited ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          title={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          aria-label="Wishlist"
        >
          {isFavorited ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <div className="card-body">
        <div className="card-diet-row">
          <VegBadge isVeg={product.isVeg} showLabel={true} />
          <div className="card-rating">
            <FaStar />
            <span>{product.rating || '4.8'}</span>
            {product.reviewsCount && <span>({product.reviewsCount})</span>}
          </div>
        </div>

        <h3 className="card-title">{product.name}</h3>
        <p className="card-desc">{product.shortDesc}</p>

        <div className="card-price-row">
          <span className="price-current">₹{product.price}</span>
          {product.oldPrice && product.oldPrice > product.price && (
            <span className="price-old">₹{product.oldPrice}</span>
          )}
          {product.oldPrice && product.oldPrice > product.price && (
            <span className="price-saved">Save ₹{product.oldPrice - product.price}</span>
          )}
        </div>

        <div className="card-actions-row">
          <button 
            type="button" 
            className="btn-add-cart" 
            onClick={handleAddToCart}
          >
            <FaCartPlus /> Add
          </button>
          <button 
            type="button" 
            className="btn-buy-now" 
            onClick={handleBuyNow}
          >
            <FaBolt /> Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
