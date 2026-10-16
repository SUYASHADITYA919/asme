import React from 'react';

export default function Hero() {
  return (
    <section className="space-hero">
      {/* Background Celestial Orbs / Glassdrops */}
      <div className="celestial-orbit orb-1"></div>
      <div className="celestial-orbit orb-2"></div>
      <div className="celestial-orbit orb-3"></div>

      <div className="hero-grid-content">
        {/* Middle-Middle Main Typography */}
        <div className="hero-text-block">
          <span className="hero-subtitle">NIT ROURKELA STUDENT CHAPTER</span>
          <h1 className="hero-main-title">ASME</h1>
          <p className="hero-description">
            Pushing the boundaries of mechanical engineering, advanced manufacturing, and high-performance vehicle design.
          </p>
          <div className="hero-cta-group">
            <button className="btn-glow">Explore Chapters &rarr;</button>
          </div>
        </div>

        {/* Middle-Right 360 Rotating Car / HPV Trike Turntable */}
        <div className="turntable-container">
          <div className="turntable-ring"></div>
          <div className="model-wrapper">
            {/* Replace this image path later with your built HPV trike assets */}
            <img 
              src="/assets/hpv-car-placeholder.png" 
              alt="ASME HPV Trike 3D Model" 
              className="rotating-model"
              onError={(e) => {
                // Fallback styled geometric wireframe representation if image missing
                e.target.style.display = 'none';
                e.currentTarget.parentElement.classList.add('fallback-wireframe');
              }}
            />
            <div className="fallback-text">
              <span>[ 360° HPV TURNTABLE ]</span>
              <p>Insert Trike Model / Asset Here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}