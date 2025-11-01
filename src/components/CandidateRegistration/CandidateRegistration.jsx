
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { candidateAPI } from '../../services/api';
//import  {qr-code} from '../../../public/images/qr-code.png';
import LanguageSwitcher from '../common/LanguageSwitcher';
import './CandidateRegistration.css';

const CandidateRegistration = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    otp: '',
    address: {
      villageTownCity: '',
      landmark: '',
      pincode: ''
    },
    photo: null,
    category: '',
    jobLocationCity: '',
    customCity: '',
    upiTransactionId: '',
    uidNumber: ''
  });

  // Camera and photo states
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(true);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const categories = [
    'office_work', 'accounts', 'telecalling', 'marketing_work', 
    'cook_staff', 'plumber', 'electrician', 'painter', 'driver',
    'event_work', 'security_service', 'labour_work', 'construction_work',
    'pandit_ji_poojan', 'other_work'
  ];

  const cities = ['indore', 'bhopal', 'sagar', 'ujjain', 'other'];

  // Validation functions
  const validateMobile = (mobile) => {
    return /^[6-9]\d{9}$/.test(mobile);
  };

  const validatePincode = (pincode) => {
    return /^\d{6}$/.test(pincode);
  };

  const validateUpiTransactionId = (transactionId) => {
    if (!transactionId) return true; // Optional field
    return /^[a-zA-Z0-9]{23}$/.test(transactionId);
  };

  const validateForm = (step) => {
    if (step === 1) {
      if (!formData.fullName.trim()) {
        toast.error('Please enter your full name');
        return false;
      }
      if (!validateMobile(formData.mobile)) {
        toast.error('Please enter a valid 10-digit mobile number starting with 6-9');
        return false;
      }
      if (!formData.address.villageTownCity.trim()) {
        toast.error('Please enter your village/town/city');
        return false;
      }
      if (!validatePincode(formData.address.pincode)) {
        toast.error('Please enter a valid 6-digit pincode');
        return false;
      }
    }

    if (step === 2) {
      if (!formData.category) {
        toast.error('Please select a job category');
        return false;
      }
      if (!formData.jobLocationCity) {
        toast.error('Please select a job location');
        return false;
      }
      if (formData.jobLocationCity === 'other' && !formData.customCity.trim()) {
        toast.error('Please enter your city name');
        return false;
      }
      if (!validateUpiTransactionId(formData.upiTransactionId)) {
        toast.error('UPI Transaction ID must be exactly 23 alphanumeric characters');
        return false;
      }
    }

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'photo') {
      const file = files[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          toast.error('File size should be less than 2MB');
          return;
        }
        if (!file.type.startsWith('image/')) {
          toast.error('Please upload an image file');
          return;
        }
        
        setFormData(prev => ({ ...prev, photo: file }));
        
        const reader = new FileReader();
        reader.onload = (e) => setPhotoPreview(e.target.result);
        reader.readAsDataURL(file);
      }
    } else if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Camera functionality
  const startCamera = async () => {
    setCameraLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
        toast.info('Camera started. Click "Capture Selfie" to take photo.');
      }
    } catch (error) {
      console.error('Camera error:', error);
      toast.error('Cannot access camera. Please check permissions and try again.');
    } finally {
      setCameraLoading(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const captureSelfie = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to blob
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
        
        // Update form data
        setFormData(prev => ({ ...prev, photo: file }));
        
        // Create preview
        const previewUrl = URL.createObjectURL(blob);
        setPhotoPreview(previewUrl);
        
        // Stop camera
        stopCamera();
        
        toast.success('Selfie captured successfully!');
      }
    }, 'image/jpeg', 0.8);
  };

  const removePhoto = () => {
    setFormData(prev => ({ ...prev, photo: null }));
    setPhotoPreview(null);
    if (photoPreview && photoPreview.startsWith('blob:')) {
      URL.revokeObjectURL(photoPreview);
    }
  };

  // OTP functionality (commented for testing)
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
    if (formData.otp.length !== 6) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm(1) || !validateForm(2)) {
      return;
    }

    setLoading(true);
    
    try {
      const submitData = new FormData();
      
      submitData.append('fullName', formData.fullName);
      submitData.append('mobile', formData.mobile);
      submitData.append('address[villageTownCity]', formData.address.villageTownCity);
      submitData.append('address[landmark]', formData.address.landmark || '');
      submitData.append('address[pincode]', formData.address.pincode);
      submitData.append('category', formData.category);
      submitData.append('jobLocationCity', formData.jobLocationCity);
      submitData.append('customCity', formData.customCity || '');
      submitData.append('upiTransactionId', formData.upiTransactionId || '');
      submitData.append('uidNumber', formData.uidNumber || '');
      
      if (formData.photo) {
        submitData.append('photo', formData.photo);
      }

      console.log('Submitting candidate data to backend...');

      // Show loading toast
      const loadingToast = toast.loading('Submitting registration...');

      const response = await candidateAPI.register(submitData);

      toast.dismiss(loadingToast);

      if (response.data.success) {
        toast.success('Registration successful! Redirecting to home page...');
        
        // Reset form
        setFormData({
          fullName: '',
          mobile: '',
          otp: '',
          address: {
            villageTownCity: '',
            landmark: '',
            pincode: ''
          },
          photo: null,
          category: '',
          jobLocationCity: '',
          customCity: '',
          upiTransactionId: '',
          uidNumber: ''
        });
        setPhotoPreview(null);
        
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
    if (!validateForm(step)) {
      return;
    }
    
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
    // Stop camera when going back
    if (isCameraActive) {
      stopCamera();
    }
  };

  // Cleanup camera on unmount
  React.useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (photoPreview && photoPreview.startsWith('blob:')) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  return (
    <div className="candidate-registration">
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
          <h1>{t('candidate_title')}</h1>
          <p>{t('candidate_subtitle')}</p>
          
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
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="form-step">
              <h2>{t('personal_info')}</h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>{t('full_name')} *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder={t('full_name')}
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

                <div className="form-group full-width">
                  <label>{t('village_town_city')} *</label>
                  <input
                    type="text"
                    name="address.villageTownCity"
                    value={formData.address.villageTownCity}
                    onChange={handleInputChange}
                    required
                    placeholder={t('village_town_city')}
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>{t('landmark')}</label>
                  <input
                    type="text"
                    name="address.landmark"
                    value={formData.address.landmark}
                    onChange={handleInputChange}
                    placeholder={t('landmark')}
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

                <div className="form-group full-width">
                  <label>{t('photo')}</label>
                  <div className="photo-upload-section">
                    {photoPreview ? (
                      <div className="photo-preview">
                        <img src={photoPreview} alt="Preview" />
                        <div className="photo-actions">
                          <button 
                            type="button" 
                            className="change-photo-btn"
                            onClick={() => document.getElementById('photo-upload').click()}
                            disabled={loading}
                          >
                            {t('change_photo')}
                          </button>
                          <button 
                            type="button" 
                            className="remove-photo-btn"
                            onClick={removePhoto}
                            disabled={loading}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="photo-upload-options">
                        <label className="upload-option">
                          <input
                            type="file"
                            id="photo-upload"
                            name="photo"
                            accept="image/*"
                            onChange={handleInputChange}
                            hidden
                            disabled={loading}
                          />
                          <div className="upload-box">
                            <span className="upload-icon">📁</span>
                            <span>{t('upload_photo')}</span>
                          </div>
                        </label>
                        
                        {!isCameraActive ? (
                          <button 
                            type="button" 
                            className="camera-btn"
                            onClick={startCamera}
                            disabled={loading || cameraLoading}
                          >
                            {cameraLoading ? (
                              <>
                                <div className="button-spinner small"></div>
                                Starting Camera...
                              </>
                            ) : (
                              <>
                                <span className="camera-icon">📷</span>
                                {t('take_selfie')}
                              </>
                            )}
                          </button>
                        ) : (
                          <div className="camera-active">
                            <div className="camera-preview">
                              <video 
                                ref={videoRef} 
                                autoPlay 
                                playsInline
                                className="camera-video"
                              />
                              <canvas ref={canvasRef} style={{ display: 'none' }} />
                            </div>
                            <div className="camera-controls">
                              <button 
                                type="button" 
                                className="capture-btn"
                                onClick={captureSelfie}
                                disabled={loading}
                              >
                                📸 Capture Selfie
                              </button>
                              <button 
                                type="button" 
                                className="cancel-camera-btn"
                                onClick={stopCamera}
                                disabled={loading}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="helper-text">File size should be less than 2MB (Optional)</p>
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

          {/* Step 2: Professional Information & Payment */}
          {step === 2 && (
            <div className="form-step">
              <h2>{t('professional_info')}</h2>
              
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>{t('select_category')} *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  >
                    <option value="">{t('select_category')}</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{t(cat)}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>{t('job_location')} *</label>
                  <select
                    name="jobLocationCity"
                    value={formData.jobLocationCity}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  >
                    <option value="">{t('job_location')}</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{t(city)}</option>
                    ))}
                  </select>
                </div>

                {formData.jobLocationCity === 'other' && (
                  <div className="form-group full-width">
                    <label>{t('enter_city')} *</label>
                    <input
                      type="text"
                      name="customCity"
                      value={formData.customCity}
                      onChange={handleInputChange}
                      required
                      placeholder={t('enter_city')}
                      disabled={loading}
                    />
                  </div>
                )}

                {/* Payment Information Section */}
                <div className="form-group full-width payment-section">
                  <h3>{t('payment')}</h3>
                  <p className="payment-info">
                    {t('reg_fee')}
                  </p>

                  <div className="payment-methods">
                    <div className="payment-method">
                      <h4>{t('scan_qr')}</h4>
                      <div className="qr-code">
                        <div className="qr-placeholder">
                          [QR Code Image]
                          <p>Scan this QR code to pay ₹199</p>
                        </div>
                      </div>
                    </div>

                    <div className="payment-method">
                      <h4>{t('bank_transfer')}</h4>
                      <div className="bank-details">
                        <div className="bank-info">
                          <strong>{t('account_number')}:</strong> 123456789012
                        </div>
                        <div className="bank-info">
                          <strong>{t('bank_name')}:</strong> State Bank of India
                        </div>
                        <div className="bank-info">
                          <strong>{t('ifsc_code')}:</strong> SBIN0001234
                        </div>
                        <div className="bank-info">
                          <strong>{t('account_holder')}:</strong> WorkForce Connect
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="payment-fields">
                    <div className="form-group">
                      <label>{t('upi_transaction_id')}</label>
                      <input
                        type="text"
                        name="upiTransactionId"
                        value={formData.upiTransactionId}
                        onChange={handleInputChange}
                        placeholder="Enter 23-character UPI Transaction ID"
                        pattern="[a-zA-Z0-9]{23}"
                        maxLength="23"
                        disabled={loading}
                      />
                      <p className="helper-text">Must be exactly 23 alphanumeric characters</p>
                    </div>

                    <div className="form-group">
                      <label>{t('uid_number')}</label>
                      <input
                        type="text"
                        name="uidNumber"
                        value={formData.uidNumber}
                        onChange={handleInputChange}
                        placeholder={t('uid_number')}
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="policy-section">
                <h3>Privacy Policy & Terms</h3>
                <div className="policy-content">
                  <p>
                    By submitting this registration, you agree to our terms and conditions. 
                    Your data will be used for employment matching purposes only. We respect 
                    your privacy and will never share your personal information with third 
                    parties without your consent.
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
                    'Submit Registration'
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

export default CandidateRegistration;
