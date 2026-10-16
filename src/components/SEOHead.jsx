
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://mkfastfoodcenter.netlify.app';

const seoPages = {
  '/': {
    title: 'MK Fast-Food Center in Chomu | Momos, Burgers & Rolls',
    description:
      'Explore fresh momos, loaded burgers, chowmein, chicken rolls and combos at MK Fast-Food Center in Chomu. View our menu and order on WhatsApp.',
    index: true,
  },
  '/menu': {
    title: 'Food Menu | MK Fast-Food Center, Chomu',
    description:
      'Explore the food menu at MK Fast-Food Center in Chomu, including momos, burgers, chowmein, rolls and more.',
    index: true,
  },
  '/combos': {
    title: 'Food Combos | MK Fast-Food Center, Chomu',
    description:
      'Discover food combos at MK Fast-Food Center in Chomu. Explore available meal combinations and order on WhatsApp.',
    index: true,
  },
  '/offers': {
    title: 'Food Offers | MK Fast-Food Center, Chomu',
    description:
      'Check available food offers and combos at MK Fast-Food Center in Chomu.',
    index: true,
  },
  '/gallery': {
    title: 'Food Gallery | MK Fast-Food Center, Chomu',
    description:
      'Explore food photos from MK Fast-Food Center in Chomu, featuring momos, burgers, chowmein and rolls.',
    index: true,
  },
  '/about': {
    title: 'About Us | MK Fast-Food Center, Chomu',
    description:
      'Learn about MK Fast-Food Center in Chomu and explore our fast-food menu and ordering options.',
    index: true,
  },
  '/contact': {
    title: 'Contact & Location | MK Fast-Food Center, Chomu',
    description:
      'Find MK Fast-Food Center near Nagar Palika in Chomu, Rajasthan. View location details and contact the restaurant.',
    index: true,
  },
  '/cart': {
    title: 'Your Cart | MK Fast-Food Center',
    description: 'Review your selected food items.',
    index: false,
  },
  '/checkout': {
    title: 'Checkout | MK Fast-Food Center',
    description: 'Review your order before placing it.',
    index: false,
  },
  '/wishlist': {
    title: 'Your Wishlist | MK Fast-Food Center',
    description: 'View your saved food items.',
    index: false,
  },
  '/admin': {
    title: 'Admin Login | MK Fast-Food Center',
    description: 'Authorized restaurant administration.',
    index: false,
  },
  '/admin/dashboard': {
    title: 'Admin Dashboard | MK Fast-Food Center',
    description: 'Restaurant administration dashboard.',
    index: false,
  },
};

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(
    `meta[${attribute}="${key}"]`
  );

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

export default function SEOHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = seoPages[pathname] || {
      title: 'Page Not Found | MK Fast-Food Center',
      description: 'The requested page could not be found.',
      index: false,
    };

    document.title = page.title;

    setMeta('name', 'description', page.description);

    setMeta(
      'name',
      'robots',
      page.index ? 'index, follow' : 'noindex, follow'
    );

    setMeta('property', 'og:title', page.title);
    setMeta('property', 'og:description', page.description);
    setMeta('property', 'og:url', `${SITE_URL}${pathname}`);
    setMeta('property', 'og:type', 'website');

    let canonical = document.head.querySelector(
      'link[rel="canonical"]'
    );

    if (page.index) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }

      canonical.href = `${SITE_URL}${pathname}`;
    } else if (canonical) {
      canonical.remove();
    }
  }, [pathname]);

  return null;
}
