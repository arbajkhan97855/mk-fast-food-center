/**
 * Central Data Store for MK FAST-FOOD CENTER
 * Chomu, Jaipur, Rajasthan
 */

export const INITIAL_SETTINGS = {
  businessName: "MK FAST-FOOD CENTER",
  tagline: "Fresh • Hot • Delicious",
  businessType: "Premium Local Fast Food & Quick Service Restaurant",
  owner1Name: "Mumtaj Khan",
  owner1Phone: "9928588415",
  owner2Name: "Arbaj Khan",
  owner2Phone: "9785589164",
  whatsappNumber: "9785589164",
  email: "mkfastfood@gmail.com",
  locationText: "Near Nagar Palika and New Gareeb Nawaj Hotel, Chomu, Jaipur, Rajasthan - 303702, India",
  shortLocation: "Near Nagar Palika, Chomu",
  openingHours: "9:00 AM – 9:30 PM",
  upiId: "9785589164@upi",
  upiQrText: "Scan to Pay via PhonePe / GPay / Paytm at Counter",
  heroHeading: "Your Cravings. Our Kitchen.",
  heroSubheading: "Fresh Momos • Loaded Burgers • Hot Chowmein • Delicious Rolls",
  shopInsideDimension: "8 ft × 6 ft",
  shopChabutaraDimension: "6 ft depth outdoor platform",
  seatingCapacity: "2 Compact Tables (4–6 Guests) + High-Speed Takeaway Counter"
};

export const INITIAL_CATEGORIES = [
  {
    id: "momos",
    name: "Momos",
    slug: "momos",
    shortDesc: "Steamed & crisp fried dumplings with fiery red chutney",
    image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=700&auto=format&fit=crop&q=80"
  },
  {
    id: "chinese",
    name: "Chowmein & Chinese",
    slug: "chinese",
    shortDesc: "Wok-tossed spicy noodles, chilli paneer & chilli chicken",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=700&auto=format&fit=crop&q=80"
  },
  {
    id: "burgers",
    name: "Burgers",
    slug: "burgers",
    shortDesc: "Crispy patties, melted cheese layers & house secret sauce",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=80"
  },
  {
    id: "rolls",
    name: "Rolls",
    slug: "rolls",
    shortDesc: "Fresh rumali/paratha wraps stuffed with chicken or paneer",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=700&auto=format&fit=crop&q=80"
  },
  {
    id: "chicken",
    name: "Chicken Specials",
    slug: "chicken",
    shortDesc: "Tender, marinated, juicy chicken bites & spicy gravies",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=700&auto=format&fit=crop&q=80"
  },
  {
    id: "fries",
    name: "Fries & Sides",
    slug: "fries",
    shortDesc: "Golden salted fries and peri-peri seasoned crunch",
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=700&auto=format&fit=crop&q=80"
  },
  {
    id: "combos",
    name: "Value Combos",
    slug: "combos",
    shortDesc: "Student specials, duo meals & family combos starting ₹90",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=700&auto=format&fit=crop&q=80"
  },
  {
    id: "drinks",
    name: "Chilled Drinks",
    slug: "drinks",
    shortDesc: "Ice-cold sodas and refreshing sealed water bottles",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=700&auto=format&fit=crop&q=80"
  }
];

