import React, { useState } from 'react';
import { vendorAPI } from '../services/api';
import './VendorForm.css';

const VendorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    address: '',
    serviceCategory: '',
    rate: '',
    rateType: 'hourly'
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Service categories
  const serviceCategories = [
    'electrician',
    'plumber',
    'carpenter',
    'cleaner',
    'painter',
    'technician',
    'gardener',
    'mason'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Prepare data for API
      const submitData = {
        ...formData,
        rate: formData.rate ? parseFloat(formData.rate) : undefined
      };

      const response = await vendorAPI.register(submitData);
      
      if (response.data.success) {
        setMessage({
          type: 'success',
          text: response.data.message
        });
        
        // Reset form
        setFormData({
          name: '',
          contact: '',
          email: '',
          address: '',
          serviceCategory: '',
          rate: '',
          rateType: 'hourly'
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Registration failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vendor-form-container">
      <div className="form-wrapper">
        <div className="form-header">
          <h1>Vendor Registration</h1>
          <p>Join our workforce network and get connected with clients</p>
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="vendor-form">
          {/* Personal Information Section */}
          <div className="form-section">
            <h3>Personal Information</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact">Contact Number *</label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  placeholder="Enter your contact number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="address">Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Enter your complete address"
                  rows="3"
                />
              </div>
            </div>
          </div>

          {/* Service Information Section */}
          <div className="form-section">
            <h3>Service Information</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="serviceCategory">Service Category *</label>
                <select
                  id="serviceCategory"
                  name="serviceCategory"
                  value={formData.serviceCategory}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  {serviceCategories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="rateType">Rate Type</label>
                <select
                  id="rateType"
                  name="rateType"
                  value={formData.rateType}
                  onChange={handleChange}
                >
                  <option value="hourly">Hourly</option>
                  <option value="per-job">Per Job</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="rate">Rate (Optional)</label>
                <input
                  type="number"
                  id="rate"
                  name="rate"
                  value={formData.rate}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register as Vendor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorForm;