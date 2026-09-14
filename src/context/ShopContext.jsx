import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  subscribeReviews,
  addFirestoreReview,
  deleteFirestoreReview,
  updateFirestoreReview,
  addFirestoreOrder,
  updateFirestoreOrderStatus,
  subscribeOrders,
  addFirestoreEnquiry
} from '../firebase';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_COMBOS,
  INITIAL_OFFERS,
  INITIAL_REVIEWS,
  INITIAL_GALLERY,
  INITIAL_SETTINGS
} from '../data/initialData';

const ShopContext = createContext();

const STORAGE_KEYS = {
  CART: 'mk_cart_v1',
  WISHLIST: 'mk_wishlist_v1',
  PRODUCTS: 'mk_products_v1',
  CATEGORIES: 'mk_categories_v1',
  COMBOS: 'mk_combos_v1',
  OFFERS: 'mk_offers_v1',
  REVIEWS: 'mk_reviews_v1',
  GALLERY: 'mk_gallery_v1',
  SETTINGS: 'mk_settings_v1',
  ORDERS: 'mk_orders_v1',
  ENQUIRIES: 'mk_enquiries_v1',
  SAVED_FOR_LATER: 'mk_saved_items_v1',
  USERS: 'mk_users_v1',
  CURRENT_USER: 'mk_current_user_v1'
};

const DEFAULT_USERS = [
  {
    id: "usr_default_1",
    name: "Arbaj Pathan",
    phone: "9785589164",
    email: "pathanarbaj03328@gmail.com",
    password: "password123",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    address: "Near Nagar Palika, Chomu",
    role: "customer",
    createdAt: Date.now() - 86400000 * 4
  }
];

function getLocal(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
}

function setLocal(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
}