export const INITIAL_PRODUCTS = [
  // MOMOS
  {
    id: "p1",
    name: "Veg Steam Momos",
    category: "momos",
    price: 60,
    oldPrice: 70,
    isVeg: true,
    rating: 4.8,
    reviewsCount: 142,
    shortDesc: "Freshly steamed soft flour dumplings filled with finely chopped cabbage, carrots, onion & garlic.",
    description: "Our signature Veg Steam Momos are prepared fresh every afternoon. Served steaming hot with our special spicy fire-red garlic chutney and creamy mayonnaise. Lightweight yet deeply satisfying.",
    image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=700&auto=format&fit=crop&q=80",
    isPopular: true,
    isBestseller: true,
    available: true,
    prepTime: "8-10 mins"
  },
  {
    id: "p2",
    name: "Veg Fried Momos",
    category: "momos",
    price: 70,
    oldPrice: 80,
    isVeg: true,
    rating: 4.7,
    reviewsCount: 98,
    shortDesc: "Deep-fried golden crunchy momos tossed in light seasoning.",
    description: "Crispy on the outside, hot and juicy inside. Stuffed with garden veggies and fried to a golden hue. Served with fiery momo red sauce and green dip.",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=700&auto=format&fit=crop&q=80",
    isPopular: false,
    isBestseller: false,
    available: true,
    prepTime: "10 mins"
  },
  {
    id: "p3",
    name: "Chicken Steam Momos",
    category: "momos",
    price: 80,
    oldPrice: 95,
    isVeg: false,
    rating: 4.9,
    reviewsCount: 230,
    shortDesc: "Juicy minced chicken infused with coriander, ginger, pepper and spices.",
    description: "Customer favorite in Chomu! Plump handmade dumplings generously stuffed with spiced minced chicken, steamed to perfection. Eaten hot with spicy garlic dip.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=700&auto=format&fit=crop&q=80",
    isPopular: true,
    isBestseller: true,
    available: true,
    prepTime: "8-10 mins"
  },
  {
    id: "p4",
    name: "Chicken Fried Momos",
    category: "momos",
    price: 90,
    oldPrice: 110,
    isVeg: false,
    rating: 4.9,
    reviewsCount: 176,
    shortDesc: "Super crunchy chicken-stuffed dumplings fried to amber crispness.",
    description: "Golden fried chicken momos with an irresistible crunch. The savory spiced chicken juices melt inside while the outer crust gives a loud snap.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=700&auto=format&fit=crop&q=80",
    isPopular: true,
    isBestseller: false,
    available: true,
    prepTime: "10-12 mins"
  },

  // CHINESE
  {
    id: "p5",
    name: "Veg Chowmein",
    category: "chinese",
    price: 70,
    oldPrice: 85,
    isVeg: true,
    rating: 4.6,
    reviewsCount: 115,
    shortDesc: "Desi street-style wok-tossed noodles with crunchy capsicum & onions.",
    description: "Classic Indian street chowmein stir-fried in high flame with sliced cabbage, bell peppers, carrots, spring onions, dark soya, vinegar, and hot chilli sauce.",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=700&auto=format&fit=crop&q=80",
    isPopular: true,
    isBestseller: true,
    available: true,
    prepTime: "7-9 mins"
  },
  {
    id: "p6",
    name: "Chicken Chowmein",
    category: "chinese",
    price: 100,
    oldPrice: 120,
    isVeg: false,
    rating: 4.9,
    reviewsCount: 204,
    shortDesc: "Stir-fried noodles loaded with succulent shredded chicken pieces.",
    description: "Tossed over a flaming hot wok, loaded with tender chicken chunks, fresh vegetables, egg touch, and MK secret spice blend. A hearty meal in itself.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=700&auto=format&fit=crop&q=80",
    isPopular: true,
    isBestseller: true,
    available: true,
    prepTime: "9-12 mins"
  },
  {
    id: "p7",
    name: "Chilli Paneer",
    category: "chinese",
    price: 100,
    oldPrice: 120,
    isVeg: true,
    rating: 4.7,
    reviewsCount: 88,
    shortDesc: "Crisp cottage cheese cubes coated in spicy soya-garlic glaze.",
    description: "Fresh soft paneer cubes battered and fried crisp, then tossed with diced green capsicum, onion petals, slit green chillies, and savory oriental gravy.",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=700&auto=format&fit=crop&q=80",
    isPopular: false,
    isBestseller: false,
    available: true,
    prepTime: "10 mins"
  },
  {
    id: "p8",
    name: "Chilli Chicken",
    category: "chinese",
    price: 120,
    oldPrice: 140,
    isVeg: false,
    rating: 4.9,
    reviewsCount: 165,
    shortDesc: "Boneless chicken chunks wok-tossed in fiery red chilli and soya reduction.",
    description: "Crispy marinated boneless chicken bites wok-seared with bell peppers, onions, spring greens, and homemade spicy Schezwan sauce.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=700&auto=format&fit=crop&q=80",
    isPopular: true,
    isBestseller: false,
    available: true,
    prepTime: "10-12 mins"
  },

  // BURGERS
  {
    id: "p9",
    name: "Veg Burger",
    category: "burgers",
    price: 60,
    oldPrice: 70,
    isVeg: true,
    rating: 4.6,
    reviewsCount: 92,
    shortDesc: "Toasted sesame bun with spiced vegetable patty and fresh lettuce.",
    description: "Crispy golden potato and veggie patty placed inside warm buttered buns with tomato slices, crunchy onion rings, and creamy mayonnaise spread.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=700&auto=format&fit=crop&q=80",
    isPopular: false,
    isBestseller: false,
    available: true,
    prepTime: "6-8 mins"
  },
  {
    id: "p10",
    name: "Paneer Burger",
    category: "burgers",
    price: 80,
    oldPrice: 95,
    isVeg: true,
    rating: 4.8,
    reviewsCount: 110,
    shortDesc: "Herb-marinated thick paneer slice grilled to tenderness.",
    description: "Generous slab of fresh paneer marinated with Indian spices, seared on the tawa, layered with crisp coleslaw and zesty mint chutney spread.",
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=700&auto=format&fit=crop&q=80",
    isPopular: true,
    isBestseller: false,
    available: true,
    prepTime: "8 mins"
  },
  {
    id: "p11",
    name: "Chicken Burger",
    category: "burgers",
    price: 100,
    oldPrice: 120,
    isVeg: false,
    rating: 4.9,
    reviewsCount: 220,
    shortDesc: "Loaded juicy fried chicken patty with melted cheese and smoky sauce.",
    description: "A huge hit among evening college students in Chomu! Crispy crusted chicken fillet stuffed between toasted buns with pickled onions and smoky garlic mayo.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=80",
    isPopular: true,
    isBestseller: true,
    available: true,
    prepTime: "8-10 mins"
  },

  // ROLLS
  {
    id: "p12",
    name: "Veg Roll",
    category: "rolls",
    price: 70,
    oldPrice: 85,
    isVeg: true,
    rating: 4.6,
    reviewsCount: 84,
    shortDesc: "Flaky paratha rolled with spiced vegetable stuffing & crunchy onions.",
    description: "Crispy tawa paratha filled with shredded cabbage, capsicum, masala potatoes, chaat masala, lemon zest, and spicy green chutney.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=700&auto=format&fit=crop&q=80",
    isPopular: false,
    isBestseller: false,
    available: true,
    prepTime: "7 mins"
  },
  {
    id: "p13",
    name: "Paneer Roll",
    category: "rolls",
    price: 90,
    oldPrice: 105,
    isVeg: true,
    rating: 4.8,
    reviewsCount: 140,
    shortDesc: "Soft tawa paneer cubes sauteed in tikka masala inside a crisp paratha.",
    description: "Soft paneer cubes tossed in rich tandoori spices and capsicum, rolled inside freshly griddled paratha with onion rings and tangy sauces.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=700&auto=format&fit=crop&q=80",
    isPopular: true,
    isBestseller: true,
    available: true,
    prepTime: "8 mins"
  },
  {
    id: "p14",
    name: "Chicken Roll",
    category: "rolls",
    price: 110,
    oldPrice: 130,
    isVeg: false,
    rating: 5.0,
    reviewsCount: 310,
    shortDesc: "Succulent chicken chunks rolled in egg-coated paratha with tangy masala.",
    description: "Our #1 best-selling roll in Chomu. A fresh paratha layered with an egg, filled with sizzling spiced chicken pieces, pickled red onions, lemon drops, and house sauce.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=700&auto=format&fit=crop&q=80",
    isPopular: true,
    isBestseller: true,
    available: true,
    prepTime: "8-10 mins"
  },

  // SIDES & FRIES
  {
    id: "p15",
    name: "French Fries",
    category: "fries",
    price: 60,
    oldPrice: 70,
    isVeg: true,
    rating: 4.7,
    reviewsCount: 120,
    shortDesc: "Classic golden salted potato fries, crispy outside and fluffy inside.",
    description: "Freshly cut and double-fried for optimal crunch. Seasoned lightly with sea salt. Served with sweet tomato ketchup and dip.",
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=700&auto=format&fit=crop&q=80",
    isPopular: true,
    isBestseller: true,
    available: true,
    prepTime: "6 mins"
  },
  {
    id: "p16",
    name: "Peri Peri Fries",
    category: "fries",
    price: 70,
    oldPrice: 85,
    isVeg: true,
    rating: 4.8,
    reviewsCount: 95,
    shortDesc: "Crisp potato fries dusted with zesty, hot peri peri seasoning.",
    description: "Crunchy fries tossed right from the fryer with an aromatic, spicy African peri peri seasoning shaker. Spicy, tangy and addictive.",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=700&auto=format&fit=crop&q=80",
    isPopular: true,
    isBestseller: false,
    available: true,
    prepTime: "6 mins"
  },

  // DRINKS
  {
    id: "p17",
    name: "Cold Drink (Chilled)",
    category: "drinks",
    price: 30,
    oldPrice: 35,
    isVeg: true,
    rating: 4.9,
    reviewsCount: 150,
    shortDesc: "Chilled bottle / can (Thums Up, Coca-Cola, Sprite or Mountain Dew).",
    description: "Ice-cold carbonated beverage served directly from the chiller to beat the Rajasthan heat and complement hot momos and spicy chowmein.",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=700&auto=format&fit=crop&q=80",
    isPopular: false,
    isBestseller: false,
    available: true,
    prepTime: "Instant"
  },
  {
    id: "p18",
    name: "Packaged Drinking Water",
    category: "drinks",
    price: 20,
    oldPrice: 20,
    isVeg: true,
    rating: 4.9,
    reviewsCount: 75,
    shortDesc: "1 Litre sealed chilled mineral water bottle.",
    description: "Sealed hygienic mineral water bottle kept in cold storage.",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=700&auto=format&fit=crop&q=80",
    isPopular: false,
    isBestseller: false,
    available: true,
    prepTime: "Instant"
  }
];

