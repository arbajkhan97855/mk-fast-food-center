import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  getDocs 
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { INITIAL_REVIEWS } from './data/initialData';

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Use the provisioned database ID or default
const databaseId = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? firebaseConfig.firestoreDatabaseId
  : undefined;

export const db = databaseId ? getFirestore(app, databaseId) : getFirestore(app);

// Collection References
const reviewsCol = collection(db, 'reviews');
const ordersCol = collection(db, 'orders');
const enquiriesCol = collection(db, 'enquiries');

let isSeeding = false;
async function seedInitialReviewsIfEmpty() {
  if (isSeeding) return;
  isSeeding = true;
  try {
    const snapshot = await getDocs(reviewsCol);
    if (snapshot.empty) {
      console.log('Seeding initial reviews into Firestore Cloud...');
      for (const rev of INITIAL_REVIEWS) {
        await setDoc(doc(db, 'reviews', rev.id), {
          ...rev,
          createdAt: Date.now() - (Math.random() * 86400000 * 5)
        });
      }
    }
  } catch (err) {
    console.warn('Firestore review seed notice:', err);
  } finally {
    isSeeding = false;
  }
}

/**
 * Real-time listener for Reviews
 * Fires immediately with cloud data and whenever ANY user adds/updates a review
 */
export function subscribeReviews(onReviewsUpdated) {
  try {
    seedInitialReviewsIfEmpty();
    const q = query(reviewsCol, orderBy('createdAt', 'desc'));
    
    return onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach((d) => {
        items.push({ id: d.id, ...d.data() });
      });
      if (items.length > 0) {
        onReviewsUpdated(items);
      }
    }, (error) => {
      console.warn('Firestore reviews subscription warning:', error);
    });
  } catch (err) {
    console.warn('Firestore subscription init error:', err);
    return () => {};
  }
}

/**
 * Add a review to Firebase Firestore
 */
export async function addFirestoreReview(review) {
  try {
    const docId = review.id || `rev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const reviewToSave = {
      ...review,
      id: docId,
      createdAt: review.createdAt || Date.now()
    };
    await setDoc(doc(db, 'reviews', docId), reviewToSave);
    return reviewToSave;
  } catch (err) {
    console.error('Error adding review to Firestore:', err);
    throw err;
  }
}

/**
 * Update an existing review in Firebase Firestore
 */
export async function updateFirestoreReview(id, updates) {
  try {
    const ref = doc(db, 'reviews', id);
    await updateDoc(ref, updates);
  } catch (err) {
    console.error('Error updating review in Firestore:', err);
    throw err;
  }
}

/**
 * Delete a review from Firebase Firestore
 */
export async function deleteFirestoreReview(id) {
  try {
    await deleteDoc(doc(db, 'reviews', id));
  } catch (err) {
    console.error('Error deleting review from Firestore:', err);
    throw err;
  }
}

/**
 * Add an order to Firebase Firestore
 */
export async function addFirestoreOrder(order) {
  try {
    const orderId = order.id || `ORD-${Date.now().toString().slice(-4)}`;
    await setDoc(doc(db, 'orders', orderId), {
      ...order,
      id: orderId,
      createdAt: order.createdAt || Date.now()
    });
  } catch (err) {
    console.warn('Firestore order save notice:', err);
  }
}

/**
 * Update order status in Firebase Firestore
 */
export async function updateFirestoreOrderStatus(id, status) {
  try {
    await updateDoc(doc(db, 'orders', id), { status });
  } catch (err) {
    console.warn('Firestore order status update notice:', err);
  }
}

/**
 * Real-time listener for Orders
 */
export function subscribeOrders(onOrdersUpdated) {
  try {
    const q = query(ordersCol, orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach((d) => {
        items.push({ id: d.id, ...d.data() });
      });
      if (items.length > 0) {
        onOrdersUpdated(items);
      }
    }, (err) => {
      console.warn('Orders subscription notice:', err);
    });
  } catch (err) {
    return () => {};
  }
}

/**
 * Add enquiry to Firebase Firestore
 */
export async function addFirestoreEnquiry(enquiry) {
  try {
    const enqId = enquiry.id || `ENQ-${Date.now().toString().slice(-4)}`;
    await setDoc(doc(db, 'enquiries', enqId), {
      ...enquiry,
      id: enqId,
      createdAt: enquiry.createdAt || Date.now()
    });
  } catch (err) {
    console.warn('Firestore enquiry save notice:', err);
  }
}

export default app;
