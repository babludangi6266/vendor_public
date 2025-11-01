import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo">
            <div className="logo-icon">🤝</div>
            <span>WorkForce Connect</span>
          </div>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
            <div className="nav-buttons">
              <button 
                onClick={() => navigate('/candidate-registration')}
                className="nav-btn candidate-nav-btn"
              >
                Find Work
              </button>
              <button 
                onClick={() => navigate('/company-registration')}
                className="nav-btn company-nav-btn"
              >
                Hire Talent
              </button>
            </div>
          </div>
          <div className="mobile-menu">
            <span>☰</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <div className="badge">🏆 MP's Most Trusted Platform</div>
            <h1>
              <span className="gradient-text">Your Perfect Career</span>
              <br />
              Match Awaits You
            </h1>
            <p className="hero-subtitle">
              Connecting skilled professionals from all fields with the best opportunities across Madhya Pradesh. 
              From healthcare to hospitality, construction to customer service - find your perfect match.
            </p>
            <div className="hero-buttons">
              <button 
                onClick={() => navigate('/candidate-registration')}
                className="hero-btn primary-btn"
              >
                Find Perfect Opportunity
              </button>
              <button 
                onClick={() => navigate('/company-registration')}
                className="hero-btn secondary-btn"
              >
                Find Skilled Professionals
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <h3>15,000+</h3>
                <p>Professionals</p>
              </div>
              <div className="stat">
                <h3>800+</h3>
                <p>Partner Organizations</p>
              </div>
              <div className="stat">
                <h3>25+</h3>
                <p>Cities Covered</p>
              </div>
              <div className="stat">
                <h3>94%</h3>
                <p>Success Rate</p>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-elements">
              <div className="floating-card candidate">
                <div className="card-avatar">👨‍🏭</div>
                <div className="card-content">
                  <h4>Construction</h4>
                  <p>Skilled Workers</p>
                  <span className="success-badge">200+ Hired</span>
                </div>
              </div>
              <div className="floating-card company">
                <div className="card-avatar">🏥</div>
                <div className="card-content">
                  <h4>Healthcare</h4>
                  <p>Medical Staff</p>
                  <span className="rating">⭐ 4.9/5</span>
                </div>
              </div>
              <div className="floating-card job">
                <div className="card-avatar">🏨</div>
                <div className="card-content">
                  <h4>Hospitality</h4>
                  <p>Service Staff</p>
                  <span className="hot-badge">🔥 50+ Openings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="trusted-section">
        <div className="container">
          <p className="trusted-label">Trusted by organizations across all sectors</p>
          <div className="company-logos">
            {['Healthcare', 'Hospitality', 'Construction', 'Retail', 'Education', 'Manufacturing', 'Logistics', 'Services'].map((sector, index) => (
              <div key={index} className="company-logo">
                {sector}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Options */}
      <section className="registration-section">
        <div className="container">
          <div className="section-header">
            <h2>Begin Your Success Story</h2>
            <p className="section-subtitle">
              Join thousands of professionals and hundreds of organizations growing together
            </p>
          </div>
          
          <div className="registration-cards">
            <div className="reg-card candidate-card">
              <div className="card-glow"></div>
              <div className="card-icon">🌟</div>
              <h3>For Professionals</h3>
              <p>Discover opportunities that match your skills and aspirations across all industries</p>
              <ul className="benefits-list">
                <li>✓ Opportunities in 50+ categories</li>
                <li>✓ Verified organizations</li>
                <li>✓ Free skill development</li>
                <li>✓ Quick application process</li>
                <li>✓ Career guidance</li>
                <li>✓ Flexible work options</li>
              </ul>
              <button 
                onClick={() => navigate('/candidate-registration')}
                className="reg-btn candidate-btn"
              >
                Register as Professional
              </button>
            </div>

            <div className="reg-card company-card">
              <div className="card-glow"></div>
              <div className="card-icon">🏢</div>
              <h3>For Organizations</h3>
              <p>Find reliable, skilled professionals for all your staffing needs across departments</p>
              <ul className="benefits-list">
                <li>✓ Pre-screened candidates</li>
                <li>✓ All skill categories</li>
                <li>✓ Bulk hiring solutions</li>
                <li>✓ Dedicated HR support</li>
                <li>✓ Background verification</li>
                <li>✓ Quick hiring process</li>
              </ul>
              <button 
                onClick={() => navigate('/company-registration')}
                className="reg-btn company-btn"
              >
                Register as Organization
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Explore All Job Categories</h2>
            <p className="section-subtitle">Find opportunities across diverse fields and industries</p>
          </div>
          <div className="categories-grid">
            {[
              { icon: '🏭', name: 'Manufacturing', jobs: '1.2K' },
              { icon: '🏥', name: 'Healthcare', jobs: '800+' },
              { icon: '🏨', name: 'Hospitality', jobs: '950+' },
              { icon: '🛒', name: 'Retail', jobs: '1.5K' },
              { icon: '👷', name: 'Construction', jobs: '2.1K' },
              { icon: '🚚', name: 'Logistics', jobs: '750+' },
              { icon: '📞', name: 'Customer Service', jobs: '600+' },
              { icon: '🎓', name: 'Education', jobs: '500+' },
              { icon: '💼', name: 'Administration', jobs: '900+' },
              { icon: '🔧', name: 'Technical Services', jobs: '1.1K' },
              { icon: '🍳', name: 'Food Services', jobs: '700+' },
              { icon: '🛡️', name: 'Security', jobs: '400+' }
            ].map((category, index) => (
              <div key={index} className="category-card">
                <div className="category-icon">{category.icon}</div>
                <h4>{category.name}</h4>
                <p>{category.jobs} Open Positions</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose WorkForce Connect?</h2>
            <p className="section-subtitle">We make connecting talent with opportunity simple and effective</p>
          </div>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🔍</div>
              <h4>Smart Matching</h4>
              <p>Our intelligent system matches your skills with the perfect opportunities</p>
            </div>
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <h4>Quick Hiring</h4>
              <p>Reduce hiring time by up to 70% with our streamlined process</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🛡️</div>
              <h4>Verified Profiles</h4>
              <p>All professionals and organizations are thoroughly verified for trust</p>
            </div>
            <div className="feature">
              <div className="feature-icon">💬</div>
              <h4>24/7 Support</h4>
              <p>Dedicated support team available round the clock for assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>About WorkForce Connect</h2>
              <p>
                WorkForce Connect is Madhya Pradesh's leading platform dedicated to bridging the gap between 
                skilled professionals and organizations across all sectors. Founded with the vision of 
                transforming the employment landscape in Central India.
              </p>
              <div className="about-stats">
                <div className="about-stat">
                  <h3>3+ Years</h3>
                  <p>Of Excellence</p>
                </div>
                <div className="about-stat">
                  <h3>50+</h3>
                  <p>Industry Categories</p>
                </div>
                <div className="about-stat">
                  <h3>25 Cities</h3>
                  <p>Across MP</p>
                </div>
              </div>
              <p>
                We understand that every professional has unique skills and every organization has 
                specific needs. Our platform is designed to create meaningful connections that drive 
                growth and success for all.
              </p>
            </div>
            <div className="about-visual">
              <div className="about-card">
                <h4>Our Mission</h4>
                <p>To empower professionals and organizations by creating efficient, reliable employment connections across Madhya Pradesh.</p>
              </div>
              <div className="about-card">
                <h4>Our Vision</h4>
                <p>To become the most trusted employment platform in Central India, known for quality matches and exceptional service.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Comprehensive Services</h2>
            <p className="section-subtitle">End-to-end solutions for all your employment needs</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🎯</div>
              <h4>Job Matching</h4>
              <p>Intelligent matching of professionals with suitable opportunities based on skills, experience, and preferences</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📋</div>
              <h4>Staffing Solutions</h4>
              <p>Complete staffing services for organizations - temporary, permanent, and contract-based hiring</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🎓</div>
              <h4>Skill Development</h4>
              <p>Training and upskilling programs to enhance employability and career growth</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🛡️</div>
              <h4>Background Verification</h4>
              <p>Thorough verification of candidates and organizations to ensure trust and reliability</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>Success Stories</h2>
            <p className="section-subtitle">Hear from professionals and organizations who found success with us</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                "WorkForce Connect helped me find a stable job in the manufacturing sector within days. The process was smooth and the support team was very helpful."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍🏭</div>
                <div className="author-info">
                  <h5>Rajesh Kumar</h5>
                  <p>Production Supervisor</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                "As a hospital administrator, finding qualified healthcare staff was always challenging. WorkForce Connect provided us with pre-screened, reliable professionals."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👩‍⚕️</div>
                <div className="author-info">
                  <h5>Dr. Priya Sharma</h5>
                  <p>Hospital Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2>Get In Touch</h2>
            <p className="section-subtitle">We're here to help you find the perfect match</p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div>
                  <h4>Email Us</h4>
                  <p>support@workforceconnect.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <h4>Call Us</h4>
                  <p>+91 789 456 1230</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">🏢</div>
                <div>
                  <h4>Visit Us</h4>
                  <p>123 Business Plaza, Indore, Madhya Pradesh</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">🕒</div>
                <div>
                  <h4>Working Hours</h4>
                  <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <h4>Send us a Message</h4>
              <form>
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
                <textarea placeholder="Your Message" rows="4"></textarea>
                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="logo">
                <div className="logo-icon">🤝</div>
                <span>WorkForce Connect</span>
              </div>
              <p>Connecting talent with opportunities across Madhya Pradesh and beyond. Your trusted partner in employment solutions.</p>
              <div className="social-links">
                {['📘', '🐦', '📷', '💼'].map((icon, index) => (
                  <div key={index} className="social-icon">{icon}</div>
                ))}
              </div>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <a href="#home">Home</a>
              <a href="#about">About Us</a>
              <a href="#services">Services</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-section">
              <h4>For Professionals</h4>
                            <a href="#">Browse Jobs</a>
              <a href="#">Career Resources</a>
              <a href="#">Skill Development</a>
              <a href="#">Success Stories</a>
            </div>
            <div className="footer-section">
              <h4>For Organizations</h4>
              <a href="#">Post Requirements</a>
              <a href="#">Browse Talent</a>
              <a href="#">Hiring Solutions</a>
              <a href="#">Pricing Plans</a>
            </div>
            <div className="footer-section">
              <h4>Contact Info</h4>
              <p>📧 support@workforceconnect.com</p>
              <p>📞 +91 789 456 1230</p>
              <p>🏢 123 Business Plaza, Indore, MP</p>
              <div className="newsletter">
                <h5>Newsletter</h5>
                <div className="newsletter-input">
                  <input type="email" placeholder="Your email" />
                  <button>→</button>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 WorkForce Connect. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;