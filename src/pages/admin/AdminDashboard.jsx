import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useShop } from '../../context/ShopContext';
import VegBadge from '../../components/VegBadge';
import ImageInput from '../../components/ImageInput';
import { 
  FaChartPie, 
  FaUtensils, 
  FaLayerGroup, 
  FaTag, 
  FaShoppingBag, 
  FaEnvelope, 
  FaCog, 
  FaSignOutAlt, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaWhatsapp, 
  FaTimes, 
  FaCheck,
  FaRedo,
  FaImage,
  FaStar
} from 'react-icons/fa';

export default function AdminDashboard() {
  const { isAuthenticated, logout } = useAdminAuth();
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    categories,
    combos, 
    addCombo, 
    updateCombo, 
    deleteCombo,
    offers, 
    addOffer, 
    updateOffer, 
    deleteOffer,
    reviews,
    addReview,
    updateReview,
    deleteReview,
    orders, 
    updateOrderStatus,
    enquiries,
    settings, 
    updateSettings, 
    resetToDefaults,
    showToast 
  } = useShop();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Modal State for Products
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'momos',
    price: '',
    oldPrice: '',
    isVeg: true,
    image: '',
    shortDesc: '',
    isBestseller: false
  });

  // Modal State for Combos
  const [comboModalOpen, setComboModalOpen] = useState(false);
  const [editingCombo, setEditingCombo] = useState(null);
  const [comboForm, setComboForm] = useState({
    title: '',
    badge: 'Popular',
    price: '',
    originalPrice: '',
    isVeg: true,
    image: '',
    description: '',
    itemsString: ''
  });

  // Modal State for Offers
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [offerForm, setOfferForm] = useState({
    title: '',
    code: '',
    tag: 'Special',
    description: '',
    expiryText: 'Valid all week'
  });

  // Modal State for Reviews
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 5,
    comment: '',
    dishName: '',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    source: 'Verified Customer • Chomu'
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  // PRODUCT HANDLERS
  const openAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'momos',
      price: '',
      oldPrice: '',
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
      shortDesc: '',
      isBestseller: false
    });
    setProductModalOpen(true);
  };

  const openEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      oldPrice: prod.oldPrice || '',
      isVeg: prod.isVeg,
      image: prod.image,
      shortDesc: prod.shortDesc,
      isBestseller: prod.isBestseller || false
    });
    setProductModalOpen(true);
  };

  const saveProduct = (e) => {
    e.preventDefault();
    const payload = {
      ...productForm,
      price: Number(productForm.price),
      oldPrice: productForm.oldPrice ? Number(productForm.oldPrice) : null
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
      showToast(`Updated product: ${payload.name}`, 'success');
    } else {
      addProduct(payload);
      showToast(`Added new product: ${payload.name}`, 'success');
    }
    setProductModalOpen(false);
  };

  // COMBO HANDLERS
  const openAddCombo = () => {
    setEditingCombo(null);
    setComboForm({
      title: '',
      badge: 'Special Combo',
      price: '',
      originalPrice: '',
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&auto=format&fit=crop&q=80',
      description: '',
      itemsString: ''
    });
    setComboModalOpen(true);
  };

  const openEditCombo = (c) => {
    setEditingCombo(c);
    setComboForm({
      title: c.title,
      badge: c.badge || 'Popular',
      price: c.price,
      originalPrice: c.originalPrice || '',
      isVeg: c.isVeg,
      image: c.image,
      description: c.description,
      itemsString: (c.items || []).join(', ')
    });
    setComboModalOpen(true);
  };

  const saveCombo = (e) => {
    e.preventDefault();
    const items = comboForm.itemsString.split(',').map(s => s.trim()).filter(Boolean);
    const payload = {
      title: comboForm.title,
      badge: comboForm.badge,
      price: Number(comboForm.price),
      originalPrice: comboForm.originalPrice ? Number(comboForm.originalPrice) : null,
      isVeg: comboForm.isVeg,
      image: comboForm.image,
      description: comboForm.description,
      items
    };

    if (editingCombo) {
      updateCombo(editingCombo.id, payload);
      showToast(`Updated combo: ${payload.title}`, 'success');
    } else {
      addCombo(payload);
      showToast(`Added combo: ${payload.title}`, 'success');
    }
    setComboModalOpen(false);
  };

  // OFFER HANDLERS
  const openAddOffer = () => {
    setEditingOffer(null);
    setOfferForm({
      title: '',
      code: '',
      tag: 'Special Offer',
      description: '',
      expiryText: 'Valid on WhatsApp Orders'
    });
    setOfferModalOpen(true);
  };

  const openEditOffer = (off) => {
    setEditingOffer(off);
    setOfferForm({
      title: off.title,
      code: off.code,
      tag: off.tag,
      description: off.description,
      expiryText: off.expiryText
    });
    setOfferModalOpen(true);
  };

  const saveOffer = (e) => {
    e.preventDefault();
    if (editingOffer) {
      updateOffer(editingOffer.id, offerForm);
      showToast(`Updated offer: ${offerForm.title}`, 'success');
    } else {
      addOffer(offerForm);
      showToast(`Added offer: ${offerForm.title}`, 'success');
    }
    setOfferModalOpen(false);
  };

  // REVIEW HANDLERS
  const openAddReview = () => {
    setEditingReview(null);
    setReviewForm({
      name: '',
      rating: 5,
      comment: '',
      dishName: '',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      source: 'Verified Customer • Chomu'
    });
    setReviewModalOpen(true);
  };

  const openEditReview = (rev) => {
    setEditingReview(rev);
    setReviewForm({
      name: rev.name,
      rating: rev.rating || 5,
      comment: rev.comment,
      dishName: rev.dishName || '',
      avatar: rev.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      source: rev.source || 'Verified Customer • Chomu'
    });
    setReviewModalOpen(true);
  };

  const saveReview = (e) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.comment.trim()) {
      showToast('Please provide customer name and review comments', 'warning');
      return;
    }
    if (editingReview) {
      updateReview(editingReview.id, reviewForm);
    } else {
      addReview(reviewForm);
    }
    setReviewModalOpen(false);
  };

  const handleDeleteReview = (id) => {
    if (window.confirm('Are you sure you want to delete this customer review?')) {
      deleteReview(id);
    }
  };

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-icon">MK</div>
          <h3>
            MK FAST-FOOD
            <span>ADMIN MANAGER</span>
          </h3>
        </div>

        <ul className="admin-nav-list">
          <li>
            <button 
              className={`admin-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <FaChartPie /> Dashboard
            </button>
          </li>
          <li>
            <button 
              className={`admin-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <FaShoppingBag /> Orders
              {orders.length > 0 && <span className="admin-nav-badge">{orders.length}</span>}
            </button>
          </li>
          <li>
            <button 
              className={`admin-nav-btn ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <FaUtensils /> Dishes ({products.length})
            </button>
          </li>
          <li>
            <button 
              className={`admin-nav-btn ${activeTab === 'combos' ? 'active' : ''}`}
              onClick={() => setActiveTab('combos')}
            >
              <FaLayerGroup /> Value Combos ({combos.length})
            </button>
          </li>
          <li>
            <button 
              className={`admin-nav-btn ${activeTab === 'offers' ? 'active' : ''}`}
              onClick={() => setActiveTab('offers')}
            >
              <FaTag /> Promo Offers ({offers.length})
            </button>
          </li>
          <li>
            <button 
              className={`admin-nav-btn ${activeTab === 'enquiries' ? 'active' : ''}`}
              onClick={() => setActiveTab('enquiries')}
            >
              <FaEnvelope /> Inquiries
              {enquiries.length > 0 && <span className="admin-nav-badge">{enquiries.length}</span>}
            </button>
          </li>
          <li>
            <button 
              className={`admin-nav-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              <FaStar /> Customer Reviews ({reviews.length})
            </button>
          </li>
          <li>
            <button 
              className={`admin-nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <FaCog /> Shop Settings
            </button>
          </li>
        </ul>

        <button className="admin-logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Sign Out
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="admin-main">
        {/* TOP BAR */}
        <div className="admin-top-row">
          <div className="admin-page-title">
            <h1>
              {activeTab === 'overview' && 'Operations Overview'}
              {activeTab === 'orders' && 'Customer Orders'}
              {activeTab === 'products' && 'Menu Products & Pricing'}
              {activeTab === 'combos' && 'Combos Management'}
              {activeTab === 'offers' && 'Promotions & Coupons'}
              {activeTab === 'reviews' && 'Customer Reviews & Testimonials'}
              {activeTab === 'enquiries' && 'Contact Inquiries'}
              {activeTab === 'settings' && 'Shop Configurations'}
            </h1>
            <p>Real-time client management for MK Fast-Food Center, Chomu.</p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              type="button" 
              className="admin-btn-primary" 
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: '#fff' }}
              onClick={() => navigate('/')}
            >
              View Live Website
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            {/* STATS */}
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <div className="stat-icon-wrap orange"><FaUtensils /></div>
                <div className="stat-info">
                  <h4>Total Dishes</h4>
                  <div className="stat-num">{products.length}</div>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="stat-icon-wrap yellow"><FaLayerGroup /></div>
                <div className="stat-info">
                  <h4>Active Combos</h4>
                  <div className="stat-num">{combos.length}</div>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="stat-icon-wrap green"><FaShoppingBag /></div>
                <div className="stat-info">
                  <h4>Total Orders</h4>
                  <div className="stat-num">{orders.length}</div>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="stat-icon-wrap blue"><FaEnvelope /></div>
                <div className="stat-info">
                  <h4>Inquiries</h4>
                  <div className="stat-num">{enquiries.length}</div>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="stat-icon-wrap red"><FaTag /></div>
                <div className="stat-info">
                  <h4>Offers</h4>
                  <div className="stat-num">{offers.length}</div>
                </div>
              </div>
            </div>

            {/* RECENT ORDERS TABLE */}
            <div className="admin-table-card" style={{ marginBottom: '32px' }}>
              <div className="admin-table-header">
                <h3>Recent Orders ({orders.length})</h3>
                <button 
                  className="cart-action-link"
                  onClick={() => setActiveTab('orders')}
                >
                  View All Orders
                </button>
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Phone</th>
                      <th>Type</th>
                      <th>Items</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map(ord => (
                      <tr key={ord.id}>
                        <td style={{ fontFamily: 'monospace', color: 'var(--secondary)' }}>{ord.id}</td>
                        <td><strong>{ord.customerName || 'Customer'}</strong></td>
                        <td>{ord.phone || ord.mobile || 'N/A'}</td>
                        <td style={{ textTransform: 'capitalize' }}>{ord.orderType || 'Takeaway'}</td>
                        <td>{(ord.items || []).map(i => `${i.name} (${i.quantity})`).join(', ')}</td>
                        <td style={{ fontWeight: '800', color: '#4ade80' }}>₹{ord.total !== undefined ? ord.total : (ord.amount || 0)}</td>
                        <td>
                          <select 
                            value={ord.status || 'New'}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                            className="form-select"
                            style={{ padding: '4px 8px', fontSize: '0.78rem' }}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td>
                          <a 
                            href={`https://wa.me/91${String(ord.phone || ord.mobile || '').replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(ord.customerName || 'Customer')}!%20This%20is%20MK%20Fast-Food%20Center%20regarding%20your%20order%20${ord.id}.`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-icon-action whatsapp"
                            title="Chat on WhatsApp"
                          >
                            <FaWhatsapp />
                          </a>
                        </td>
                      </tr>
                    ))}
                    {orders.length === 0 && (
                      <tr>
                        <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                          No orders placed yet. As customers order, they will populate here!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="admin-table-card">
            <div className="admin-table-header">
              <h3>All Food Products ({products.length})</h3>
              <button 
                type="button" 
                className="admin-btn-primary" 
                onClick={openAddProduct}
              >
                <FaPlus /> Add New Dish
              </button>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Dish Name</th>
                    <th>Category</th>
                    <th>Diet</th>
                    <th>Price</th>
                    <th>Old Price</th>
                    <th>Badge</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td>
                        <img src={p.image} alt={p.name} className="table-img-thumb" />
                      </td>
                      <td>
                        <strong>{p.name}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.shortDesc}</div>
                      </td>
                      <td style={{ textTransform: 'capitalize' }}>{p.category}</td>
                      <td><VegBadge isVeg={p.isVeg} /></td>
                      <td style={{ fontWeight: '800' }}>₹{p.price}</td>
                      <td style={{ color: 'var(--text-dim)' }}>{p.oldPrice ? `₹${p.oldPrice}` : '-'}</td>
                      <td>
                        {p.isBestseller && <span className="table-badge-status status-confirmed">Bestseller</span>}
                        {!p.isBestseller && <span style={{ color: 'var(--text-dim)' }}>Standard</span>}
                      </td>
                      <td>
                        <div className="table-actions">
                          <button 
                            className="btn-icon-action" 
                            onClick={() => openEditProduct(p)}
                            title="Edit Dish"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="btn-icon-action delete" 
                            onClick={() => {
                              if (window.confirm(`Delete ${p.name}?`)) {
                                deleteProduct(p.id);
                                showToast(`Deleted ${p.name}`, 'info');
                              }
                            }}
                            title="Delete Dish"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: COMBOS */}
        {activeTab === 'combos' && (
          <div className="admin-table-card">
            <div className="admin-table-header">
              <h3>Value Combos & Packs ({combos.length})</h3>
              <button 
                type="button" 
                className="admin-btn-primary" 
                onClick={openAddCombo}
              >
                <FaPlus /> Add Combo Pack
              </button>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Combo Name</th>
                    <th>Items Included</th>
                    <th>Price</th>
                    <th>Original</th>
                    <th>Diet</th>
                    <th>Badge</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {combos.map(c => (
                    <tr key={c.id}>
                      <td><img src={c.image} alt={c.title} className="table-img-thumb" /></td>
                      <td>
                        <strong>{c.title}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.description}</div>
                      </td>
                      <td style={{ fontSize: '0.8rem' }}>{(c.items || []).join(', ')}</td>
                      <td style={{ fontWeight: '800', color: 'var(--secondary)' }}>₹{c.price}</td>
                      <td style={{ color: 'var(--text-dim)' }}>{c.originalPrice ? `₹${c.originalPrice}` : '-'}</td>
                      <td><VegBadge isVeg={c.isVeg} /></td>
                      <td><span className="table-badge-status status-new">{c.badge}</span></td>
                      <td>
                        <div className="table-actions">
                          <button 
                            className="btn-icon-action" 
                            onClick={() => openEditCombo(c)}
                            title="Edit Combo"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="btn-icon-action delete" 
                            onClick={() => {
                              if (window.confirm(`Delete ${c.title}?`)) {
                                deleteCombo(c.id);
                                showToast(`Deleted ${c.title}`, 'info');
                              }
                            }}
                            title="Delete Combo"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: OFFERS */}
        {activeTab === 'offers' && (
          <div className="admin-table-card">
            <div className="admin-table-header">
              <h3>Promo Deals & Coupon Codes ({offers.length})</h3>
              <button 
                type="button" 
                className="admin-btn-primary" 
                onClick={openAddOffer}
              >
                <FaPlus /> Add Promo Offer
              </button>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Tag</th>
                    <th>Title</th>
                    <th>Coupon Code</th>
                    <th>Description</th>
                    <th>Validity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {offers.map(off => (
                    <tr key={off.id}>
                      <td><span className="table-badge-status status-new">{off.tag}</span></td>
                      <td><strong>{off.title}</strong></td>
                      <td style={{ fontFamily: 'monospace', fontWeight: '800', color: 'var(--secondary)' }}>{off.code}</td>
                      <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{off.description}</td>
                      <td style={{ fontSize: '0.8rem' }}>{off.expiryText}</td>
                      <td>
                        <div className="table-actions">
                          <button 
                            className="btn-icon-action" 
                            onClick={() => openEditOffer(off)}
                            title="Edit Offer"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="btn-icon-action delete" 
                            onClick={() => {
                              if (window.confirm(`Delete offer ${off.title}?`)) {
                                deleteOffer(off.id);
                                showToast(`Deleted offer`, 'info');
                              }
                            }}
                            title="Delete Offer"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: ORDERS */}
        {activeTab === 'orders' && (
          <div className="admin-table-card">
            <div className="admin-table-header">
              <h3>All Customer Orders ({orders.length})</h3>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID & Date</th>
                    <th>Customer Name</th>
                    <th>Phone</th>
                    <th>Order Type</th>
                    <th>Dishes & Add-ons</th>
                    <th>Instructions</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>WhatsApp</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(ord => (
                    <tr key={ord.id}>
                      <td>
                        <div style={{ fontFamily: 'monospace', color: 'var(--secondary)' }}>{ord.id}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                          {ord.date || (ord.createdAt ? `${new Date(ord.createdAt).toLocaleDateString()} ${new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Recent')}
                        </div>
                      </td>
                      <td><strong>{ord.customerName || 'Customer'}</strong></td>
                      <td>{ord.phone || ord.mobile || 'N/A'}</td>
                      <td style={{ textTransform: 'capitalize' }}>
                        {ord.orderType || 'Takeaway'}
                        {ord.address && <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{ord.address}</div>}
                      </td>
                      <td style={{ fontSize: '0.82rem' }}>
                        {(ord.items || []).map((i, idx) => (
                          <div key={idx}>
                            • {i.quantity}× {i.name}
                            {i.addons && i.addons.length > 0 && ` (+${i.addons.map(a => a.name).join(', ')})`}
                          </div>
                        ))}
                      </td>
                      <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                        {ord.instructions || 'None'}
                      </td>
                      <td style={{ fontWeight: '800', color: '#4ade80' }}>₹{ord.total !== undefined ? ord.total : (ord.amount || 0)}</td>
                      <td>
                        <select 
                          value={ord.status || 'New'}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                          className="form-select"
                          style={{ padding: '6px 8px', fontSize: '0.8rem' }}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <a 
                          href={`https://wa.me/91${String(ord.phone || ord.mobile || '').replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(ord.customerName || 'Customer')}!%20This%20is%20MK%20Fast-Food%20Center%20Chomu.%20Your%20order%20(${ord.id})%20is%20confirmed.`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-icon-action whatsapp"
                          title="Message Customer on WhatsApp"
                        >
                          <FaWhatsapp />
                        </a>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                        No orders recorded yet. As orders are placed in the checkout or on WhatsApp, they will appear here.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="admin-table-card">
            <div className="admin-table-header">
              <h3>Contact Inquiries ({enquiries.length})</h3>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Topic</th>
                    <th>Message</th>
                    <th>Direct Chat</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map(enq => (
                    <tr key={enq.id}>
                      <td style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        {enq.date || (enq.createdAt ? new Date(enq.createdAt).toLocaleDateString() : 'Recent')}
                      </td>
                      <td><strong>{enq.name || 'Visitor'}</strong></td>
                      <td>{enq.phone || enq.mobile || 'N/A'}</td>
                      <td><span className="table-badge-status status-contacted">{enq.queryType || enq.topic || 'Inquiry'}</span></td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{enq.message}</td>
                      <td>
                        <a 
                          href={`https://wa.me/91${String(enq.phone || enq.mobile || '').replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(enq.name || 'Customer')}!%20Replying%20to%20your%20inquiry%20at%20MK%20Fast-Food%20Center.`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-icon-action whatsapp"
                        >
                          <FaWhatsapp />
                        </a>
                      </td>
                    </tr>
                  ))}
                  {enquiries.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                        No inquiries submitted yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 7: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="checkout-form-box" style={{ maxWidth: '700px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '1.4rem', marginBottom: '16px' }}>
              Shop Profile & Contact Settings
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
              These values populate the header, footer, floating buttons, and WhatsApp routing across the entire website.
            </p>

            <form onSubmit={(e) => {
              e.preventDefault();
              showToast('Shop configurations saved successfully!', 'success');
            }}>
              <div className="form-group">
                <label className="form-label">Business Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={settings.businessName}
                  onChange={(e) => updateSettings({ businessName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tagline</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={settings.tagline}
                  onChange={(e) => updateSettings({ tagline: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Owner 1 Phone (Mumtaj Khan)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={settings.owner1Phone}
                    onChange={(e) => updateSettings({ owner1Phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Owner 2 Phone (Arbaj Khan)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={settings.owner2Phone}
                    onChange={(e) => updateSettings({ owner2Phone: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Primary WhatsApp Number</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={settings.whatsappNumber}
                    onChange={(e) => updateSettings({ whatsappNumber: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    value={settings.email}
                    onChange={(e) => updateSettings({ email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Physical Address</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={settings.address}
                  onChange={(e) => updateSettings({ address: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Opening Hours</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={settings.openingHours}
                  onChange={(e) => updateSettings({ openingHours: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
                <button 
                  type="submit" 
                  className="admin-btn-primary"
                >
                  Save Settings
                </button>

                <button 
                  type="button" 
                  className="btn-continue-shopping"
                  style={{ width: 'auto', margin: '0' }}
                  onClick={() => {
                    if (window.confirm('Reset all demo products, combos, and offers to factory initial state?')) {
                      resetToDefaults();
                    }
                  }}
                >
                  <FaRedo /> Reset to Default Menu
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 8: CUSTOMER REVIEWS */}
        {activeTab === 'reviews' && (
          <div>
            <div className="admin-tab-action-row">
              <div>
                <span className="admin-tab-count">{reviews.length} Customer Reviews</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginLeft: '10px' }}>
                  Manage testimonials displayed on homepage with dual image upload (file & URL)
                </span>
              </div>
              <button 
                type="button" 
                className="admin-btn-primary" 
                onClick={openAddReview}
              >
                <FaPlus /> Add Customer Review
              </button>
            </div>

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Reviewer</th>
                    <th>Rating</th>
                    <th>Dish Mention</th>
                    <th>Comment & Date</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map(rev => (
                    <tr key={rev.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img 
                            src={rev.avatar} 
                            alt={rev.name} 
                            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80';
                            }}
                          />
                          <div>
                            <strong style={{ color: '#fff', fontSize: '0.92rem', display: 'block' }}>{rev.name}</strong>
                            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{rev.source || 'Local Customer'}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#f59e0b' }}>
                          {[...Array(rev.rating || 5)].map((_, i) => (
                            <FaStar key={i} size={13} />
                          ))}
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, marginLeft: '4px', color: '#fff' }}>
                            {rev.rating || 5}.0
                          </span>
                        </div>
                      </td>
                      <td>
                        {rev.dishName ? (
                          <span style={{ 
                            fontSize: '0.76rem', 
                            background: 'rgba(249, 115, 22, 0.12)', 
                            border: '1px solid rgba(249, 115, 22, 0.25)', 
                            color: 'var(--primary-light)',
                            padding: '3px 8px',
                            borderRadius: '6px'
                          }}>
                            {rev.dishName}
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.76rem', color: 'var(--text-dim)' }}>General</span>
                        )}
                      </td>
                      <td style={{ maxWidth: '300px' }}>
                        <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
                          "{rev.comment}"
                        </p>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{rev.date}</span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button 
                            type="button" 
                            className="admin-action-btn edit"
                            onClick={() => openEditReview(rev)}
                            title="Edit Review"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            type="button" 
                            className="admin-action-btn delete"
                            onClick={() => handleDeleteReview(rev.id)}
                            title="Delete Review"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {reviews.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                        No reviews found. Click "Add Customer Review" to add one!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT PRODUCT */}
        {productModalOpen && (
          <div className="admin-modal-overlay" onClick={() => setProductModalOpen(false)}>
            <div className="admin-form-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-form-modal-header">
                <div className="admin-form-modal-title">
                  <div className="admin-form-modal-icon">
                    <FaUtensils />
                  </div>
                  <div>
                    <h2>{editingProduct ? 'Edit Dish Details' : 'Add New Fast-Food Dish'}</h2>
                    <p>{editingProduct ? 'Update pricing, category, or photo' : 'Add item to live customer menu'}</p>
                  </div>
                </div>
                <button 
                  className="admin-form-modal-close" 
                  onClick={() => setProductModalOpen(false)}
                  title="Close Dialog"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={saveProduct} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
                <div className="admin-form-modal-body">
                  <div className="admin-form-group">
                    <label className="admin-form-label">
                      <span>Dish Name <span className="required">*</span></span>
                    </label>
                    <input 
                      type="text" 
                      required 
                      className="admin-input" 
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      placeholder="e.g. Kurkure Paneer Momos"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div className="admin-form-group">
                      <label className="admin-form-label">
                        <span>Menu Category</span>
                      </label>
                      <select 
                        className="admin-select"
                        value={productForm.category}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      >
                        {categories.map(c => (
                          <option key={c.id} value={c.slug}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">
                        <span>Food Diet Type</span>
                      </label>
                      <div className="admin-diet-toggle">
                        <button
                          type="button"
                          className={`admin-diet-btn ${productForm.isVeg ? 'veg-active' : ''}`}
                          onClick={() => setProductForm({ ...productForm, isVeg: true })}
                        >
                          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></span>
                          Pure Veg
                        </button>
                        <button
                          type="button"
                          className={`admin-diet-btn ${!productForm.isVeg ? 'nonveg-active' : ''}`}
                          onClick={() => setProductForm({ ...productForm, isVeg: false })}
                        >
                          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span>
                          Non-Veg
                        </button>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div className="admin-form-group">
                      <label className="admin-form-label">
                        <span>Selling Price <span className="required">*</span></span>
                        <span className="hint">Customer pays</span>
                      </label>
                      <div className="admin-input-wrap">
                        <span className="admin-input-prefix">₹</span>
                        <input 
                          type="number" 
                          required 
                          min="0"
                          className="admin-input with-prefix" 
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                          placeholder="80"
                        />
                      </div>
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">
                        <span>Original / MRP Price</span>
                        <span className="hint">Optional strikethrough</span>
                      </label>
                      <div className="admin-input-wrap">
                        <span className="admin-input-prefix">₹</span>
                        <input 
                          type="number" 
                          min="0"
                          className="admin-input with-prefix" 
                          value={productForm.oldPrice}
                          onChange={(e) => setProductForm({ ...productForm, oldPrice: e.target.value })}
                          placeholder="100"
                        />
                      </div>
                    </div>
                  </div>

                  <ImageInput
                    label="Food Image (Upload File or Live URL)"
                    value={productForm.image}
                    onChange={(val) => setProductForm({ ...productForm, image: val })}
                    required
                    presetOptions={[
                      { label: '🥟 Momos', url: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=600&auto=format&fit=crop&q=80' },
                      { label: '🍝 Chowmein', url: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=600&auto=format&fit=crop&q=80' },
                      { label: '🍔 Burger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80' },
                      { label: '🌯 Roll', url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80' },
                      { label: '🍟 Fries', url: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80' }
                    ]}
                  />

                  <div className="admin-form-group">
                    <label className="admin-form-label">
                      <span>Short Description / Ingredients</span>
                    </label>
                    <input 
                      type="text" 
                      className="admin-input" 
                      value={productForm.shortDesc}
                      onChange={(e) => setProductForm({ ...productForm, shortDesc: e.target.value })}
                      placeholder="e.g. Crispy fried coating with spicy schezwan dip (6 Pcs)"
                    />
                  </div>

                  <div 
                    className="admin-checkbox-card" 
                    onClick={() => setProductForm({ ...productForm, isBestseller: !productForm.isBestseller })}
                  >
                    <div className={`admin-checkbox-custom ${productForm.isBestseller ? 'checked' : ''}`}>
                      {productForm.isBestseller && <FaCheck size={12} />}
                    </div>
                    <div className="admin-checkbox-label">
                      <span className="title">Feature as Chef Bestseller</span>
                      <span className="subtitle">Highlights item on top of home menu with special recommendation badge</span>
                    </div>
                  </div>
                </div>

                <div className="admin-form-modal-footer">
                  <button 
                    type="button" 
                    className="admin-btn-cancel"
                    onClick={() => setProductModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="admin-btn-submit"
                  >
                    <FaCheck /> {editingProduct ? 'Update Dish' : 'Save & Publish Dish'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT COMBO */}
        {comboModalOpen && (
          <div className="admin-modal-overlay" onClick={() => setComboModalOpen(false)}>
            <div className="admin-form-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-form-modal-header">
                <div className="admin-form-modal-title">
                  <div className="admin-form-modal-icon">
                    <FaLayerGroup />
                  </div>
                  <div>
                    <h2>{editingCombo ? 'Edit Combo Pack' : 'Create New Value Combo'}</h2>
                    <p>{editingCombo ? 'Modify items, pricing or banner' : 'Bundle popular items for students & families'}</p>
                  </div>
                </div>
                <button 
                  className="admin-form-modal-close" 
                  onClick={() => setComboModalOpen(false)}
                  title="Close Dialog"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={saveCombo} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
                <div className="admin-form-modal-body">
                  <div className="admin-form-group">
                    <label className="admin-form-label">
                      <span>Combo Title <span className="required">*</span></span>
                    </label>
                    <input 
                      type="text" 
                      required 
                      className="admin-input" 
                      value={comboForm.title}
                      onChange={(e) => setComboForm({ ...comboForm, title: e.target.value })}
                      placeholder="e.g. Student Evening Feast"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div className="admin-form-group">
                      <label className="admin-form-label">
                        <span>Combo Selling Price <span className="required">*</span></span>
                      </label>
                      <div className="admin-input-wrap">
                        <span className="admin-input-prefix">₹</span>
                        <input 
                          type="number" 
                          required 
                          min="0"
                          className="admin-input with-prefix" 
                          value={comboForm.price}
                          onChange={(e) => setComboForm({ ...comboForm, price: e.target.value })}
                          placeholder="149"
                        />
                      </div>
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">
                        <span>Original Price</span>
                        <span className="hint">Total value</span>
                      </label>
                      <div className="admin-input-wrap">
                        <span className="admin-input-prefix">₹</span>
                        <input 
                          type="number" 
                          min="0"
                          className="admin-input with-prefix" 
                          value={comboForm.originalPrice}
                          onChange={(e) => setComboForm({ ...comboForm, originalPrice: e.target.value })}
                          placeholder="190"
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div className="admin-form-group">
                      <label className="admin-form-label">
                        <span>Badge Ribbon</span>
                      </label>
                      <input 
                        type="text" 
                        className="admin-input" 
                        value={comboForm.badge}
                        onChange={(e) => setComboForm({ ...comboForm, badge: e.target.value })}
                        placeholder="e.g. Most Popular"
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">
                        <span>Dietary Type</span>
                      </label>
                      <div className="admin-diet-toggle">
                        <button
                          type="button"
                          className={`admin-diet-btn ${comboForm.isVeg ? 'veg-active' : ''}`}
                          onClick={() => setComboForm({ ...comboForm, isVeg: true })}
                        >
                          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></span>
                          Veg Combo
                        </button>
                        <button
                          type="button"
                          className={`admin-diet-btn ${!comboForm.isVeg ? 'nonveg-active' : ''}`}
                          onClick={() => setComboForm({ ...comboForm, isVeg: false })}
                        >
                          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span>
                          Non-Veg
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">
                      <span>Included Food Items (Comma Separated) <span className="required">*</span></span>
                    </label>
                    <input 
                      type="text" 
                      required 
                      className="admin-input" 
                      value={comboForm.itemsString}
                      onChange={(e) => setComboForm({ ...comboForm, itemsString: e.target.value })}
                      placeholder="e.g. Veg Burger, Half Chowmein, Chilled Cold Drink"
                    />
                  </div>

                  <ImageInput
                    label="Combo Banner Photo (Upload File or Live URL)"
                    value={comboForm.image}
                    onChange={(val) => setComboForm({ ...comboForm, image: val })}
                    required
                    presetOptions={[
                      { label: 'Feast Combo', url: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&auto=format&fit=crop&q=80' },
                      { label: 'Burger Combo', url: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&auto=format&fit=crop&q=80' },
                      { label: 'Momos Platter', url: 'https://images.unsplash.com/photo-1625242664156-52725e2e8519?w=600&auto=format&fit=crop&q=80' }
                    ]}
                  />

                  <div className="admin-form-group">
                    <label className="admin-form-label">
                      <span>Description</span>
                    </label>
                    <input 
                      type="text" 
                      className="admin-input" 
                      value={comboForm.description}
                      onChange={(e) => setComboForm({ ...comboForm, description: e.target.value })}
                      placeholder="e.g. Perfect filling combo with complimentary dips"
                    />
                  </div>
                </div>

                <div className="admin-form-modal-footer">
                  <button 
                    type="button" 
                    className="admin-btn-cancel"
                    onClick={() => setComboModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="admin-btn-submit"
                  >
                    <FaCheck /> {editingCombo ? 'Update Combo' : 'Save & Publish Combo'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT OFFER */}
        {offerModalOpen && (
          <div className="admin-modal-overlay" onClick={() => setOfferModalOpen(false)}>
            <div className="admin-form-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
              <div className="admin-form-modal-header">
                <div className="admin-form-modal-title">
                  <div className="admin-form-modal-icon">
                    <FaTag />
                  </div>
                  <div>
                    <h2>{editingOffer ? 'Edit Coupon / Offer' : 'Create Promotional Offer'}</h2>
                    <p>{editingOffer ? 'Update promo code or discount details' : 'Attract repeat orders with discount codes'}</p>
                  </div>
                </div>
                <button 
                  className="admin-form-modal-close" 
                  onClick={() => setOfferModalOpen(false)}
                  title="Close Dialog"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={saveOffer} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
                <div className="admin-form-modal-body">
                  <div className="admin-form-group">
                    <label className="admin-form-label">
                      <span>Offer Headline <span className="required">*</span></span>
                    </label>
                    <input 
                      type="text" 
                      required 
                      className="admin-input" 
                      value={offerForm.title}
                      onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
                      placeholder="e.g. Flat 15% OFF on Weekend Orders"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div className="admin-form-group">
                      <label className="admin-form-label">
                        <span>Coupon Code <span className="required">*</span></span>
                      </label>
                      <input 
                        type="text" 
                        required 
                        className="admin-input" 
                        value={offerForm.code}
                        onChange={(e) => setOfferForm({ ...offerForm, code: e.target.value.toUpperCase() })}
                        placeholder="e.g. MKFAST15"
                        style={{ textTransform: 'uppercase', fontWeight: '700', letterSpacing: '1px' }}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">
                        <span>Tag Badge</span>
                      </label>
                      <input 
                        type="text" 
                        className="admin-input" 
                        value={offerForm.tag}
                        onChange={(e) => setOfferForm({ ...offerForm, tag: e.target.value })}
                        placeholder="e.g. Weekend Special"
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">
                      <span>Offer Description / Terms</span>
                    </label>
                    <textarea 
                      className="admin-textarea" 
                      value={offerForm.description}
                      onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })}
                      placeholder="e.g. Applicable on orders above ₹199 placed through WhatsApp or Direct Pickup."
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">
                      <span>Validity Text</span>
                    </label>
                    <input 
                      type="text" 
                      className="admin-input" 
                      value={offerForm.expiryText}
                      onChange={(e) => setOfferForm({ ...offerForm, expiryText: e.target.value })}
                      placeholder="e.g. Valid until 30th Sep • All Days"
                    />
                  </div>
                </div>

                <div className="admin-form-modal-footer">
                  <button 
                    type="button" 
                    className="admin-btn-cancel"
                    onClick={() => setOfferModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="admin-btn-submit"
                  >
                    <FaCheck /> {editingOffer ? 'Update Offer' : 'Save & Publish Offer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT REVIEW */}
        {reviewModalOpen && (
          <div className="admin-modal-overlay" onClick={() => setReviewModalOpen(false)}>
            <div className="admin-form-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-form-modal-header">
                <div className="admin-form-modal-title">
                  <div className="admin-form-modal-icon">
                    <FaStar />
                  </div>
                  <div>
                    <h2>{editingReview ? 'Edit Customer Review' : 'Add New Customer Review'}</h2>
                    <p>{editingReview ? 'Update testimonial text or customer photo' : 'Add authentic customer feedback to live website'}</p>
                  </div>
                </div>
                <button 
                  className="admin-form-modal-close" 
                  onClick={() => setReviewModalOpen(false)}
                  title="Close Dialog"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={saveReview} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
                <div className="admin-form-modal-body">
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '14px' }}>
                    <div className="admin-form-group">
                      <label className="admin-form-label">
                        <span>Customer Name <span className="required">*</span></span>
                      </label>
                      <input 
                        type="text" 
                        required 
                        className="admin-input" 
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">
                        <span>Star Rating <span className="required">*</span></span>
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '42px' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: star <= reviewForm.rating ? '#f59e0b' : 'rgba(255, 255, 255, 0.2)',
                              fontSize: '1.5rem',
                              padding: '2px',
                              transition: 'transform 0.15s ease'
                            }}
                          >
                            ★
                          </button>
                        ))}
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f59e0b', marginLeft: '4px' }}>
                          {reviewForm.rating} Star{reviewForm.rating > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div className="admin-form-group">
                      <label className="admin-form-label">
                        <span>Favorite / Recommended Dish</span>
                        <span className="hint">Optional</span>
                      </label>
                      <input 
                        type="text" 
                        className="admin-input" 
                        value={reviewForm.dishName}
                        onChange={(e) => setReviewForm({ ...reviewForm, dishName: e.target.value })}
                        placeholder="e.g. Kurkure Paneer Momos"
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-form-label">
                        <span>Source / Location Tag</span>
                      </label>
                      <input 
                        type="text" 
                        className="admin-input" 
                        value={reviewForm.source}
                        onChange={(e) => setReviewForm({ ...reviewForm, source: e.target.value })}
                        placeholder="e.g. Verified Customer • Chomu"
                      />
                    </div>
                  </div>

                  <ImageInput
                    label="Customer Avatar (Upload File or Live URL)"
                    value={reviewForm.avatar}
                    onChange={(val) => setReviewForm({ ...reviewForm, avatar: val })}
                    presetOptions={[
                      { label: 'Avatar 1', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80' },
                      { label: 'Avatar 2', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80' },
                      { label: 'Avatar 3', url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80' },
                      { label: 'Avatar 4', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80' },
                      { label: 'Avatar 5', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80' }
                    ]}
                  />

                  <div className="admin-form-group">
                    <label className="admin-form-label">
                      <span>Customer Review / Testimonial Text <span className="required">*</span></span>
                    </label>
                    <textarea 
                      required
                      rows={3}
                      className="admin-textarea" 
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      placeholder="e.g. Best kurkure momos and chowmein in Chomu! Crispy coating, spicy chutney, and lightning-fast packing."
                    />
                  </div>
                </div>

                <div className="admin-form-modal-footer">
                  <button 
                    type="button" 
                    className="admin-btn-cancel"
                    onClick={() => setReviewModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="admin-btn-submit"
                  >
                    <FaCheck /> {editingReview ? 'Update Review' : 'Save & Publish Review'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
