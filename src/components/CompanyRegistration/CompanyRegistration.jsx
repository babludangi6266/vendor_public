import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { companyAPI } from '../../services/api';
import LanguageSwitcher from '../common/LanguageSwitcher';
import './CompanyRegistration.css';

const CompanyRegistration = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    mobile: '',
    email: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    },
    categories: [],
    candidateQuantity: '',
    experience: {
      years: '',
      months: '',
      days: ''
    },
    jobLocation: {
      city: '',
      state: ''
    },
    businessDocument: null
  });

  // COMMENTED: OTP states - set OTP verified to true by default for testing
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(true); // Set to true to bypass OTP
  const [documentPreview, setDocumentPreview] = useState(null);

  const categories = [
    'office_work', 'accounts', 'telecalling', 'marketing_work', 
    'cook_staff', 'plumber', 'electrician', 'painter', 'driver',
    'event_work', 'security_service', 'labour_work', 'construction_work',
    'pandit_ji_poojan', 'other_work'
  ];

  // Validation functions
  const validateMobile = (mobile) => {
    return /^[6-9]\d{9}$/.test(mobile);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePincode = (pincode) => {
    return /^\d{6}$/.test(pincode);
  };

  const validateExperience = (experience) => {
    const years = parseInt(experience.years) || 0;
    const months = parseInt(experience.months) || 0;
    const days = parseInt(experience.days) || 0;
    
    if (months > 11) {
      toast.error('Months cannot be more than 11');
      return false;
    }
    if (days > 30) {
      toast.error('Days cannot be more than 30');
      return false;
    }
    return true;
  };

  const validateStep1 = () => {
    if (!formData.companyName.trim()) {
      toast.error('Please enter company name');
      return false;
    }
    if (!formData.contactPerson.trim()) {
      toast.error('Please enter contact person name');
      return false;
    }
    if (!validateMobile(formData.mobile)) {
      toast.error('Please enter a valid 10-digit mobile number starting with 6-9');
      return false;
    }
    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.address.street.trim()) {
      toast.error('Please enter street address');
      return false;
    }
    if (!formData.address.city.trim()) {
      toast.error('Please enter city');
      return false;
    }
    if (!formData.address.state.trim()) {
      toast.error('Please enter state');
      return false;
    }
    if (!validatePincode(formData.address.pincode)) {
      toast.error('Please enter valid 6-digit pincode');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.categories || formData.categories.length === 0) {
      toast.error('Please select at least one category');
      return false;
    }
    if (!formData.candidateQuantity || formData.candidateQuantity < 1) {
      toast.error('Please enter valid candidate quantity (minimum 1)');
      return false;
    }
    if (!validateExperience(formData.experience)) {
      return false;
    }
    if (!formData.jobLocation.city.trim()) {
      toast.error('Please enter job location city');
      return false;
    }
    if (!formData.jobLocation.state.trim()) {
      toast.error('Please enter job location state');
      return false;
    }
    if (!formData.businessDocument) {
      toast.error('Please upload business document');
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      if (file) {
        // Validate file size (2MB max)
        if (file.size > 2 * 1024 * 1024) {
          toast.error('File size should be less than 2MB');
          return;
        }
        // Validate file type
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
          toast.error('Please upload PDF, JPG, or PNG files only');
          return;
        }
        
        setFormData(prev => ({ ...prev, [name]: file }));
        
        // Create preview for images
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => setDocumentPreview(e.target.result);
          reader.readAsDataURL(file);
        } else {
          setDocumentPreview(null);
        }
        
        toast.success('Document uploaded successfully!');
      }
    } else if (name === 'categories') {
      const updatedCategories = checked 
        ? [...(formData.categories || []), value]
        : (formData.categories || []).filter(cat => cat !== value);
      setFormData(prev => ({ ...prev, categories: updatedCategories }));
    } else if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [field]: value }
      }));
    } else if (name.startsWith('experience.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        experience: { ...prev.experience, [field]: value }
      }));
    } else if (name.startsWith('jobLocation.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        jobLocation: { ...prev.jobLocation, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // COMMENTED: OTP functionality - keeping but bypassing
  const handleSendOtp = async () => {
    if (!validateMobile(formData.mobile)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    setOtpLoading(true);
    try {
      console.log('OTP functionality commented for testing');
      setOtpSent(true);
      toast.info('OTP functionality is temporarily disabled. You can proceed.');
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (formData.otp && formData.otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setOtpLoading(true);
    try {
      console.log('OTP verification commented for testing');
      setOtpVerified(true);
      toast.success('OTP verified successfully!');
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  const removeDocument = () => {
    setFormData(prev => ({ ...prev, businessDocument: null }));
    setDocumentPreview(null);
    toast.info('Document removed');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      return;
    }

    setLoading(true);
    
    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('companyName', formData.companyName);
      submitData.append('contactPerson', formData.contactPerson);
      submitData.append('mobile', formData.mobile);
      submitData.append('email', formData.email);
      
      // Send address as individual fields
      submitData.append('address[street]', formData.address.street);
      submitData.append('address[city]', formData.address.city);
      submitData.append('address[state]', formData.address.state);
      submitData.append('address[pincode]', formData.address.pincode);
      
      // Send categories as individual fields (not JSON string)
      formData.categories.forEach((category, index) => {
        submitData.append(`categories[${index}]`, category);
      });
      
      submitData.append('candidateQuantity', formData.candidateQuantity);
      
      // Send experience as individual fields
      submitData.append('experience[years]', formData.experience.years || '0');
      submitData.append('experience[months]', formData.experience.months || '0');
      submitData.append('experience[days]', formData.experience.days || '0');
      
      // Send jobLocation as individual fields
      submitData.append('jobLocation[city]', formData.jobLocation.city);
      submitData.append('jobLocation[state]', formData.jobLocation.state);
      
      submitData.append('businessDocument', formData.businessDocument);

      console.log('Submitting company data to backend...', {
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        mobile: formData.mobile,
        categories: formData.categories,
        jobLocation: formData.jobLocation
      });

      // Show loading toast
      const loadingToast = toast.loading('Submitting company registration...');

      // ACTUAL API CALL
      const response = await companyAPI.register(submitData);

      toast.dismiss(loadingToast);

      if (response.data.success) {
        toast.success('Company registration successful! Redirecting to home page...');
        
        // Reset form
        setFormData({
          companyName: '',
          contactPerson: '',
          mobile: '',
          email: '',
          address: {
            street: '',
            city: '',
            state: '',
            pincode: ''
          },
          categories: [],
          candidateQuantity: '',
          experience: {
            years: '',
            months: '',
            days: ''
          },
          jobLocation: {
            city: '',
            state: ''
          },
          businessDocument: null
        });
        setDocumentPreview(null);
        
        setTimeout(() => navigate('/'), 3000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors.map(err => err.msg).join(', ');
        errorMessage = `Validation failed: ${errorMessages}`;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage = 'Backend server is not running. Please start the backend server.';
      } else if (error.message === 'Network Error') {
        errorMessage = 'Network error. Please check your internet connection.';
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (!validateStep1()) {
      return;
    }
    
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="company-registration">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className="registration-container">
        <div className="registration-header">
          <LanguageSwitcher />
          <h1>{t('company_title')}</h1>
          <p>{t('company_subtitle')}</p>
          
          {/* Information banner about OTP being disabled */}
          <div className="info-banner">
            <span>ℹ️ OTP verification is temporarily disabled for testing</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <span>{t('personal_info')}</span>
          </div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <span>{t('professional_info')}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="registration-form">
          {/* Step 1: Company Profile */}
          {step === 1 && (
            <div className="form-step">
              <h2>{t('personal_info')}</h2>
              
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>{t('company_name')} *</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    placeholder={t('company_name')}
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>{t('contact_person')} *</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    required
                    placeholder={t('contact_person')}
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>{t('mobile')} *</label>
                  <div className="mobile-input-group">
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                      placeholder={t('mobile')}
                      pattern="[6-9][0-9]{9}"
                      maxLength="10"
                      disabled={loading}
                    />
                    {/* COMMENTED: OTP button - showing but with disabled functionality */}
                    <button 
                      type="button" 
                      className="otp-btn"
                      onClick={handleSendOtp}
                      disabled={!validateMobile(formData.mobile) || loading}
                    >
                      {otpLoading ? 'Sending...' : 'Send OTP (Disabled)'}
                    </button>
                  </div>
                  <p className="helper-text">OTP verification is temporarily disabled</p>
                </div>

                {otpVerified && (
                  <div className="success-badge">
                    ✓ Mobile verification bypassed for testing
                  </div>
                )}

                <div className="form-group">
                  <label>{t('email')} *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder={t('email')}
                    disabled={loading}
                  />
                </div>

                <div className="form-group full-width">
                  <label>{t('street_address')} *</label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleInputChange}
                    required
                    placeholder={t('street_address')}
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>{t('city')} *</label>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    required
                    placeholder={t('city')}
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>{t('state')} *</label>
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleInputChange}
                    required
                    placeholder={t('state')}
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>{t('pincode')} *</label>
                  <input
                    type="text"
                    name="address.pincode"
                    value={formData.address.pincode}
                    onChange={handleInputChange}
                    required
                    placeholder={t('pincode')}
                    pattern="[0-9]{6}"
                    maxLength="6"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="next-btn" 
                  onClick={nextStep}
                  disabled={loading}
                >
                  {t('next')}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Business Needs & Documents */}
          {step === 2 && (
            <div className="form-step">
              <h2>{t('professional_info')}</h2>
              
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>{t('required_categories')} *</label>
                  <div className="categories-grid">
                    {categories.map(category => (
                      <label key={category} className="category-checkbox">
                        <input
                          type="checkbox"
                          name="categories"
                          value={category}
                          checked={(formData.categories || []).includes(category)}
                          onChange={handleInputChange}
                          disabled={loading}
                        />
                        <span className="checkmark"></span>
                        {t(category)}
                      </label>
                    ))}
                  </div>
                  <p className="helper-text">Selected: {formData.categories.length} categories</p>
                </div>

                <div className="form-group">
                  <label>{t('candidate_quantity')} *</label>
                  <input
                    type="number"
                    name="candidateQuantity"
                    value={formData.candidateQuantity}
                    onChange={handleInputChange}
                    required
                    placeholder={t('candidate_quantity')}
                    min="1"
                    disabled={loading}
                  />
                </div>

                <div className="form-group full-width">
                  <h4>{t('experience_required')} (Optional)</h4>
                  <div className="experience-fields">
                    <div className="exp-field">
                      <label>{t('years')}</label>
                      <input
                        type="number"
                        name="experience.years"
                        value={formData.experience.years}
                        onChange={handleInputChange}
                        placeholder="0"
                        min="0"
                        max="50"
                        disabled={loading}
                      />
                    </div>
                    <div className="exp-field">
                      <label>{t('months')}</label>
                      <input
                        type="number"
                        name="experience.months"
                        value={formData.experience.months}
                        onChange={handleInputChange}
                        placeholder="0"
                        min="0"
                        max="11"
                        disabled={loading}
                      />
                    </div>
                    <div className="exp-field">
                      <label>{t('days')}</label>
                      <input
                        type="number"
                        name="experience.days"
                        value={formData.experience.days}
                        onChange={handleInputChange}
                        placeholder="0"
                        min="0"
                        max="30"
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <p className="helper-text">Enter experience requirements if any</p>
                </div>

                <div className="form-group">
                  <label>{t('job_location_city')} *</label>
                  <input
                    type="text"
                    name="jobLocation.city"
                    value={formData.jobLocation.city}
                    onChange={handleInputChange}
                    required
                    placeholder={t('job_location_city')}
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>{t('job_location_state')} *</label>
                  <input
                    type="text"
                    name="jobLocation.state"
                    value={formData.jobLocation.state}
                    onChange={handleInputChange}
                    required
                    placeholder={t('job_location_state')}
                    disabled={loading}
                  />
                </div>

                <div className="form-group full-width">
                  <label>{t('business_document')} *</label>
                  <div className="document-upload-section">
                    {formData.businessDocument ? (
                      <div className="document-preview">
                        <div className="document-info">
                          <span className="document-name">
                            📄 {formData.businessDocument.name}
                          </span>
                          <span className="document-size">
                            ({(formData.businessDocument.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <div className="document-actions">
                          <button 
                            type="button" 
                            className="change-document-btn"
                            onClick={() => document.querySelector('input[name="businessDocument"]').click()}
                            disabled={loading}
                          >
                            Change Document
                          </button>
                          <button 
                            type="button" 
                            className="remove-document-btn"
                            onClick={removeDocument}
                            disabled={loading}
                          >
                            Remove
                          </button>
                        </div>
                        {documentPreview && (
                          <div className="document-image-preview">
                            <img src={documentPreview} alt="Document preview" />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="document-upload">
                        <input
                          type="file"
                          name="businessDocument"
                          onChange={handleInputChange}
                          accept=".pdf,.jpg,.jpeg,.png"
                          required
                          disabled={loading}
                          hidden
                          id="business-document-upload"
                        />
                        <label htmlFor="business-document-upload" className="upload-label">
                          <div className="upload-box">
                            <span className="upload-icon">📁</span>
                            <span>Upload Business Document</span>
                          </div>
                        </label>
                        <div className="upload-info">
                          <p className="helper-text">
                            Supported formats: PDF, JPG, PNG (Max 2MB)
                          </p>
                          <p className="helper-text">
                            Upload company registration, GST, or business license
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="policy-section">
                <h3>Terms & Conditions</h3>
                <div className="policy-content">
                  <p>
                    By submitting this registration, you agree to our terms and conditions. 
                    Your company information will be used for candidate matching purposes only. 
                    We ensure the confidentiality of your business documents and information.
                  </p>
                </div>
                <label className="policy-checkbox">
                  <input type="checkbox" required disabled={loading} />
                  <span>I have read and agree to the terms and conditions</span>
                </label>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="prev-btn" 
                  onClick={prevStep}
                  disabled={loading}
                >
                  {t('previous')}
                </button>
                <button 
                  type="submit" 
                  className="submit-btn" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="button-spinner"></div>
                      Submitting Registration...
                    </>
                  ) : (
                    'Complete Registration'
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanyRegistration;
