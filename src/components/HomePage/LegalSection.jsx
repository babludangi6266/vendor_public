import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LegalSection = ({ activeTab, onClose }) => {
  // Define your legal content here
  const content = {
    privacy: (
      <div className="legal-content">
        <h3>Privacy Policy</h3>
        <p><strong>Last Updated: January 2026</strong></p>
        <p>The Kamakshi aapki personal information ka respect karti hai.
Yeh Privacy Policy batati hai ki hum candidate aur client ka data kaise collect, use, store aur protect karte hain.</p>
        <h4>1. Data We Collect</h4>
        <p>We collect information you provide directly to us when you register as a professional or organization. This includes contact details, employment history, and business requirements.</p>
        <h4>2. Data Usage</h4>
        <p>Your data is used solely to match professionals with opportunities. We do not sell your personal data to third-party advertisers.</p>
      </div>
    ),
    terms: (
      <div className="legal-content">
        <h3>Terms of Service</h3>
        <p><strong>Last Updated: January 2025</strong></p>
        <p>By using The Kamakshi platform, you agree to these terms.</p>
        <h4>1. User Conduct</h4>
        <p>Users must provide accurate information. Any fraudulent activity or misrepresentation of skills/jobs will result in immediate account termination.</p>
        <h4>2. Liability</h4>
        <p>The Kamakshi acts as a bridge between talent and employers. We are not responsible for the final employment contract terms settled between parties.</p>
      </div>
    ),
    cookies: (
        <div className="legal-content">
          <h3>Cookie Policy</h3>
          <p>We use essential cookies to keep you logged in and ensure the site functions correctly. We do not use intrusive tracking cookies.</p>
        </div>
      )
  };

  return (
    <AnimatePresence>
      {activeTab && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="legal-section-wrapper"
        >
          <div className="legal-container">
            <button onClick={onClose} className="close-legal-btn">
              &times; Close
            </button>
            <div className="legal-text-scroll">
              {content[activeTab]}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LegalSection;