import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { FaHeart } from 'react-icons/fa';

export default function WishlistPage() {
  const { wishlist, products } = useShop();
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  const favoritedProducts = products.filter(p => wishlist.includes(p.id));

  if (favoritedProducts.length === 0) {
    return (
      <div className="section-wrapper" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <div className="empty-state-box">
          <div className="empty-state-icon" style={{ color: '#ef4444' }}>
            <FaHeart />
          </div>
          <h2>Your Wishlist is Empty</h2>
          <p>
            You haven't saved any dishes yet. Tap the heart icon on any burger, momos, or roll to save your favorites for later!
          </p>
          <Link to="/menu" className="btn-hero-order" style={{ display: 'inline-flex', marginTop: '14px' }}>
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-wrapper">
      <div className="section-header-centered">
        <span className="section-subtitle-tag">SAVED ITEMS</span>
        <h1 className="section-title">
          Your Favorite <span>Dishes</span>
        </h1>
        <p className="section-lead">
          Easily order your saved cravings with one click.
        </p>
      </div>

      <div className="products-grid-4">
        {favoritedProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onQuickView={(p) => setActiveModalProduct(p)}
          />
        ))}
      </div>

      {activeModalProduct && (
        <ProductModal 
          product={activeModalProduct} 
          onClose={() => setActiveModalProduct(null)} 
        />
      )}
    </div>
  );
}
