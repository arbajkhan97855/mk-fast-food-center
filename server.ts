import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// Persistent Store Setup
const DATA_DIR = path.join(process.cwd(), "server_data");
const STORE_FILE = path.join(DATA_DIR, "store.json");

interface ReviewItem {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  source?: string;
  comment: string;
  dishName?: string;
  createdAt: number;
  userId?: string | null;
}

interface OrderItem {
  id: string;
  customerName: string;
  phone: string;
  mobile?: string;
  orderType: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  amount?: number;
  date: string;
  createdAt: number;
  instructions?: string;
  status: string;
  address?: string;
}

interface EnquiryItem {
  id: string;
  name: string;
  phone: string;
  topic?: string;
  queryType?: string;
  message: string;
  date: string;
  createdAt: number;
  status: string;
}

interface DataStore {
  reviews: ReviewItem[];
  orders: OrderItem[];
  enquiries: EnquiryItem[];
}

const SEED_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Vikram Sharma",
    rating: 5,
    date: "Yesterday",
    source: "Local Guide • Chomu",
    dishName: "Steamed Chicken Momos",
    comment: "Fresh food and very tasty momos! The red garlic chutney is genuinely spicy and authentic. Best momos near Nagar Palika.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
    createdAt: Date.now() - 86400000
  },
  {
    id: "rev-2",
    name: "Rahul Verma",
    rating: 5,
    date: "3 days ago",
    source: "Regular Customer",
    dishName: "Double Egg Chicken Roll",
    comment: "Chicken roll was amazing! Filled with juicy chicken chunks and real egg layer. Arbaj and Mumtaj bhai make it with high energy.",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80",
    createdAt: Date.now() - 86400000 * 3
  },
  {
    id: "rev-3",
    name: "Pooja Choudhary",
    rating: 5,
    date: "1 week ago",
    source: "College Student",
    dishName: "Kurkure Paneer Momos",
    comment: "Good taste and quick service. Even though the shop is compact, the takeaway counter is fast and WhatsApp ordering is super smooth.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    createdAt: Date.now() - 86400000 * 7
  },
  {
    id: "rev-4",
    name: "Mohammad Imran",
    rating: 5,
    date: "2 weeks ago",
    source: "Local Resident",
    dishName: "Crispy Aloo Tikki Burger",
    comment: "Best place for evening snacks in Chomu. Veg chowmein and chicken burger are totally mouthwatering. Great prices too.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    createdAt: Date.now() - 86400000 * 14
  },
  {
    id: "rev-5",
    name: "Sunil Saini",
    rating: 5,
    date: "3 weeks ago",
    source: "Office Worker nearby",
    dishName: "Veg Hakka Chowmein",
    comment: "We regularly order evening takeaway for our staff near Nagar Palika. Hot food delivered promptly to our counter via WhatsApp!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    createdAt: Date.now() - 86400000 * 21
  }
];

const SEED_ORDERS: OrderItem[] = [
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
    date: "Today, 06:45 PM",
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
    date: "Today, 03:20 PM",
    createdAt: Date.now() - 3600000 * 5,
    instructions: "Table outside on chabutara",
    status: "Completed"
  }
];

const SEED_ENQUIRIES: EnquiryItem[] = [
  {
    id: "ENQ-101",
    name: "Amit Pareek",
    phone: "9829876543",
    topic: "Bulk Catering",
    message: "Do you supply 50 plates momos and rolls for evening birthday gathering?",
    date: "Yesterday",
    createdAt: Date.now() - 3600000 * 8,
    status: "Contacted"
  }
];

function loadStore(): DataStore {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(STORE_FILE)) {
      const content = fs.readFileSync(STORE_FILE, "utf-8");
      const parsed = JSON.parse(content);
      return {
        reviews: Array.isArray(parsed.reviews) ? parsed.reviews : SEED_REVIEWS,
        orders: Array.isArray(parsed.orders) ? parsed.orders : SEED_ORDERS,
        enquiries: Array.isArray(parsed.enquiries) ? parsed.enquiries : SEED_ENQUIRIES
      };
    }
  } catch (err) {
    console.error("Error reading store:", err);
  }
  const initial: DataStore = {
    reviews: SEED_REVIEWS,
    orders: SEED_ORDERS,
    enquiries: SEED_ENQUIRIES
  };
  saveStore(initial);
  return initial;
}

function saveStore(store: DataStore) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing store:", err);
  }
}

// In-memory reference synced to file
let currentStore: DataStore = loadStore();

// ================= API ROUTES =================

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

