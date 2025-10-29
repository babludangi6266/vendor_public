import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { vendorAPI } from '../services/api';
import LanguageSwitcher from './LanguageSwitcher';
import './VendorForm.css';

const VendorForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    address: '',
    serviceCategory: '',
    rate: '',
    rateType: 'hourly',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const serviceCategories = [
    'electrician',
    'plumber',
    'carpenter',
    'cleaner',
    'painter',
    'technician',
    'gardener',
    'mason',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const submitData = {
        ...formData,
        rate: formData.rate ? parseFloat(formData.rate) : undefined,
      };

      const response = await vendorAPI.register(submitData);

      if (response.data.success) {
        setMessage({ type: 'success', text: t('success') });
        setFormData({
          name: '',
          contact: '',
          email: '',
          address: '',
          serviceCategory: '',
          rate: '',
          rateType: 'hourly',
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || t('error'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vendor-form-container">
      <div className="form-wrapper">
        <LanguageSwitcher />

        <div className="form-header">
          <h1>{t('title')}</h1>
          <p>{t('subtitle')}</p>
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="vendor-form">
          {/* ---------- Personal Information ---------- */}
          <div className="form-section">
            <h3>{t('personalInfo')}</h3>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">{t('fullName')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={t('phName')}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact">{t('contact')}</label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  placeholder={t('phContact')}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">{t('email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('phEmail')}
                  disabled={loading}
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="address">{t('address')}</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder={t('phAddress')}
                  rows="3"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* ---------- Service Information ---------- */}
          <div className="form-section">
            <h3>{t('serviceInfo')}</h3>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="serviceCategory">{t('serviceCategory')}</label>
                <select
                  id="serviceCategory"
                  name="serviceCategory"
                  value={formData.serviceCategory}
                  onChange={handleChange}
                  required
                  disabled={loading}
                >
                  <option value="">{t('selectCategory')}</option>
                  {serviceCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="rateType">{t('rateType')}</label>
                <select
                  id="rateType"
                  name="rateType"
                  value={formData.rateType}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="hourly">{t('hourly')}</option>
                  <option value="per-job">{t('perJob')}</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="rate">{t('rate')}</label>
                <input
                  type="number"
                  id="rate"
                  name="rate"
                  value={formData.rate}
                  onChange={handleChange}
                  placeholder={t('phRate')}
                  min="0"
                  step="0.01"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className={`submit-btn ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="button-spinner"></div>
                  {t('submitting')}
                </>
              ) : (
                t('submit')
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorForm;