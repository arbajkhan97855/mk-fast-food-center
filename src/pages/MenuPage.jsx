import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { FaSearch, FaTimes, FaFilter, FaUtensils, FaLeaf, FaDrumstickBite } from 'react-icons/fa';

export default function MenuPage() {
  const { products, categories } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCat = searchParams.get('cat') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState('all'); // 'all', 'veg', 'non-veg'
  const [sortBy, setSortBy] = useState('popularity'); // 'popularity', 'price-low', 'price-high', 'rating'
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (slug) => {
    setSelectedCategory(slug);
    if (slug === 'all') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', slug);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category check
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Diet check
      if (dietFilter === 'veg' && !p.isVeg) return false;
      if (dietFilter === 'non-veg' && p.isVeg) return false;

      // Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchDesc = p.shortDesc.toLowerCase().includes(query);
        const matchCategory = p.category.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchCategory) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      // popularity
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [products, selectedCategory, dietFilter, searchQuery, sortBy]);

  return (
    <div className="menu-page-header">
      {/* Header text */}

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span className="section-subtitle-tag">
          MK FAST-FOOD CENTER · CHOMU
        </span>

        <h1 className="section-title">
          Fast Food Menu in Chomu
          <span> Momos, Burgers, Chowmein & Rolls</span>
        </h1>

        <p
          className="section-lead"
          style={{ maxWidth: '650px', margin: '0 auto' }}
        >
          Explore the menu at MK Fast-Food Center in Chomu, Jaipur.
          Find momos, burgers, chowmein, rolls and food combos.
          Check available items and prices before ordering.
        </p>
      </div>


      {/* Filter and Search Bar */}
      <div className="menu-filter-bar">
        <div className="menu-search-row">
          <div className="search-input-wrap">
            <FaSearch />
            <input
              type="text"
              placeholder="Search momos, burger, roll, chowmein..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input-field"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* Veg / Non-Veg Quick Toggles */}
          <div className="diet-filter-toggles">
            <button
              type="button"
              className={`diet-toggle-btn ${dietFilter === 'all' ? 'active' : ''}`}
              onClick={() => setDietFilter('all')}
            >
              All Items
            </button>
            <button
              type="button"
              className={`diet-toggle-btn veg ${dietFilter === 'veg' ? 'active' : ''}`}
              onClick={() => setDietFilter('veg')}
            >
              <FaLeaf /> Pure Veg
            </button>
            <button
              type="button"
              className={`diet-toggle-btn non-veg ${dietFilter === 'non-veg' ? 'active' : ''}`}
              onClick={() => setDietFilter('non-veg')}
            >
              <FaDrumstickBite /> Non-Veg
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="sort-select-wrap">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="popularity">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Pills Row */}
        <div className="category-pills-row">
          <button
            type="button"
            className={`category-pill-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            All Categories ({products.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              className={`category-pill-btn ${selectedCategory === cat.slug ? 'active' : ''
                }`}
              aria-pressed={selectedCategory === cat.slug}
              onClick={() => handleCategoryChange(cat.slug)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Meta Info */}
      <div className="results-meta-bar">
        <span>
          Showing <strong>{filteredProducts.length}</strong> items
          {selectedCategory !== 'all' && ` in ${categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}`}
        </span>
        {(searchQuery || selectedCategory !== 'all' || dietFilter !== 'all') && (
          <button
            type="button"
            style={{ color: 'var(--primary)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '700' }}
            onClick={() => {
              setSelectedCategory('all');
              setDietFilter('all');
              setSearchQuery('');
              searchParams.delete('cat');
              setSearchParams(searchParams);
            }}
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="products-grid-4">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setActiveModalProduct(p)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state-box">
          <div className="empty-state-icon">
            <FaUtensils />
          </div>
          <h3>No Dishes Found</h3>
          <p>We couldn't find any items matching your selected search or filters. Try adjusting your query or category.</p>
          <button
            type="button"
            className="btn-reset-filters"
            onClick={() => {
              setSelectedCategory('all');
              setDietFilter('all');
              setSearchQuery('');
              searchParams.delete('cat');
              setSearchParams(searchParams);
            }}
          >
            Show All Dishes
          </button>
        </div>
      )}

      {/* Modal Quick View */}
      {activeModalProduct && (
        <ProductModal
          product={activeModalProduct}
          onClose={() => setActiveModalProduct(null)}
        />
      )}
    </div>
  );
}