export const INITIAL_COMBOS = [
  {
    id: "combo-1",
    title: "Student Combo",
    badge: "STUDENT FAVORITE",
    price: 90,
    originalPrice: 105,
    tag: "Budget Delight",
    description: "Veg Momos (Full plate) + Chilled Cold Drink. Perfect pocket-friendly evening bite for college and coaching students.",
    items: ["1x Veg Steam Momos (Full Plate)", "1x Chilled Cold Drink (Thums Up / Coke)"],
    image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=700&auto=format&fit=crop&q=80",
    isVeg: true,
    enabled: true
  },
  {
    id: "combo-2",
    title: "Burger Combo",
    badge: "POPULAR",
    price: 120,
    originalPrice: 150,
    tag: "Starting from ₹120",
    description: "Crispy Burger (Veg or Chicken upgrade) + Crispy French Fries + Chilled Cold Drink.",
    items: ["1x Veg or Chicken Burger", "1x Golden French Fries", "1x Chilled Cold Drink"],
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=80",
    isVeg: false,
    enabled: true
  },
  {
    id: "combo-3",
    title: "Chicken Roll Combo",
    badge: "BEST VALUE",
    price: 150,
    originalPrice: 200,
    tag: "Non-Veg Delight",
    description: "Signature Loaded Chicken Roll + Crunchy French Fries + Chilled Cold Drink.",
    items: ["1x Loaded Chicken Roll", "1x French Fries", "1x Chilled Cold Drink"],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=700&auto=format&fit=crop&q=80",
    isVeg: false,
    enabled: true
  },
  {
    id: "combo-4",
    title: "Momos Combo",
    badge: "BEST VALUE",
    price: 140,
    originalPrice: 170,
    tag: "Momo Lovers",
    description: "Chicken or Veg Momos (Choice of Steam/Fried) + Crispy Fries + Chilled Cold Drink.",
    items: ["1x Momos Plate (Veg/Chicken)", "1x Crispy French Fries", "1x Chilled Cold Drink"],
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=700&auto=format&fit=crop&q=80",
    isVeg: false,
    enabled: true
  },
  {
    id: "combo-5",
    title: "Chinese Combo",
    badge: "POPULAR",
    price: 170,
    originalPrice: 210,
    tag: "Wok Special",
    description: "Spicy Veg/Chicken Chowmein + Chilli Paneer or Chilli Chicken Portion + Chilled Cold Drink.",
    items: ["1x Hot Chowmein Plate", "1x Chilli Paneer / Chilli Chicken", "1x Chilled Cold Drink"],
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=700&auto=format&fit=crop&q=80",
    isVeg: false,
    enabled: true
  },
  {
    id: "combo-6",
    title: "Family Combo",
    badge: "MEGA FEAST",
    price: 350,
    originalPrice: 430,
    tag: "Group Deal",
    description: "2 Burgers + 2 Plates of Momos + Large French Fries + 2 Chilled Cold Drinks. Best feast for friends & family takeaway.",
    items: ["2x Delicious Burgers", "2x Momos Plates", "1x Large French Fries", "2x Chilled Cold Drinks"],
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=700&auto=format&fit=crop&q=80",
    isVeg: false,
    enabled: true
  }
];

