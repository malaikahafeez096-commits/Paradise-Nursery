import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import CartItem from './CartItem.jsx';
import './App.css';

// Catalog dataset: 3 categories with 6 unique houseplants each (18 total)
const plantsArray = [
  {
    category: 'Air Purifying Plants',
    icon: '🍃',
    plants: [
      {
        name: 'Snake Plant',
        image: 'https://images.unsplash.com/photo-1593482877647-724d1c824c3b?q=80&w=800&auto=format&fit=crop',
        description: 'Produces oxygen overnight and removes toxins like formaldehyde and benzene.',
        cost: '$15',
      },
      {
        name: 'Spider Plant',
        image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?q=80&w=800&auto=format&fit=crop',
        description: 'NASA-verified air purifying champion that is non-toxic and pet friendly.',
        cost: '$12',
      },
      {
        name: 'Peace Lily',
        image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?q=80&w=800&auto=format&fit=crop',
        description: 'Graceful white blooms that absorb airborne mould spores and pollutants.',
        cost: '$18',
      },
      {
        name: 'Boston Fern',
        image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=800&auto=format&fit=crop',
        description: 'Feathery arched fronds that serve as an organic indoor humidifier.',
        cost: '$16',
      },
      {
        name: 'Rubber Plant',
        image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=800&auto=format&fit=crop',
        description: 'Broad, glossy burgundy foliage renowned for cleansing indoor toxins.',
        cost: '$22',
      },
      {
        name: 'Aloe Vera',
        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=800&auto=format&fit=crop',
        description: 'Healing succulent gel with continuous nighttime oxygen output.',
        cost: '$14',
      },
    ],
  },
  {
    category: 'Aromatic Plants',
    icon: '🌸',
    plants: [
      {
        name: 'English Lavender',
        image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?q=80&w=800&auto=format&fit=crop',
        description: 'Soothing floral scent proven to alleviate stress and enhance restful sleep.',
        cost: '$18',
      },
      {
        name: 'Rosemary',
        image: 'https://images.unsplash.com/photo-1515586000433-a5bc720b3603?q=80&w=800&auto=format&fit=crop',
        description: 'Invigorating woody fragrance that sharpens focus and enhances cooking.',
        cost: '$15',
      },
      {
        name: 'Sweet Mint',
        image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?q=80&w=800&auto=format&fit=crop',
        description: 'Crisp refreshing aroma that naturally repels insects and lifts mood.',
        cost: '$12',
      },
      {
        name: 'Arabian Jasmine',
        image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=800&auto=format&fit=crop',
        description: 'Intoxicating sweet evening perfume from delicate star-shaped white flowers.',
        cost: '$24',
      },
      {
        name: 'Lemon Eucalyptus',
        image: 'https://images.unsplash.com/photo-1610444576180-2a8bb7be794d?q=80&w=800&auto=format&fit=crop',
        description: 'Zesty citrus camphor scent that helps clarify respiratory channels.',
        cost: '$20',
      },
      {
        name: 'French Thyme',
        image: 'https://images.unsplash.com/photo-1596724816999-738b56d35706?q=80&w=800&auto=format&fit=crop',
        description: 'Earthy aromatic herb with natural antiseptic and soothing properties.',
        cost: '$14',
      },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    icon: '🌵',
    plants: [
      {
        name: 'ZZ Plant',
        image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=800&auto=format&fit=crop',
        description: 'Virtually indestructible; flourishes in deep shade and infrequent watering.',
        cost: '$22',
      },
      {
        name: 'Golden Pothos',
        image: 'https://images.unsplash.com/photo-1596724817757-047f07bb4c1a?q=80&w=800&auto=format&fit=crop',
        description: 'Fast trailing golden-green vine that forgives neglected watering cycles.',
        cost: '$14',
      },
      {
        name: 'Cast Iron Plant',
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=800&auto=format&fit=crop',
        description: 'True to its name, tolerates drought, temperature swings, and dim rooms.',
        cost: '$25',
      },
      {
        name: 'Jade Plant',
        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=800&auto=format&fit=crop',
        description: 'Fleshy water-storing leaves representing prosperity, needing minimal care.',
        cost: '$16',
      },
      {
        name: 'Succulent Garden',
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800&auto=format&fit=crop',
        description: 'Sun-loving geometric beauties that thrive on sunny windowsills with rare watering.',
        cost: '$19',
      },
      {
        name: 'Monstera Deliciosa',
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=800&auto=format&fit=crop',
        description: 'Celebrated Swiss cheese plant with iconic perforated leaves that easily adapts.',
        cost: '$26',
      },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Total quantity calculation for the persistent cart badge
  const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Check if plant is already present in cart (used to disable the Add to Cart button)
  const isItemInCart = (plantName) => {
    return cartItems.some((item) => item.name === plantName);
  };

  // Add item handler
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div className="product-catalog-page">
      {/* Persistent Header / Navbar across Product Listing and Shopping Cart */}
      <header className="navbar-header">
        <div
          className="nav-brand"
          onClick={onHomeClick}
          role="button"
          tabIndex={0}
          title="Return to Home"
        >
          <div className="nav-logo-icon">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
          <div>
            <h1 className="nav-brand-title">Paradise Nursery</h1>
            <p className="nav-brand-subtitle">Botanical Emporium</p>
          </div>
        </div>

        <nav className="nav-actions">
          <button
            className="nav-link"
            onClick={onHomeClick}
            title="Go to Landing Page"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </button>

          <button
            className={`nav-link ${!showCart ? 'active' : ''}`}
            onClick={() => setShowCart(false)}
            title="Browse Plants Catalog"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            Plants
          </button>

          {/* Dynamic Cart Icon Button with Quantity Counter Badge */}
          <button
            className="cart-icon-btn"
            onClick={() => setShowCart(true)}
            aria-label="View Shopping Cart"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>Cart</span>
            {totalItemsCount > 0 && (
              <span className="cart-badge">{totalItemsCount}</span>
            )}
          </button>
        </nav>
      </header>

      {/* Conditional Rendering between Product Listing and Shopping Cart */}
      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <>
          {/* Catalog Hero Banner */}
          <section className="catalog-hero-banner">
            <h1>Botanical Living Collection</h1>
            <p>
              Hand-selected indoor flora nurtured for wellness, air quality, and enduring natural elegance.
            </p>
          </section>

          {/* Plant Catalog by Categories */}
          <main className="catalog-container">
            {plantsArray.map((categorySection) => (
              <section key={categorySection.category} className="category-section">
                <div className="category-header">
                  <span className="category-icon">{categorySection.icon}</span>
                  <h2 className="category-title">{categorySection.category}</h2>
                </div>

                <div className="plants-grid">
                  {categorySection.plants.map((plant) => {
                    const inCart = isItemInCart(plant.name);
                    return (
                      <article key={plant.name} className="plant-card">
                        <div className="plant-image-wrapper">
                          <img
                            src={plant.image}
                            alt={plant.name}
                            className="plant-image"
                            loading="lazy"
                          />
                          <div className="plant-price-pill">{plant.cost}</div>
                        </div>

                        <div className="plant-info">
                          <h3 className="plant-name">{plant.name}</h3>
                          <p className="plant-description">{plant.description}</p>

                          <div className="plant-footer">
                            <div className="plant-cost-display">
                              <span className="plant-cost-label">Price</span>
                              <span className="plant-cost-value">{plant.cost}</span>
                            </div>

                            <button
                              className="add-to-cart-btn"
                              onClick={() => handleAddToCart(plant)}
                              disabled={inCart}
                            >
                              {inCart ? (
                                <>
                                  <svg
                                    className="w-4 h-4 text-emerald-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2.5"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  Added to Cart
                                </>
                              ) : (
                                <>
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M12 4v16m8-8H4"
                                    />
                                  </svg>
                                  Add to Cart
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </main>
        </>
      )}
    </div>
  );
}

export default ProductList;