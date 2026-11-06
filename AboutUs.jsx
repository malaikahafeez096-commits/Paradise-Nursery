import React from 'react';

function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="about-us-card">
        <div className="about-us-badge">
          <svg
            className="w-4 h-4 mr-1.5 text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          Cultivating Green Sanctuaries Since 2012
        </div>

        <h2 className="about-us-heading">About Paradise Nursery</h2>

        <p className="about-us-text">
          Welcome to <strong className="text-emerald-300 font-semibold">Paradise Nursery</strong>, 
          where passion for botanicals meets mindful living. We believe that incorporating living houseplants into 
          your home or workspace does more than just decorate—it rejuvenates the soul, purifies the air you breathe, 
          and restores our innate connection to the natural world.
        </p>

        <p className="about-us-text">
          Founded by an ardent collective of horticulturists, botanists, and interior stylists, Paradise Nursery carefully 
          curates resilient, vibrant flora cultivated under sustainable organic practices. From toxin-cleansing air purifiers 
          and fragrant herbal companions to practically indestructible low-maintenance succulents, every specimen is hand-selected 
          to flourish in modern indoor environments.
        </p>

        <p className="about-us-text">
          Whether you are an experienced plant parent expanding your urban jungle or just welcoming your very first potted 
          companion, our dedicated nursery specialists provide comprehensive care guides, eco-conscious packaging, and lifetime 
          botanical advice. Explore our botanical collections today and discover your own slice of green paradise.
        </p>

        <div className="about-us-highlights">
          <div className="highlight-item">
            <span className="highlight-icon">🌿</span>
            <div>
              <h4 className="highlight-title">100% Organically Nurtured</h4>
              <p className="highlight-desc">Healthy roots and pest-free foliage guaranteed.</p>
            </div>
          </div>
          <div className="highlight-item">
            <span className="highlight-icon">💨</span>
            <div>
              <h4 className="highlight-title">Natural Air Filtration</h4>
              <p className="highlight-desc">Proven NASA clean-air indoor plants for every room.</p>
            </div>
          </div>
          <div className="highlight-item">
            <span className="highlight-icon">🌱</span>
            <div>
              <h4 className="highlight-title">Green Thumb Support</h4>
              <p className="highlight-desc">Easy care instructions and tailored guidance for all levels.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;