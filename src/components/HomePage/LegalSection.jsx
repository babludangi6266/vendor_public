
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LegalSection = ({ activeTab, onClose }) => {
  
  const content = {
    privacy: (
      <div className="legal-content">
        <h3>1. Privacy Policy</h3>
        <p><strong>Last Updated: January 2026</strong></p>
        <p>
          The Kamakshi (“Company”, “We”, “Us”) aapki personal information ka respect karti hai.
          Yeh Privacy Policy batati hai ki hum candidate aur client ka data kaise collect, use, store aur protect karte hain.
        </p>

        <h4>1.1 Data We Collect</h4>
        <ul>
          <li>Naam (Name)</li>
          <li>Mobile number</li>
          <li>Email address</li>
          <li>Resume / Qualification</li>
          <li>Experience details</li>
          <li>Job preferences</li>
          <li>Client company requirement details</li>
        </ul>

        <h4>1.2 How We Use Your Data</h4>
        <ul>
          <li>Aapko suitable job opportunities provide karne ke liye</li>
          <li>Client companies ko right candidates provide karne ke liye</li>
          <li>Communication (call, SMS, email) ke liye</li>
          <li>Verification aur background checking ke liye</li>
          <li>Service improvement ke liye</li>
        </ul>

        <h4>1.3 Data Sharing</h4>
        <ul>
          <li>Aapka resume aur details sirf un client companies ko share kiye jaate hain jahan job opportunity hoti hai.</li>
          <li>Hum aapka data kisi third-party ko bechne ya misuse karne ka kaam nahi karte.</li>
        </ul>

        <h4>1.4 Data Security</h4>
        <p>Hum reasonable digital security methods use karte hain jisse aapka data safe rahe. Lekin 100% online security guarantee nahi di ja sakti.</p>

        <h4>1.5 Your Rights</h4>
        <ul>
          <li>Apna data update karna</li>
          <li>Data delete karwane ka request</li>
          <li>Service discontinue karna</li>
        </ul>
      </div>
    ),
    terms: (
      <div className="legal-content">
        <h3>2. Terms & Conditions</h3>
        <p><strong>Last Updated: January 2026</strong></p>

        <h4>2.1 Services We Provide</h4>
        <ul>
          <li>Job placement services</li>
          <li>Client requirement ke hisaab se candidate supply</li>
          <li>Service sector ke kuch operational services</li>
        </ul>

        <h4>2.2 No Job Guarantee</h4>
        <p>Hum job opportunities provide karte hain, lekin selection company ki internal policy par depend karta hai. Isliye The Kamakshi job guarantee nahi deta.</p>

        <h4>2.3 Fees & Charges</h4>
        <ul>
          <li>Hum jo fees charge karte hain wo service-based hoti hai.</li>
          <li>Charges website ya agreement me clearly mention kiye jaate hain.</li>
        </ul>

        <h4>2.4 Candidate Responsibilities</h4>
        <ul>
          <li>Genuine information provide karna</li>
          <li>Fake documents submit na karna</li>
          <li>Interview time par attend karna</li>
        </ul>

        <h4>2.5 Client Responsibilities</h4>
        <ul>
          <li>Genuine job requirement provide karna</li>
          <li>Payment terms follow karna</li>
          <li>Candidate ko misuse na karna</li>
        </ul>

        <h4>2.6 Misuse of Website</h4>
        <p>Website ka misuse, spamming, fraud attempt, ya details leak karna strictly prohibited hai.</p>

        <hr style={{ borderColor: '#333', margin: '30px 0' }} />

        <h3>3. Refund & Cancellation Policy</h3>
        
        <h4>3.1 Refund Eligibility</h4>
        <p>Agar customer service se satisfied nahi hota, to:</p>
        <ul>
          <li>Charges ka refund specific time period ke baad diya ja sakta hai.</li>
          <li>Time period website ya agreement me mention rahega (example: 30 days, 60 days etc.).</li>
          <li>Refund sirf service-based hota hai, processing fees refundable nahi hoti.</li>
        </ul>

        <h4>3.2 No Immediate Refund</h4>
        <p>Instant or same-day refund available nahi hota.</p>

        <h4>3.3 Refund Denial Conditions</h4>
        <p>Refund nahi milega agar:</p>
        <ul>
          <li>Candidate ne fake documents diye</li>
          <li>Interview attend nahi kiya</li>
          <li>Company policy violate hui</li>
          <li>Misbehavior / fraud issue ho</li>
        </ul>

        <hr style={{ borderColor: '#333', margin: '30px 0' }} />

        <h3>4. Disclaimer</h3>
        <ul>
          <li>The Kamakshi job guarantee nahi deta.</li>
          <li>Hum sirf client aur candidate ko connect karne ka kaam karte hain.</li>
          <li>Selection company ki hiring policy, performance, background check aur vacancy availability par depend karta hai.</li>
          <li>Website par di gayi information general purpose ke liye hoti hai; kabhi-kabhi changes possible hain.</li>
        </ul>

        <hr style={{ borderColor: '#333', margin: '30px 0' }} />

        <h3>5. Contact / Grievance Redressal</h3>
        <p>Agar aapko koi shikayat ya sawal hai, to humse sampark karein:</p>
        <p><strong>The Kamakshi – Customer Support</strong></p>
        <p>Email: <a href="mailto:Thekamakshi2026@gmail.com" style={{color: '#3b82f6'}}>Thekamakshi2026@gmail.com</a></p>
        <p>Phone: +91 8982056665</p>
        <p>Address: 19, Sapna Sangeeta, Indore (MP) Pin - 452001</p>
      </div>
    ),
    cookies: (
      <div className="legal-content">
        <h3>Cookie Policy</h3>
        <p>We use essential cookies to keep you logged in and ensure the site functions correctly. We do not use intrusive tracking cookies.</p>
        <ul>
            <li><strong>Essential Cookies:</strong> Required for the website to work (e.g., login sessions).</li>
            <li><strong>Analytics:</strong> We may use anonymous data to improve user experience.</li>
        </ul>
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