export const INITIAL_OFFERS = [
  {
    id: "off-1",
    title: "10% OFF on First WhatsApp Order",
    code: "MKFIRST",
    discountPercent: 10,
    tag: "Welcome Deal",
    description: "Get flat 10% discount on your very first order when messaging through WhatsApp directly.",
    expiryText: "Valid for all new customers in Chomu",
    enabled: true
  },
  {
    id: "off-2",
    title: "Combo Deals Starting ₹90",
    code: "STUDENT90",
    discountPercent: 15,
    tag: "Daily Value",
    description: "Enjoy hot momos with chilled drink starting at just ₹90. No coupon needed!",
    expiryText: "Available every day 9:00 AM – 9:30 PM",
    enabled: true
  },
  {
    id: "off-3",
    title: "Weekend Special — Free Extra Dip",
    code: "WEEKENDDIP",
    discountPercent: 0,
    tag: "Saturday & Sunday",
    description: "Complimentary extra fiery red garlic momo sauce + cheese mayonnaise on orders above ₹200.",
    expiryText: "Saturday & Sunday Special",
    enabled: true
  },
  {
    id: "off-4",
    title: "Chicken Lovers Special",
    code: "CHICKEN20",
    discountPercent: 12,
    tag: "Meat Feast",
    description: "Order any 2 chicken items (Momos, Burger, Roll, Chowmein) and get special bundle pricing.",
    expiryText: "Evening 5:00 PM – 9:30 PM",
    enabled: true
  },
  {
    id: "off-5",
    title: "Student Special — Show ID Card",
    code: "COLLEGE5",
    discountPercent: 5,
    tag: "Student Perk",
    description: "Extra 5% instant rebate for students visiting from nearby coaching centers and colleges in Chomu.",
    expiryText: "Valid on counter takeaway & WhatsApp",
    enabled: true
  }
];

