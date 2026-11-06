PARADISE NURSERY - PROJECT SUMMARY
===================================

1. OVERVIEW
Paradise Nursery is a responsive React and Redux Toolkit houseplant shopping app. It allows users to explore indoor plants by category, view company background, manage a live shopping cart, and simulate checkout.

2. TECH STACK
- React 19
- Redux Toolkit (@reduxjs/toolkit) & React-Redux
- Vite
- Tailwind CSS

3. CORE FILES & ROLES
- src/CartSlice.jsx    : Redux slice for cart state (addItem, removeItem, updateQuantity).
- src/AboutUs.jsx      : Nursery background, mission, and benefits.
- src/ProductList.jsx  : Catalog with 3 plant categories, navbar, and cart counter.
- src/CartItem.jsx     : Shopping cart page with quantity (+/-) controls and live totals.
- src/App.jsx          : Main wrapper with view switching (Landing vs Catalog/Cart).
- src/App.css          : Styling, responsive grids, and full-screen landing background.
- src/store.js         : Configured Redux store.

4. KEY FEATURES
- Landing page with botanical background and "Get Started" navigation.
- 18 curated houseplants across Air Purifying, Aromatic, and Low Maintenance categories.
- Real-time cart badge counter in the navbar.
- Synchronized "Add to Cart" button (disables and shows "Added to Cart" when in cart; re-enables when removed).
- Cart page with item subtotal (unit price x quantity), grand total, and item delete.
- "Checkout" button with an order confirmation modal.