export function ShopProvider({ children }) {
  // State from LocalStorage or Defaults
  const [products, setProducts] = useState(() => getLocal(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS));
  const [categories, setCategories] = useState(() => getLocal(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES));
  const [combos, setCombos] = useState(() => getLocal(STORAGE_KEYS.COMBOS, INITIAL_COMBOS));
  const [offers, setOffers] = useState(() => getLocal(STORAGE_KEYS.OFFERS, INITIAL_OFFERS));
  const [reviews, setReviews] = useState(() => getLocal(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS));
  const [gallery, setGallery] = useState(() => getLocal(STORAGE_KEYS.GALLERY, INITIAL_GALLERY));
  const [settings, setSettings] = useState(() => getLocal(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS));

  const [cart, setCart] = useState(() => getLocal(STORAGE_KEYS.CART, []));
  const [wishlist, setWishlist] = useState(() => getLocal(STORAGE_KEYS.WISHLIST, []));
  const [savedForLater, setSavedForLater] = useState(() => getLocal(STORAGE_KEYS.SAVED_FOR_LATER, []));

  // Orders and Enquiries (Mock/demo stored on client)
  const [orders, setOrders] = useState(() => {
    const raw = getLocal(STORAGE_KEYS.ORDERS, null);
    if (!raw || !Array.isArray(raw)) {
      return [
        {
          id: "ORD-9021",
          customerName: "Rahul Sharma",
          phone: "9829012345",
          mobile: "9829012345",
          orderType: "Takeaway",
          items: [
            { name: "Chicken Steam Momos", quantity: 2, price: 80 },
            { name: "Chicken Roll", quantity: 1, price: 110 }
          ],
          total: 270,
          amount: 270,
          date: new Date(Date.now() - 3600000 * 2).toLocaleDateString("en-IN", {
            day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
          }),
          createdAt: Date.now() - 3600000 * 2,
          instructions: "Keep extra spicy red chutney please",
          status: "Confirmed"
        },
        {
          id: "ORD-9018",
          customerName: "Priya Soni",
          phone: "9414055521",
          mobile: "9414055521",
          orderType: "Dine-in",
          items: [
            { name: "Veg Chowmein", quantity: 1, price: 70 },
            { name: "French Fries", quantity: 1, price: 60 },
            { name: "Cold Drink (Chilled)", quantity: 2, price: 30 }
          ],
          total: 190,
          amount: 190,
          date: new Date(Date.now() - 3600000 * 5).toLocaleDateString("en-IN", {
            day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
          }),
          createdAt: Date.now() - 3600000 * 5,
          instructions: "Table outside on chabutara",
          status: "Completed"
        }
      ];
    }
    return raw.map(ord => ({
      ...ord,
      phone: ord.phone || ord.mobile || "",
      mobile: ord.mobile || ord.phone || "",
      total: ord.total !== undefined ? ord.total : (ord.amount || 0),
      amount: ord.amount !== undefined ? ord.amount : (ord.total || 0),
      customerName: ord.customerName || "Customer"
    }));
  });

  const [enquiries, setEnquiries] = useState(() => {
    const raw = getLocal(STORAGE_KEYS.ENQUIRIES, null);
    if (!raw || !Array.isArray(raw)) {
      return [
        {
          id: "ENQ-101",
          name: "Amit Pareek",
          phone: "9829876543",
          topic: "Bulk Catering",
          message: "Do you supply 50 plates momos and rolls for evening birthday gathering?",
          date: new Date(Date.now() - 3600000 * 8).toLocaleDateString("en-IN"),
          createdAt: Date.now() - 3600000 * 8,
          status: "Contacted"
        }
      ];
    }
    return raw.map(enq => ({
      ...enq,
      name: enq.name || "Customer",
      phone: enq.phone || enq.mobile || "",
      queryType: enq.queryType || enq.topic || "Inquiry"
    }));
  });

  // Customer Users and Current User state
  const [users, setUsers] = useState(() => getLocal(STORAGE_KEYS.USERS, DEFAULT_USERS));
  const [currentUser, setCurrentUser] = useState(() => getLocal(STORAGE_KEYS.CURRENT_USER, null));

  // Customer Auth Modal State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login' | 'signup'
  const [authModalCallback, setAuthModalCallback] = useState(null);

  const openAuthModal = (tab = 'login', onComplete = null) => {
    setAuthModalTab(tab);
    setAuthModalCallback(() => onComplete);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
    setAuthModalCallback(null);
  };

  // Review Modal State - Open to everyone without mandatory signup
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const openReviewModal = () => {
    setReviewModalOpen(true);
  };
  const closeReviewModal = () => setReviewModalOpen(false);

  // Toast notifications state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Sync state to LocalStorage
  useEffect(() => { setLocal(STORAGE_KEYS.CART, cart); }, [cart]);
  useEffect(() => { setLocal(STORAGE_KEYS.WISHLIST, wishlist); }, [wishlist]);
  useEffect(() => { setLocal(STORAGE_KEYS.SAVED_FOR_LATER, savedForLater); }, [savedForLater]);
  useEffect(() => { setLocal(STORAGE_KEYS.PRODUCTS, products); }, [products]);
  useEffect(() => { setLocal(STORAGE_KEYS.CATEGORIES, categories); }, [categories]);
  useEffect(() => { setLocal(STORAGE_KEYS.COMBOS, combos); }, [combos]);
  useEffect(() => { setLocal(STORAGE_KEYS.OFFERS, offers); }, [offers]);
  useEffect(() => { setLocal(STORAGE_KEYS.REVIEWS, reviews); }, [reviews]);
  useEffect(() => { setLocal(STORAGE_KEYS.GALLERY, gallery); }, [gallery]);
  useEffect(() => { setLocal(STORAGE_KEYS.SETTINGS, settings); }, [settings]);
  useEffect(() => { setLocal(STORAGE_KEYS.ORDERS, orders); }, [orders]);
  useEffect(() => { setLocal(STORAGE_KEYS.ENQUIRIES, enquiries); }, [enquiries]);
  useEffect(() => { setLocal(STORAGE_KEYS.USERS, users); }, [users]);
  useEffect(() => { setLocal(STORAGE_KEYS.CURRENT_USER, currentUser); }, [currentUser]);

  // Fetch reviews, orders, enquiries from central server so all phones stay in sync
  const fetchServerData = async () => {
    try {
      const res = await fetch('/api/sync');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
        if (Array.isArray(data.orders) && data.orders.length > 0) {
          setOrders(data.orders);
        }
        if (Array.isArray(data.enquiries) && data.enquiries.length > 0) {
          setEnquiries(data.enquiries);
        }
      }
    } catch (err) {
      // fallback to client store
    }
  };

  // Real-time Firebase Cloud Database listener (Works seamlessly on Netlify & anywhere!)
  useEffect(() => {
    let unsubscribeReviews = () => {};
    let unsubscribeOrders = () => {};

    try {
      unsubscribeReviews = subscribeReviews((cloudReviews) => {
        if (Array.isArray(cloudReviews) && cloudReviews.length > 0) {
          setReviews(cloudReviews);
        }
      });
      unsubscribeOrders = subscribeOrders((cloudOrders) => {
        if (Array.isArray(cloudOrders) && cloudOrders.length > 0) {
          setOrders(cloudOrders);
        }
      });
    } catch (err) {
      console.warn('Firebase listeners init:', err);
    }

    // Also fallback fetch from backend API if available
    fetchServerData();

    return () => {
      if (typeof unsubscribeReviews === 'function') unsubscribeReviews();
      if (typeof unsubscribeOrders === 'function') unsubscribeOrders();
    };
  }, []);

  // Cart Handlers
  const addToCart = (product, quantity = 1, selectedAddons = []) => {
    const addonsTotal = (selectedAddons || []).reduce((sum, a) => sum + a.price, 0);
    const unitPrice = product.price + addonsTotal;
    const cartItemId = `${product.id}-${(selectedAddons || []).map(a => a.id || a.name).sort().join("_")}`;

    setCart(prev => {
      const existing = prev.find(item => 
        item.cartItemId === cartItemId || 
        (item.id === product.id && (!selectedAddons.length && (!item.addons || !item.addons.length)))
      );
      if (existing) {
        return prev.map(item =>
          (item.cartItemId === cartItemId || item === existing)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            ...product,
            id: product.id,
            cartItemId,
            price: unitPrice,
            basePrice: product.price,
            quantity,
            selectedAddons,
            addons: selectedAddons
          }
        ];
      }
    });

    showToast(`Added ${quantity} × ${product.name} to cart!`, 'success');
  };

  const updateQuantity = (identifier, newQty) => {
    if (newQty <= 0) {
      removeFromCart(identifier);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        (item.cartItemId === identifier || item.id === identifier)
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };
  const updateCartQuantity = updateQuantity;

  const removeFromCart = (identifier) => {
    setCart(prev => prev.filter(item => item.cartItemId !== identifier && item.id !== identifier));
    showToast("Item removed from cart", "info");
  };

  const clearCart = () => {
    setCart([]);
  };

  const saveForLaterItem = (cartItemId) => {
    const item = cart.find(i => i.cartItemId === cartItemId || i.id === cartItemId);
    if (item) {
      setSavedForLater(prev => [...prev.filter(i => i.cartItemId !== cartItemId && i.id !== cartItemId), item]);
      setCart(prev => prev.filter(i => i.cartItemId !== cartItemId && i.id !== cartItemId));
      showToast("Saved for later!", "info");
    }
  };

  const moveToCartFromSaved = (cartItemId) => {
    const item = savedForLater.find(i => i.cartItemId === cartItemId || i.id === cartItemId);
    if (item) {
      setCart(prev => [...prev, item]);
      setSavedForLater(prev => prev.filter(i => i.cartItemId !== cartItemId && i.id !== cartItemId));
      showToast("Moved back to cart!", "success");
    }
  };

  const removeSavedItem = (cartItemId) => {
    setSavedForLater(prev => prev.filter(i => i.cartItemId !== cartItemId && i.id !== cartItemId));
  };

  // Wishlist Handlers
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Removed from Wishlist", "info");
        return prev.filter(id => id !== productId);
      } else {
        showToast("Added to Wishlist ❤️", "success");
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  const moveWishlistToCart = (product) => {
    addToCart(product, 1);
    setWishlist(prev => prev.filter(id => id !== product.id));
  };

  // Orders Management
  const addOrder = (orderData) => {
    const totalVal = orderData.total !== undefined ? orderData.total : (orderData.amount || 0);
    const phoneVal = orderData.phone || orderData.mobile || "";
    const newOrder = {
      id: orderData.id || `MK-${Date.now().toString().slice(-4)}`,
      createdAt: Date.now(),
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
      }),
      status: "New",
      customerName: orderData.customerName || "Customer",
      ...orderData,
      phone: phoneVal,
      mobile: phoneVal,
      total: totalVal,
      amount: totalVal
    };
    setOrders(prev => [newOrder, ...prev]);

    // Save to Firebase Cloud Database (Netlify compatible)
    addFirestoreOrder(newOrder).catch(() => {});

    // Also notify local backend if running
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    }).catch(() => {});

    return newOrder;
  };
  const recordNewOrder = addOrder;

  const updateOrderStatus = (id, status) => {
    setOrders(prev => prev.map(ord => ord.id === id ? { ...ord, status } : ord));
    showToast(`Order status updated to ${status}`, 'info');

    // Update in Firebase Cloud Database
    updateFirestoreOrderStatus(id, status).catch(() => {});

    fetch(`/api/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }).catch(() => {});
  };

  // Enquiries Management
  const addEnquiry = (enqData) => {
    const newEnq = {
      id: `ENQ-${Date.now().toString().slice(-4)}`,
      createdAt: Date.now(),
      date: new Date().toLocaleDateString("en-IN"),
      queryType: enqData.queryType || enqData.topic || 'General Enquiry',
      status: "New",
      ...enqData
    };
    setEnquiries(prev => [newEnq, ...prev]);

    // Save to Firebase Cloud Database
    addFirestoreEnquiry(newEnq).catch(() => {});

    fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEnq)
    }).catch(() => {});
    return newEnq;
  };
  const recordNewEnquiry = addEnquiry;

  // Products CRUD
  const addProduct = (productData) => {
    const newProduct = {
      id: `p_${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      ...productData
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id, updatedData) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Combos CRUD
  const addCombo = (comboData) => {
    const newCombo = {
      id: `c_${Date.now()}`,
      ...comboData
    };
    setCombos(prev => [newCombo, ...prev]);
    return newCombo;
  };

  const updateCombo = (id, updatedData) => {
    setCombos(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
  };

  const deleteCombo = (id) => {
    setCombos(prev => prev.filter(c => c.id !== id));
  };

  // Offers CRUD
  const addOffer = (offerData) => {
    const newOffer = {
      id: `off_${Date.now()}`,
      ...offerData
    };
    setOffers(prev => [newOffer, ...prev]);
    return newOffer;
  };

  const updateOffer = (id, updatedData) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, ...updatedData } : o));
  };

  const deleteOffer = (id) => {
    setOffers(prev => prev.filter(o => o.id !== id));
  };

  // Reviews CRUD with Firebase Cloud persistence (100% works on Netlify)
  const addReview = async (reviewData) => {
    const newRev = {
      id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: reviewData.name?.trim() || (currentUser ? currentUser.name : 'Chomu Local Customer'),
      avatar: reviewData.avatar || (currentUser ? currentUser.avatar : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'),
      rating: Number(reviewData.rating) || 5,
      date: 'Just now',
      source: reviewData.source || (currentUser ? 'Verified Customer • Chomu' : 'Chomu Local Review'),
      comment: reviewData.comment?.trim() || '',
      dishName: reviewData.dishName?.trim() || '',
      userId: currentUser ? currentUser.id : null,
      createdAt: Date.now()
    };

    // Optimistic UI update
    setReviews(prev => [newRev, ...prev]);
    showToast('Thank you! Your review is now live everywhere.', 'success');

    // 1. Direct Firebase Cloud Firestore save (Netlify native)
    try {
      await addFirestoreReview(newRev);
    } catch (err) {
      console.warn('Firebase save fallback:', err);
    }

    // 2. Also notify local server if running
    try {
      await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRev)
      });
    } catch (err) {
      // Netlify ignores local server calls
    }

    return newRev;
  };

  const deleteReview = async (id) => {
    setReviews(prev => prev.filter(r => r.id !== id));
    showToast('Review removed.', 'info');
    try {
      await deleteFirestoreReview(id);
    } catch (err) {
      console.warn('Firebase delete fallback:', err);
    }
    try {
      await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
    } catch (err) {}
  };

  const updateReview = async (id, updatedData) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, ...updatedData } : r));
    showToast('Review updated successfully.', 'success');
    try {
      await updateFirestoreReview(id, updatedData);
    } catch (err) {
      console.warn('Firebase update fallback:', err);
    }
    try {
      await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
    } catch (err) {}
  };

  // Customer Authentication methods
  const signupUser = ({ name, phone, email = '', password, address = '', avatar = '' }) => {
    const cleanPhone = phone.trim().replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'danger');
      return { success: false, message: 'Invalid phone number' };
    }

    // Check if user already exists
    const existing = users.find(u => u.phone === cleanPhone || (email && u.email && u.email.toLowerCase() === email.toLowerCase()));
    if (existing) {
      showToast('Account already exists with this mobile or email! Please login.', 'warning');
      setAuthModalTab('login');
      return { success: false, message: 'User already exists' };
    }

    const defaultAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
    const newUser = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      phone: cleanPhone,
      email: email.trim().toLowerCase(),
      password,
      address: address.trim(),
      avatar: avatar || defaultAvatar,
      role: 'customer',
      createdAt: Date.now()
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    showToast(`Welcome to MK Fast-Food, ${newUser.name}! Account created.`, 'success');

    if (authModalCallback) {
      authModalCallback(newUser);
    }
    closeAuthModal();
    return { success: true, user: newUser };
  };

  const loginUser = ({ phoneOrEmail, password }) => {
    const cleanQuery = phoneOrEmail.trim().toLowerCase();
    const cleanPhone = cleanQuery.replace(/\D/g, '');

    const found = users.find(u => 
      (u.phone && u.phone === cleanPhone) || 
      (u.email && u.email.toLowerCase() === cleanQuery)
    );

    if (!found) {
      showToast('No customer account found with this phone/email. Please sign up!', 'danger');
      return { success: false, message: 'User not found' };
    }

    if (found.password && found.password !== password) {
      showToast('Incorrect password. Please try again.', 'danger');
      return { success: false, message: 'Wrong password' };
    }

    setCurrentUser(found);
    showToast(`Welcome back, ${found.name}!`, 'success');

    if (authModalCallback) {
      authModalCallback(found);
    }
    closeAuthModal();
    return { success: true, user: found };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    showToast('Logged out of your customer account.', 'info');
  };

  const updateUserProfile = (updatedFields) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updated : u));
    showToast('Profile updated successfully!', 'success');
  };

  // Settings & Reset
  const updateSettings = (partialSettings) => {
    setSettings(prev => ({ ...prev, ...partialSettings }));
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setCombos(INITIAL_COMBOS);
    setOffers(INITIAL_OFFERS);
    setReviews(INITIAL_REVIEWS);
    setGallery(INITIAL_GALLERY);
    setSettings(INITIAL_SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.COMBOS);
    localStorage.removeItem(STORAGE_KEYS.OFFERS);
    localStorage.removeItem(STORAGE_KEYS.REVIEWS);
    localStorage.removeItem(STORAGE_KEYS.GALLERY);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    showToast("Reset all data to default menu!", "info");
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        products,
        setProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        categories,
        setCategories,
        combos,
        setCombos,
        addCombo,
        updateCombo,
        deleteCombo,
        offers,
        setOffers,
        addOffer,
        updateOffer,
        deleteOffer,
        reviews,
        setReviews,
        addReview,
        deleteReview,
        updateReview,
        users,
        setUsers,
        currentUser,
        setCurrentUser,
        signupUser,
        loginUser,
        logoutUser,
        updateUserProfile,
        authModalOpen,
        setAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        openAuthModal,
        closeAuthModal,
        reviewModalOpen,
        setReviewModalOpen,
        openReviewModal,
        closeReviewModal,
        gallery,
        setGallery,
        settings,
        setSettings,
        updateSettings,
        resetToDefaults,
        cart,
        addToCart,
        updateQuantity,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        saveForLaterItem,
        moveToCartFromSaved,
        removeSavedItem,
        savedForLater,
        cartSubtotal,
        cartItemCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        moveWishlistToCart,
        orders,
        setOrders,
        addOrder,
        recordNewOrder,
        updateOrderStatus,
        enquiries,
        setEnquiries,
        addEnquiry,
        recordNewEnquiry,
        toast,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