export const INITIAL_REVIEWS = [
  {
    id: "rev-1",
    name: "Vikram Sharma",
    rating: 5,
    date: "Yesterday",
    source: "Local Guide • Chomu",
    comment: "Fresh food and very tasty momos! The red garlic chutney is genuinely spicy and authentic. Best momos near Nagar Palika.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "rev-2",
    name: "Rahul Verma",
    rating: 5,
    date: "3 days ago",
    source: "Regular Customer",
    comment: "Chicken roll was amazing! Filled with juicy chicken chunks and real egg layer. Arbaj and Mumtaj bhai make it with high energy.",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "rev-3",
    name: "Pooja Choudhary",
    rating: 5,
    date: "1 week ago",
    source: "College Student",
    comment: "Good taste and quick service. Even though the shop is compact, the takeaway counter is fast and WhatsApp ordering is super smooth.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "rev-4",
    name: "Mohammad Imran",
    rating: 5,
    date: "2 weeks ago",
    source: "Local Resident",
    comment: "Best place for evening snacks in Chomu. Veg chowmein and chicken burger are totally mouthwatering. Great prices too.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "rev-5",
    name: "Sunil Saini",
    rating: 5,
    date: "3 weeks ago",
    source: "Office Worker nearby",
    comment: "We regularly order evening takeaway for our staff near Nagar Palika. Hot food delivered promptly to our counter via WhatsApp!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
  }
];

