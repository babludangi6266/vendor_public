
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Added Link
import { motion } from 'framer-motion';
import LegalSection from './LegalSection';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './HomePage.css'; 

const AnimatedSection = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const EarlyBirdMarquee = () => {
  return (
    <div className="aesthetic-marquee-container">
      <div className="aesthetic-marquee-track">
        {/* BLOCK 1 */}
        <div className="marquee-content">
           <span>🚀 EARLY BIRD OFFER!</span>
           <span className="highlight">FREE Registration</span>
           <span>for first 1000 candidates!</span>
           <span>⏳ Hurry Up!</span>
        </div>
        
        {/* BLOCK 2 (Duplicate for seamless loop) */}
        <div className="marquee-content">
           <span>🚀 EARLY BIRD OFFER!</span>
           <span className="highlight">FREE Registration</span>
           <span>for first 1000 candidates!</span>
           <span>⏳ Hurry Up!</span>
        </div>

         {/* BLOCK 3 (Duplicate for wide screens) */}
         <div className="marquee-content">
           <span>🚀 EARLY BIRD OFFER!</span>
           <span className="highlight">FREE Registration</span>
           <span>for first 1000 candidates!</span>
           <span>⏳ Hurry Up!</span>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const [activeLegal, setActiveLegal] = useState(null);

  const handleLegalToggle = (section) => {
    setActiveLegal(activeLegal === section ? null : section);
  };

  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"; // The Handwritten Font
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

  const trustLogos = [
    'Healthcare', 'Hospitality', 'Construction', 'Retail', 
    'Education', 'Manufacturing', 'Logistics', 'Services'
  ];
  
  const jobCategories = [
    { name: 'Construction', jobs: '2.1K', image: '/images/constrction.jpg' },
    { name: 'Healthcare', jobs: '800+', image: '/images/healthcare.jpg' },
    { name: 'Hospitality', jobs: '950+', image: '/images/hospitality.jpg' },
    { name: 'Manufacturing', jobs: '1.2K', image: '/images/manufactoring.jpg' },
    { name: 'Retail', jobs: '1.5K', image: '/images/retail.jpg' },
    { name: 'Logistics', jobs: '750+', image: '/images/logistic.jpg' },
    { name: 'Customer Service', jobs: '600+', image: '/images/cs.jpg' },
    { name: 'Education', jobs: '400+', image: '/images/education.jpg' },
  ];

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 10; 
    const y = (e.clientY - top - height / 2) / 10; 
    card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.05)`;
    card.style.transition = 'transform 0.1s'; 
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'; 
  };

  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo" onClick={() => window.scrollTo(0,0)}>
            <div className="logo-icon">
              {/* Ensure this path matches your new logo file */}
              <img src="/images/logo.png" alt="The Kamakshi Logo" />
            </div>
          </div>
          <div className="nav-links">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#categories" className="nav-link">Categories</a>
            <div className="nav-buttons">
              <button onClick={() => navigate('/candidate-registration')} className="nav-btn candidate-nav-btn">
                Find Work
              </button>
              <button onClick={() => navigate('/company-registration')} className="nav-btn company-nav-btn">
                Hire Talent
              </button>
            </div>
          </div>
          <div className="mobile-menu">
            <span>☰</span>
          </div>
        </div>
      </nav>

      <section id="home" className="hero-section-home"> 
        <div className="hero-content">
          <div className="hero-text">
            <EarlyBirdMarquee />
            <div className="badge">🏆 MP's Most Trusted Platform</div>
            {/* <h1>
              <span className="gradient-text">Your Perfect Career</span>
              <br />
              Match Awaits You
            </h1> */}

            <h1 className="aesthetic-handwritten-title">
        Your Perfect Career
        <br />
        <span className="marker-wrapper">
          <span className="handwritten-word">Match</span>
          
          {/* The Handwritten Circle/Highlight SVG */}
          <svg className="hand-drawn-highlight" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
            <motion.path 
              d="M10,30 Q90,5 180,25 T190,40" // A subtle arc
              fill="none" 
              stroke="#FF8C00" 
              strokeWidth="5" 
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
            />
          </svg>
        </span>
        {' '}Awaits You
      </h1>
            
            <p className="hero-subtitle">
              Connecting skilled professionals from all fields with the best opportunities across Madhya Pradesh. 
            </p>
            <div className="hero-buttons">
              <button onClick={() => navigate('/candidate-registration')} className="hero-btn primary-btn">
                Find Perfect Opportunity
              </button>
              <button onClick={() => navigate('/company-registration')} className="hero-btn secondary-btn">
                Find Skilled Professionals
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat"><h3>5,000+</h3><p>Professionals</p></div>
              <div className="stat"><h3>20+</h3><p>Partner Organizations</p></div>
              <div className="stat"><h3>5+</h3><p>Cities Covered</p></div>
              <div className="stat"><h3>94%</h3><p>Success Rate</p></div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Trusted By Section */}
      <AnimatedSection>
        <section className="trusted-section-modern">
          <div className="container">
            <p className="trusted-label">Trusted by organizations across all sectors</p>
            <div className="logo-ticker-wrap">
              <div className="logo-ticker">
                {[...trustLogos, ...trustLogos].map((sector, index) => (
                  <div key={index} className="logo-item">
                    <span>{sector}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="registration-section">
          <div className="container">
            <div className="section-header">
              <h2>Begin Your Success Story</h2>
              <p className="section-subtitle">Join thousands of professionals and organizations growing together</p>
            </div>
            <div className="registration-layout">
              {/* Panel 1: Professionals */}
              <div className="info-panel candidate-panel">
                <div className="panel-content">
                  <h3>For Professionals</h3>
                  <p>Discover opportunities that match your skills and aspirations across all industries.</p>
                  <button onClick={() => navigate('/candidate-registration')} className="reg-btn candidate-btn">
                    Register as Professional
                  </button>
                </div>
                <div className="panel-graphic">
                   <img src="/images/proffessional.jpg" alt="Professionals" loading="lazy" />
                </div>
              </div>

              {/* Panel 2: Organizations */}
              <div className="info-panel company-panel">
                <div className="panel-content">
                  <h3>For Organizations</h3>
                  <p>Find reliable, skilled professionals for all your staffing needs across departments.</p>
                  <button onClick={() => navigate('/company-registration')} className="reg-btn company-btn">
                    Register as Organization
                  </button>
                </div>
                <div className="panel-graphic">
                  <img src="/images/Organizations.jpg" alt="Organizations" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Job Categories (OPTIMIZED FOR SPEED) */}
      <AnimatedSection>
        <section id="categories" className="categories-section">
          <div className="container">
            <div className="section-header">
              <h2>Explore All Job Categories</h2>
              <p className="section-subtitle">Find opportunities across diverse fields and industries</p>
            </div>
            
            <div className="categories-grid">
              {jobCategories.map((category, index) => (
                <div key={index} className="category-card">
                  <div className="category-card-inner">
                    {/* OPTIMIZATION: Using actual img tag with lazy loading instead of background-image */}
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="category-bg-image"
                      loading="lazy" 
                      decoding="async"
                    />
                    <div className="category-overlay"></div>
                    <div className="category-card-content" style={{ color: "#fff" }}>
                      <h4>{category.name}</h4>
                      <p>{category.jobs} Open Positions</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>
  
      {/* About Section */}
      <AnimatedSection>
        <section id="about" className="about-sectionhome">
          <div className="container">
            <div className="about-content">
              <div className="about-text">
                <h2>About The Kamakshi</h2>
                <p>A platform built for small businesses, local vendors and service providers — jaha har kaam hota hai transparency, trust aur responsibility ke saath.</p>
                <div className="about-stats">
                  <div className="about-stat"><h3>5000+</h3><p>Professionals</p></div>
                  <div className="about-stat"><h3>50+</h3><p>Industry Categories</p></div>
                  <div className="about-stat"><h3>5+ Cities</h3><p>Across MP</p></div>
                </div>
                <p>We understand that every professional has unique skills and every organization has specific needs. Our platform is designed to create meaningful connections.</p>
              </div>
              <div className="about-visual">
                <div className="about-card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                  <h4>Our Mission</h4>
                  <p>Hamara Aim he Ki Ek Primary System ke sath Small businesses, Local vendors, Freelancers, Daily service providers, and Households ko Sath Lekar kaam Kar Sake..!!.</p>
                </div>
                <div className="about-card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                  <h4>Our Vision</h4>
                  <p>To build India’s most trusted, transparent and system-based multi-service empire for local businesses.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <footer className="footer">
          <div className="container footer-container">
            <div className="footer-branding">
              <div className="footer-logo-box">
                <img src="/images/logo.png" alt="The Kamakshi Logo" className="footer-logo-img"/>
              </div>
              <p>Connecting talent with opportunities across Madhya Pradesh. Your trusted partner in employment solutions.</p>
              <div className="social-links">
                {['📘', '🐦', '📷', '💼'].map((icon, index) => (
                  <div key={index} className="social-icon">{icon}</div>
                ))}
              </div>
            </div>
  
            <div className="footer-contact-details">
              <h3>Get In Touch</h3>
              <div className="footer-contact-item">
                <div className="footer-contact-icon">📧</div>
                <div><h4>Email Us</h4><p>shreeshivay2024@gmail.com</p></div>
              </div>
              <div className="footer-contact-item">
                <div className="footer-contact-icon">📞</div>
                <div><h4>Call Us</h4><p>+91 8982056665</p></div>
              </div>
              <div className="footer-contact-item">
                <div className="footer-contact-icon">🏢</div>
                <div><h4>Visit Us</h4><p>19, Sapna Sangeeta, indore (Mp) Pin - 452001</p></div>
              </div>
              <div className="footer-contact-item">
                <div className="footer-contact-icon">🕒</div>
                <div><h4>Working Hours</h4><p>Mon - Sat: 9:00 AM - 7:00 PM</p></div>
              </div>
            </div>
            
            <div className="footer-cta">
              <h3>Have Questions?</h3>
              <p>Our team is ready to help you. Reach out to us directly for a fast response.</p>
              <a href="https://wa.me/918982056665" target="_blank" rel="noopener noreferrer" className="cta-btn whatsapp-btn">
                <i className="fa-brands fa-whatsapp"></i> Contact Us on WhatsApp
              </a>
            </div>
          </div>
         <LegalSection 
      activeTab={activeLegal} 
      onClose={() => setActiveLegal(null)} 
    />

    <div className="footer-bottom">
      <div className="container">
        <p>&copy; 2025 The Kamakshi. All rights reserved.</p>
        <div className="footer-links">
          {/* UPDATED: Buttons instead of Links */}
          <button 
            className={`legal-link-btn ${activeLegal === 'privacy' ? 'active' : ''}`}
            onClick={() => handleLegalToggle('privacy')}
          >
            Privacy Policy
          </button>
          <span className="separator">|</span>
          <button 
            className={`legal-link-btn ${activeLegal === 'terms' ? 'active' : ''}`}
            onClick={() => handleLegalToggle('terms')}
          >
            Terms of Service
          </button>
          <span className="separator">|</span>
          <button 
            className={`legal-link-btn ${activeLegal === 'cookies' ? 'active' : ''}`}
            onClick={() => handleLegalToggle('cookies')}
          >
            Cookie Policy
          </button>
        </div>
      </div>
    </div>
  </footer>
</AnimatedSection>
    </div>
  );
};

export default HomePage;