// Full initial sync
app.get("/api/sync", (req, res) => {
  res.json({
    reviews: currentStore.reviews,
    orders: currentStore.orders,
    enquiries: currentStore.enquiries
  });
});

// REVIEWS API
// GET all reviews
app.get("/api/reviews", (req, res) => {
  res.json(currentStore.reviews);
});

// POST new review (Open to anyone, NO login/signup required!)
app.post("/api/reviews", (req, res) => {
  try {
    const { name, avatar, rating, comment, dishName, source } = req.body;

    const trimmedComment = typeof comment === "string" ? comment.trim() : "";
    if (!trimmedComment) {
      res.status(400).json({ error: "Review comment is required" });
      return;
    }

    const trimmedName = typeof name === "string" && name.trim() ? name.trim() : "Chomu Local Customer";
    const parsedRating = Math.max(1, Math.min(5, Number(rating) || 5));

    const newReview: ReviewItem = {
      id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: trimmedName,
      avatar: avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
      rating: parsedRating,
      date: "Just now",
      source: source || "Customer Review • Chomu",
      comment: trimmedComment,
      dishName: dishName || "",
      createdAt: Date.now()
    };

    // Prepend so it's top on all phones
    currentStore.reviews = [newReview, ...currentStore.reviews];
    saveStore(currentStore);

    res.json({
      success: true,
      review: newReview,
      reviews: currentStore.reviews
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to create review" });
  }
});

// PUT update review (Admin or customer)
app.put("/api/reviews/:id", (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    let found = false;

    currentStore.reviews = currentStore.reviews.map((r) => {
      if (r.id === id) {
        found = true;
        return { ...r, ...updates };
      }
      return r;
    });

    if (!found) {
      res.status(404).json({ error: "Review not found" });
      return;
    }

    saveStore(currentStore);
    res.json({ success: true, reviews: currentStore.reviews });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to update review" });
  }
});

// DELETE review
app.delete("/api/reviews/:id", (req, res) => {
  try {
    const { id } = req.params;
    currentStore.reviews = currentStore.reviews.filter((r) => r.id !== id);
    saveStore(currentStore);
    res.json({ success: true, reviews: currentStore.reviews });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to delete review" });
  }
});

// ORDERS API
app.get("/api/orders", (req, res) => {
  res.json(currentStore.orders);
});

app.post("/api/orders", (req, res) => {
  try {
    const orderData = req.body;
    const newOrder: OrderItem = {
      id: orderData.id || `ORD-${Date.now().toString().slice(-4)}`,
      customerName: orderData.customerName || "Customer",
      phone: orderData.phone || orderData.mobile || "",
      mobile: orderData.mobile || orderData.phone || "",
      orderType: orderData.orderType || "Takeaway",
      items: orderData.items || [],
      total: orderData.total || orderData.amount || 0,
      amount: orderData.amount || orderData.total || 0,
      date: orderData.date || new Date().toLocaleString("en-IN", { hour12: true }),
      createdAt: orderData.createdAt || Date.now(),
      instructions: orderData.instructions || "",
      status: orderData.status || "Confirmed",
      address: orderData.address || ""
    };

    currentStore.orders = [newOrder, ...currentStore.orders];
    saveStore(currentStore);
    res.json({ success: true, order: newOrder, orders: currentStore.orders });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/api/orders/:id/status", (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    currentStore.orders = currentStore.orders.map((o) =>
      o.id === id ? { ...o, status } : o
    );
    saveStore(currentStore);
    res.json({ success: true, orders: currentStore.orders });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ENQUIRIES API
app.get("/api/enquiries", (req, res) => {
  res.json(currentStore.enquiries);
});

app.post("/api/enquiries", (req, res) => {
  try {
    const enqData = req.body;
    const newEnq: EnquiryItem = {
      id: enqData.id || `ENQ-${Date.now().toString().slice(-4)}`,
      name: enqData.name || "Customer",
      phone: enqData.phone || "",
      topic: enqData.topic || enqData.queryType || "General",
      message: enqData.message || "",
      date: enqData.date || new Date().toLocaleDateString("en-IN"),
      createdAt: enqData.createdAt || Date.now(),
      status: "New"
    };

    currentStore.enquiries = [newEnq, ...currentStore.enquiries];
    saveStore(currentStore);
    res.json({ success: true, enquiry: newEnq, enquiries: currentStore.enquiries });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Start server with Vite middleware in dev or static files in prod
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MK Fast-Food server running on port ${PORT}`);
  });
}

startServer();