export const INITIAL_GALLERY = [
  {
    id: "gal-1",
    category: "Momos",
    title: "Steaming Hot Chicken Momos",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "gal-2",
    category: "Burger",
    title: "Double Crunch Loaded Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "gal-3",
    category: "Chowmein",
    title: "Wok-Tossed Spicy Street Chowmein",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "gal-4",
    category: "Rolls",
    title: "Fresh Kathi Chicken Roll",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "gal-5",
    category: "Chicken Specials",
    title: "Crispy Fried Chilli Chicken",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "gal-6",
    category: "Shop",
    title: "MK Fast-Food Counter & Evening Crowd",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "gal-7",
    category: "Combos",
    title: "Value Feast Combos Ready for Takeaway",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "gal-8",
    category: "Momos",
    title: "Fried Momos with Spicy Dip",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=800&auto=format&fit=crop&q=80"
  }
];

export const PRODUCT_ADDONS = [
  { id: "cheese", name: "Extra Cheese Slice / Melt", price: 20 },
  { id: "sauce", name: "Extra Momo Garlic Hot Sauce", price: 10 },
  { id: "mayo", name: "Extra Tandoori Mayo Dip", price: 10 },
  { id: "spicy", name: "Make It Extra Spicy (Desi Tadka)", price: 0 },
  { id: "chicken", name: "Extra Chicken Topping (30g)", price: 30 },
  { id: "paneer", name: "Extra Paneer Chunks", price: 25 }
];

export const FAQ_LIST = [
  {
    q: "What are your opening hours?",
    a: "MK FAST-FOOD CENTER is open every day from 9:00 AM to 9:30 PM. Peak evening rush is between 5:30 PM and 9:00 PM."
  },
  {
    q: "Where is MK Fast-Food Center located?",
    a: "We are conveniently located near Nagar Palika and New Gareeb Nawaj Hotel in Chomu, Jaipur, Rajasthan - 303702."
  },
  {
    q: "Do you serve chicken items?",
    a: "Yes! We serve delicious Chicken Steam Momos, Chicken Fried Momos, Chicken Chowmein, Chicken Burgers, Chicken Rolls, and Chilli Chicken, freshly made with hygienic ingredients."
  },
  {
    q: "Can I order on WhatsApp?",
    a: "Absolutely! Our online ordering directs seamlessly to our WhatsApp at 9785589164. Your order is confirmed immediately with live prep status."
  },
  {
    q: "Do you have combos?",
    a: "Yes, we feature 6 high-value combos starting from just ₹90 for students up to ₹350 for family feasts, saving you up to 25%."
  },
  {
    q: "Do you provide takeaway?",
    a: "Yes, takeaway is our primary specialty! Due to our compact shop size, our counter is optimized for rapid packing with spill-proof boxes."
  },
  {
    q: "Can I enquire before ordering?",
    a: "Yes, you can click any 'Ask on WhatsApp' or 'Call Arbaj / Mumtaj' button to ask about menu items, availability, and bulk party orders."
  },
  {
    q: "Do you have dine-in seating?",
    a: "Our physical shop has a cozy roadside setup: an inside 8ft × 6ft prep kitchen plus an outside 6ft chabutara with 2 compact tables accommodating 4–6 seated guests."
  },
  {
    q: "Can I request extra spicy food?",
    a: "Yes! You can choose 'Extra Spicy' or add custom preparation instructions during checkout or directly over WhatsApp."
  }
];
