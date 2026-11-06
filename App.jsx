import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store.js';
import ProductList from './ProductList.jsx';
import AboutUs from './AboutUs.jsx';
import './App.css';

function AppContent() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  const handleHomeClick = () => {
    setShowProductList(false);
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <div className="landing-content">
            {/* Landing Hero Section */}
            <div className="landing-header-section">
              <div className="brand-badge">
                <span>🌱</span>
                <span>Welcome to Nature's Embrace</span>
              </div>

              <h1 className="landing-title">Paradise Nursery</h1>

              <p className="landing-tagline">
                Where greenery flourishes and mindful homes come alive. Discover curated botanical treasures 
                nurtured for pure air, sweet serenity, and timeless indoor beauty.
              </p>

              <button
                className="get-started-btn"
                onClick={handleGetStartedClick}
              >
                <span>Get Started</span>
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
                    strokeWidth="2.5"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>

            {/* About Us Component */}
            <AboutUs />
          </div>
        </div>
      ) : (
        <ProductList onHomeClick={handleHomeClick} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}