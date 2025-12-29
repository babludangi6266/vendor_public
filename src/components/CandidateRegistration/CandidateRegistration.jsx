// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { candidateAPI } from '../../services/api';
// import LanguageSwitcher from '../common/LanguageSwitcher';
// import './CandidateRegistration.css';

// const CandidateRegistration = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [otpLoading, setOtpLoading] = useState(false);
//   const [paymentLoading, setPaymentLoading] = useState(false);
  
//   const [formData, setFormData] = useState({
//     fullName: '',
//     mobile: '',
//     otp: '',
//     address: {
//       villageTownCity: '',
//       landmark: '',
//       pincode: ''
//     },
//     photo: null,
//     category: '',
//     jobLocationCity: '',
//     customCity: '',
//     uidNumber: '', // UID is optional
//     paymentVerified: false
//   });

//   // Camera and photo states
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [photoPreview, setPhotoPreview] = useState(null);
//   const [isCameraActive, setIsCameraActive] = useState(false);
//   const [cameraLoading, setCameraLoading] = useState(false);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const streamRef = useRef(null);

//   const categories = [
//     'office_work', 'accounts', 'telecalling', 'marketing_work', 
//     'cook_staff', 'plumber', 'electrician', 'painter', 'driver',
//     'event_work', 'security_service', 'labour_work', 'construction_work',
//     'pandit_ji_poojan', 'other_work'
//   ];

//   const cities = ['indore', 'bhopal', 'sagar', 'ujjain', 'other'];

//   // Validation functions
//   const validateMobile = (mobile) => {
//     return /^[6-9]\d{9}$/.test(mobile);
//   };

//   const validatePincode = (pincode) => {
//     return /^\d{6}$/.test(pincode);
//   };

//   // FIXED: Proper step validation
//   const validateStep = (stepNumber) => {
//     switch (stepNumber) {
//       case 1:
//         if (!formData.fullName.trim()) {
//           toast.error('Please enter your full name');
//           return false;
//         }
//         if (!validateMobile(formData.mobile)) {
//           toast.error('Please enter a valid 10-digit mobile number starting with 6-9');
//           return false;
//         }
//         if (!otpVerified) {
//           toast.error('Please verify your mobile number with OTP');
//           return false;
//         }
//         if (!formData.address.villageTownCity.trim()) {
//           toast.error('Please enter your village/town/city');
//           return false;
//         }
//         if (!validatePincode(formData.address.pincode)) {
//           toast.error('Please enter a valid 6-digit pincode');
//           return false;
//         }
//         return true;

//       case 2:
//         if (!formData.category) {
//           toast.error('Please select a job category');
//           return false;
//         }
//         if (!formData.jobLocationCity) {
//           toast.error('Please select a job location');
//           return false;
//         }
//         if (formData.jobLocationCity === 'other' && !formData.customCity.trim()) {
//           toast.error('Please enter your city name');
//           return false;
//         }
//         // UID is optional, no validation needed
//         return true;

//       case 3:
//         if (!formData.paymentVerified) {
//           toast.error('Please complete the payment process');
//           return false;
//         }
//         return true;

//       default:
//         return true;
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;
    
//     if (name === 'photo') {
//       const file = files[0];
//       if (file) {
//         if (file.size > 2 * 1024 * 1024) {
//           toast.error('File size should be less than 2MB');
//           return;
//         }
//         if (!file.type.startsWith('image/')) {
//           toast.error('Please upload an image file');
//           return;
//         }
        
//         setFormData(prev => ({ ...prev, photo: file }));
        
//         const reader = new FileReader();
//         reader.onload = (e) => setPhotoPreview(e.target.result);
//         reader.readAsDataURL(file);
//       }
//     } else if (name.startsWith('address.')) {
//       const field = name.split('.')[1];
//       setFormData(prev => ({
//         ...prev,
//         address: { ...prev.address, [field]: value }
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   // Camera functionality (unchanged)
//   const startCamera = async () => {
//     setCameraLoading(true);
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ 
//         video: { 
//           facingMode: 'user',
//           width: { ideal: 1280 },
//           height: { ideal: 720 }
//         } 
//       });
      
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         streamRef.current = stream;
//         setIsCameraActive(true);
//         toast.info('Camera started. Click "Capture Selfie" to take photo.');
//       }
//     } catch (error) {
//       console.error('Camera error:', error);
//       toast.error('Cannot access camera. Please check permissions and try again.');
//     } finally {
//       setCameraLoading(false);
//     }
//   };

//   const stopCamera = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//       streamRef.current = null;
//     }
//     setIsCameraActive(false);
//   };

//   const captureSelfie = () => {
//     if (!videoRef.current || !canvasRef.current) return;

//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);

//     canvas.toBlob((blob) => {
//       if (blob) {
//         const file = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
        
//         setFormData(prev => ({ ...prev, photo: file }));
        
//         const previewUrl = URL.createObjectURL(blob);
//         setPhotoPreview(previewUrl);
        
//         stopCamera();
//         toast.success('Selfie captured successfully!');
//       }
//     }, 'image/jpeg', 0.8);
//   };

//   const removePhoto = () => {
//     setFormData(prev => ({ ...prev, photo: null }));
//     setPhotoPreview(null);
//     if (photoPreview && photoPreview.startsWith('blob:')) {
//       URL.revokeObjectURL(photoPreview);
//     }
//   };

//   // OTP functionality (unchanged)
//   const handleSendOtp = async () => {
//     if (!validateMobile(formData.mobile)) {
//       toast.error('Please enter a valid 10-digit mobile number');
//       return;
//     }

//     setOtpLoading(true);
//     try {
//       const response = await candidateAPI.sendOtp(formData.mobile);
      
//       if (response.data.success) {
//         setOtpSent(true);
//         toast.success('OTP sent successfully to your mobile number!');
//       }
//     } catch (error) {
//       console.error('Send OTP error:', error);
//       let errorMessage = 'Failed to send OTP. Please try again.';
      
//       if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       } else if (error.response?.data?.errors) {
//         errorMessage = error.response.data.errors[0]?.msg || errorMessage;
//       }
      
//       toast.error(errorMessage);
//     } finally {
//       setOtpLoading(false);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     if (formData.otp.length !== 6) {
//       toast.error('Please enter a valid 6-digit OTP');
//       return;
//     }

//     setOtpLoading(true);
//     try {
//       const response = await candidateAPI.verifyOtp(formData.mobile, formData.otp);
      
//       if (response.data.success) {
//         setOtpVerified(true);
//         toast.success('OTP verified successfully!');
//       }
//     } catch (error) {
//       console.error('Verify OTP error:', error);
//       let errorMessage = 'Invalid OTP. Please try again.';
      
//       if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       }
      
//       toast.error(errorMessage);
//       setOtpVerified(false);
//     } finally {
//       setOtpLoading(false);
//     }
//   };

  
// const initiatePayment = async () => {
//   if (!formData.category || !formData.jobLocationCity) {
//     toast.error('Please complete professional information first');
//     return;
//   }

//   setPaymentLoading(true);
//   try {
//     console.log('Initiating payment...');
    
//     // First create order on backend
//     const orderResponse = await candidateAPI.createOrder({
//       amount: 19900, // ₹199 in paise
//       currency: 'INR',
//       receipt: `receipt_${Date.now()}`,
//       notes: {
//         mobile: formData.mobile,
//         name: formData.fullName
//       }
//     });

//     console.log('Order created:', orderResponse.data);

//     const { order } = orderResponse.data;

//     // Check if Razorpay is already loaded
//     if (window.Razorpay) {
//       console.log('Razorpay already loaded, opening checkout...');
//       openRazorpayCheckout(order);
//     } else {
//       console.log('Loading Razorpay script...');
//       // Load Razorpay script dynamically
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.async = true;
      
//       script.onload = () => {
//         console.log('Razorpay script loaded successfully');
//         if (window.Razorpay) {
//           openRazorpayCheckout(order);
//         } else {
//           console.error('Razorpay not available after script load');
//           toast.error('Payment gateway failed to load. Please refresh and try again.');
//           setPaymentLoading(false);
//         }
//       };

//       script.onerror = (error) => {
//         console.error('Failed to load Razorpay script:', error);
//         toast.error('Failed to load payment gateway. Please check your internet connection.');
//         setPaymentLoading(false);
//       };

//       document.body.appendChild(script);
//     }

//   } catch (error) {
//     console.error('Payment initiation error:', error);
//     toast.error('Failed to initiate payment. Please try again.');
//     setPaymentLoading(false);
//   }
// };

// // Separate function to open Razorpay checkout
// const openRazorpayCheckout = (order) => {
//   console.log('Opening Razorpay checkout with order:', order);
  
//   const options = {
//     key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_RhyhtxdaodRUaM', // Use your test key directly for testing
//     amount: order.amount,
//     currency: order.currency,
//     name: 'The Kamakshi',
//     description: 'Candidate Registration Fee',
//     order_id: order.id,
//     handler: async function (response) {
//       console.log('Payment successful:', response);
//       try {
//         // Verify payment on backend
//         const verifyResponse = await candidateAPI.verifyPayment({
//           razorpay_order_id: response.razorpay_order_id,
//           razorpay_payment_id: response.razorpay_payment_id,
//           razorpay_signature: response.razorpay_signature
//         });

//         if (verifyResponse.data.success) {
//           setFormData(prev => ({ ...prev, paymentVerified: true }));
//           toast.success('Payment verified successfully!');
//         }
//       } catch (error) {
//         console.error('Payment verification error:', error);
//         toast.error('Payment verification failed. Please contact support.');
//       } finally {
//         setPaymentLoading(false);
//       }
//     },
//     prefill: {
//       name: formData.fullName,
//       contact: formData.mobile,
//       email: 'babludangi2000@gmail.com' // Required by Razorpay
//     },
//     notes: {
//       type: 'candidate_registration',
//       candidate_name: formData.fullName,
//       candidate_mobile: formData.mobile
//     },
//     theme: {
//       color: '#3B82F6'
//     },
//     modal: {
//       ondismiss: function() {
//         console.log('Payment modal closed by user');
//         setPaymentLoading(false);
//         toast.info('Payment cancelled');
//       }
//     },
//     // Add these for better debugging
//     config: {
//       display: {
//         blocks: {
//           banks: {
//             name: "Pay using UPI",
//             instruments: [
//               {
//                 method: "upi"
//               }
//             ]
//           }
//         }
//       }
//     }
//   };

//   console.log('Razorpay options:', options);

//   try {
//     const rzp = new window.Razorpay(options);
//     rzp.open();
//     console.log('Razorpay checkout opened successfully');
//   } catch (error) {
//     console.error('Error opening Razorpay:', error);
//     toast.error('Failed to open payment gateway. Please try again.');
//     setPaymentLoading(false);
//   }
// };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // FIXED: Only validate step 3 for final submission
//     if (!validateStep(3)) {
//       return;
//     }

//     setLoading(true);
    
//     try {
//       const submitData = new FormData();
      
//       submitData.append('fullName', formData.fullName);
//       submitData.append('mobile', formData.mobile);
//       submitData.append('address[villageTownCity]', formData.address.villageTownCity);
//       submitData.append('address[landmark]', formData.address.landmark || '');
//       submitData.append('address[pincode]', formData.address.pincode);
//       submitData.append('category', formData.category);
//       submitData.append('jobLocationCity', formData.jobLocationCity);
//       submitData.append('customCity', formData.customCity || '');
//       submitData.append('uidNumber', formData.uidNumber || ''); // UID is optional
//       submitData.append('paymentVerified', formData.paymentVerified);
      
//       if (formData.photo) {
//         submitData.append('photo', formData.photo);
//       }

//       const loadingToast = toast.loading('Submitting registration...');

//       const response = await candidateAPI.register(submitData);

//       toast.dismiss(loadingToast);

//       if (response.data.success) {
//         toast.success('Registration successful! Redirecting to home page...');
        
//         // Reset form
//         setFormData({
//           fullName: '',
//           mobile: '',
//           otp: '',
//           address: {
//             villageTownCity: '',
//             landmark: '',
//             pincode: ''
//           },
//           photo: null,
//           category: '',
//           jobLocationCity: '',
//           customCity: '',
//           uidNumber: '',
//           paymentVerified: false
//         });
//         setPhotoPreview(null);
//         setOtpVerified(false);
//         setOtpSent(false);
        
//         setTimeout(() => navigate('/'), 3000);
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
      
//       let errorMessage = 'Registration failed. Please try again.';
      
//       if (error.response?.data?.errors) {
//         const errorMessages = error.response.data.errors.map(err => err.msg).join(', ');
//         errorMessage = `Validation failed: ${errorMessages}`;
//       } else if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       } else if (error.code === 'ECONNREFUSED') {
//         errorMessage = 'Backend server is not running. Please start the backend server.';
//       } else if (error.message === 'Network Error') {
//         errorMessage = 'Network error. Please check your internet connection.';
//       }
      
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const nextStep = () => {
//     if (!validateStep(step)) {
//       return;
//     }
    
//     setStep(step + 1);
//   };

//   const prevStep = () => {
//     setStep(step - 1);
//     if (isCameraActive) {
//       stopCamera();
//     }
//   };

//   // Cleanup camera on unmount
//   useEffect(() => {
//     return () => {
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach(track => track.stop());
//       }
//       if (photoPreview && photoPreview.startsWith('blob:')) {
//         URL.revokeObjectURL(photoPreview);
//       }
//     };
//   }, [photoPreview]);

//   return (
//     <div className="candidate-registration">
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
      
//       <div className="registration-container">
//         <div className="registration-header">
//           <LanguageSwitcher />
//           <h1>{t('candidate_title')}</h1>
//           <p>{t('candidate_subtitle')}</p>
//         </div>

//         {/* Progress Bar */}
//         <div className="progress-bar">
//           <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
//             <div className="step-number">1</div>
//             <span>{t('personal_info')}</span>
//           </div>
//           <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
//             <div className="step-number">2</div>
//             <span>{t('professional_info')}</span>
//           </div>
//           <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
//             <div className="step-number">3</div>
//             <span>Payment</span>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="registration-form">
//           {/* Step 1: Personal Information */}
//           {step === 1 && (
//             <div className="form-step">
//               <h2>{t('personal_info')}</h2>
              
//               <div className="form-grid">
//                 <div className="form-group">
//                   <label>{t('full_name')} *</label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleInputChange}
//                     required
//                     placeholder={t('full_name')}
//                     disabled={loading}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>{t('mobile')} *</label>
//                   <div className="mobile-input-group">
//                     <input
//                       type="tel"
//                       name="mobile"
//                       value={formData.mobile}
//                       onChange={handleInputChange}
//                       required
//                       placeholder={t('mobile')}
//                       pattern="[6-9][0-9]{9}"
//                       maxLength="10"
//                       disabled={otpVerified || loading}
//                     />
//                     <button 
//                       type="button" 
//                       className="otp-btn"
//                       onClick={handleSendOtp}
//                       disabled={!validateMobile(formData.mobile) || otpVerified || loading || otpLoading}
//                     >
//                       {otpLoading ? 'Sending...' : (otpVerified ? 'Verified' : 'Send OTP')}
//                     </button>
//                   </div>
//                 </div>

//                 {otpSent && !otpVerified && (
//                   <div className="form-group">
//                     <label>Enter OTP *</label>
//                     <div className="otp-input-group">
//                       <input
//                         type="text"
//                         name="otp"
//                         value={formData.otp}
//                         onChange={handleInputChange}
//                         required
//                         placeholder="Enter 6-digit OTP"
//                         pattern="[0-9]{6}"
//                         maxLength="6"
//                         disabled={otpVerified || loading}
//                       />
//                       <button 
//                         type="button" 
//                         className="verify-otp-btn"
//                         onClick={handleVerifyOtp}
//                         disabled={formData.otp.length !== 6 || otpVerified || loading || otpLoading}
//                       >
//                         {otpLoading ? 'Verifying...' : 'Verify OTP'}
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {otpVerified && (
//                   <div className="success-badge">
//                     ✓ Mobile number verified successfully
//                   </div>
//                 )}

//                 <div className="form-group full-width">
//                   <label>{t('village_town_city')} *</label>
//                   <input
//                     type="text"
//                     name="address.villageTownCity"
//                     value={formData.address.villageTownCity}
//                     onChange={handleInputChange}
//                     required
//                     placeholder={t('village_town_city')}
//                     disabled={loading}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>{t('landmark')}</label>
//                   <input
//                     type="text"
//                     name="address.landmark"
//                     value={formData.address.landmark}
//                     onChange={handleInputChange}
//                     placeholder={t('landmark')}
//                     disabled={loading}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>{t('pincode')} *</label>
//                   <input
//                     type="text"
//                     name="address.pincode"
//                     value={formData.address.pincode}
//                     onChange={handleInputChange}
//                     required
//                     placeholder={t('pincode')}
//                     pattern="[0-9]{6}"
//                     maxLength="6"
//                     disabled={loading}
//                   />
//                 </div>

//                 <div className="form-group full-width">
//                   <label>{t('photo')} (Optional)</label>
//                   <div className="photo-upload-section">
//                     {photoPreview ? (
//                       <div className="photo-preview">
//                         <img src={photoPreview} alt="Preview" />
//                         <div className="photo-actions">
//                           <button 
//                             type="button" 
//                             className="change-photo-btn"
//                             onClick={() => document.getElementById('photo-upload').click()}
//                             disabled={loading}
//                           >
//                             {t('change_photo')}
//                           </button>
//                           <button 
//                             type="button" 
//                             className="remove-photo-btn"
//                             onClick={removePhoto}
//                             disabled={loading}
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="photo-upload-options">
//                         <label className="upload-option">
//                           <input
//                             type="file"
//                             id="photo-upload"
//                             name="photo"
//                             accept="image/*"
//                             onChange={handleInputChange}
//                             hidden
//                             disabled={loading}
//                           />
//                           <div className="upload-box">
//                             <span className="upload-icon">📁</span>
//                             <span>{t('upload_photo')}</span>
//                           </div>
//                         </label>
                        
//                         {!isCameraActive ? (
//                           <button 
//                             type="button" 
//                             className="camera-btn"
//                             onClick={startCamera}
//                             disabled={loading || cameraLoading}
//                           >
//                             {cameraLoading ? (
//                               <>
//                                 <div className="button-spinner small"></div>
//                                 Starting Camera...
//                               </>
//                             ) : (
//                               <>
//                                 <span className="camera-icon">📷</span>
//                                 {t('take_selfie')}
//                               </>
//                             )}
//                           </button>
//                         ) : (
//                           <div className="camera-active">
//                             <div className="camera-preview">
//                               <video 
//                                 ref={videoRef} 
//                                 autoPlay 
//                                 playsInline
//                                 className="camera-video"
//                               />
//                               <canvas ref={canvasRef} style={{ display: 'none' }} />
//                             </div>
//                             <div className="camera-controls">
//                               <button 
//                                 type="button" 
//                                 className="capture-btn"
//                                 onClick={captureSelfie}
//                                 disabled={loading}
//                               >
//                                 📸 Capture Selfie
//                               </button>
//                               <button 
//                                 type="button" 
//                                 className="cancel-camera-btn"
//                                 onClick={stopCamera}
//                                 disabled={loading}
//                               >
//                                 Cancel
//                               </button>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                   <p className="helper-text">File size should be less than 2MB (Optional)</p>
//                 </div>
//               </div>

//               <div className="form-actions">
//                 <button 
//                   type="button" 
//                   className="next-btn" 
//                   onClick={nextStep}
//                   disabled={loading || !otpVerified}
//                 >
//                   {t('next')}
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Step 2: Professional Information */}
//           {step === 2 && (
//             <div className="form-step">
//               <h2>{t('professional_info')}</h2>
              
//               <div className="form-grid">
//                 <div className="form-group full-width">
//                   <label>{t('select_category')} *</label>
//                   <select
//                     name="category"
//                     value={formData.category}
//                     onChange={handleInputChange}
//                     required
//                     disabled={loading}
//                   >
//                     <option value="">{t('select_category')}</option>
//                     {categories.map(cat => (
//                       <option key={cat} value={cat}>{t(cat)}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="form-group full-width">
//                   <label>{t('job_location')} *</label>
//                   <select
//                     name="jobLocationCity"
//                     value={formData.jobLocationCity}
//                     onChange={handleInputChange}
//                     required
//                     disabled={loading}
//                   >
//                     <option value="">{t('job_location')}</option>
//                     {cities.map(city => (
//                       <option key={city} value={city}>{t(city)}</option>
//                     ))}
//                   </select>
//                 </div>

//                 {formData.jobLocationCity === 'other' && (
//                   <div className="form-group full-width">
//                     <label>{t('enter_city')} *</label>
//                     <input
//                       type="text"
//                       name="customCity"
//                       value={formData.customCity}
//                       onChange={handleInputChange}
//                       required
//                       placeholder={t('enter_city')}
//                       disabled={loading}
//                     />
//                   </div>
//                 )}

//                 {/* UID Number - Optional Field */}
//                 <div className="form-group full-width">
//                   <label>{t('uid_number')} (Optional)</label>
//                   <input
//                     type="text"
//                     name="uidNumber"
//                     value={formData.uidNumber}
//                     onChange={handleInputChange}
//                     placeholder={t('uid_number')}
//                     disabled={loading}
//                   />
//                   <p className="helper-text">Enter your Aadhaar or other identification number (optional)</p>
//                 </div>
//               </div>

//               <div className="form-actions">
//                 <button 
//                   type="button" 
//                   className="prev-btn" 
//                   onClick={prevStep}
//                   disabled={loading}
//                 >
//                   {t('previous')}
//                 </button>
//                 <button 
//                   type="button" 
//                   className="next-btn" 
//                   onClick={nextStep}
//                   disabled={loading || !formData.category || !formData.jobLocationCity}
//                 >
//                   Proceed to Payment
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Step 3: Payment */}
//           {step === 3 && (
//             <div className="form-step">
//               <h2>Complete Registration</h2>
              
//               <div className="payment-section">
//                 <div className="payment-info-card">
//                   <h3>Registration Fee</h3>
//                   <div className="fee-amount">₹199</div>
//                   <p className="fee-description">
//                     One-time registration fee for profile verification and lifetime access to job opportunities
//                   </p>
                  
//                   <div className="payment-features">
//                     <div className="feature">
//                       <span className="feature-icon">✓</span>
//                       <span>Profile Verification</span>
//                     </div>
//                     <div className="feature">
//                       <span className="feature-icon">✓</span>
//                       <span>Lifetime Job Access</span>
//                     </div>
//                     <div className="feature">
//                       <span className="feature-icon">✓</span>
//                       <span>Priority Matching</span>
//                     </div>
//                     <div className="feature">
//                       <span className="feature-icon">✓</span>
//                       <span>Dedicated Support</span>
//                     </div>
//                   </div>

//                   {formData.paymentVerified ? (
//                     <div className="payment-success">
//                       <div className="success-icon">✓</div>
//                       <h4>Payment Verified Successfully!</h4>
//                       <p>Your registration is now complete</p>
//                     </div>
//                   ) : (
//                     <button 
//                       type="button"
//                       className="payment-btn"
//                       onClick={initiatePayment}
//                       disabled={paymentLoading || loading}
//                     >
//                       {paymentLoading ? (
//                         <>
//                           <div className="button-spinner"></div>
//                           Processing Payment...
//                         </>
//                       ) : (
//                         'Pay Registration Fee - ₹199'
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </div>

//               <div className="policy-section">
//                 <h3>Privacy Policy & Terms</h3>
//                 <div className="policy-content">
//                   <p>
//                     By submitting this registration, you agree to our terms and conditions. 
//                     Your data will be used for employment matching purposes only. We respect 
//                     your privacy and will never share your personal information with third 
//                     parties without your consent.
//                   </p>
//                 </div>
//                 <label className="policy-checkbox">
//                   <input 
//                     type="checkbox" 
//                     required 
//                     disabled={loading || !formData.paymentVerified}
//                   />
//                   <span>I have read and agree to the terms and conditions</span>
//                 </label>
//               </div>

//               <div className="form-actions">
//                 <button 
//                   type="button" 
//                   className="prev-btn" 
//                   onClick={prevStep}
//                   disabled={loading}
//                 >
//                   {t('previous')}
//                 </button>
//                 <button 
//                   type="submit" 
//                   className="submit-btn" 
//                   disabled={loading || !formData.paymentVerified}
//                 >
//                   {loading ? (
//                     <>
//                       <div className="button-spinner"></div>
//                       Submitting Registration...
//                     </>
//                   ) : (
//                     'Complete Registration'
//                   )}
//                 </button>
//               </div>
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CandidateRegistration;

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { candidateAPI } from '../../services/api';
import LanguageSwitcher from '../common/LanguageSwitcher';
import './CandidateRegistration.css';

const CandidateRegistration = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  
  // Added state for Terms and Conditions checkbox
  const [termsAccepted, setTermsAccepted] = useState(false);

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
    //uidNumber: '', 
    // paymentVerified removed from state
  });

  // Camera and photo states
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
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

  const validateStep = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        if (!formData.fullName.trim()) {
          toast.error('Please enter your full name');
          return false;
        }
        if (!validateMobile(formData.mobile)) {
          toast.error('Please enter a valid 10-digit mobile number starting with 6-9');
          return false;
        }
        if (!otpVerified) {
          toast.error('Please verify your mobile number with OTP');
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
        return true;

      case 2:
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
        return true;

      case 3:
        if (!termsAccepted) {
            toast.error('Please accept the Terms and Conditions');
            return false;
        }
        return true;

      default:
        return true;
    }
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

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
        
        setFormData(prev => ({ ...prev, photo: file }));
        
        const previewUrl = URL.createObjectURL(blob);
        setPhotoPreview(previewUrl);
        
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

  // OTP functionality
  const handleSendOtp = async () => {
    if (!validateMobile(formData.mobile)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    setOtpLoading(true);
    try {
      const response = await candidateAPI.sendOtp(formData.mobile);
      
      if (response.data.success) {
        setOtpSent(true);
        toast.success('OTP sent successfully to your mobile number!');
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      let errorMessage = 'Failed to send OTP. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.errors) {
        errorMessage = error.response.data.errors[0]?.msg || errorMessage;
      }
      
      toast.error(errorMessage);
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
      const response = await candidateAPI.verifyOtp(formData.mobile, formData.otp);
      
      if (response.data.success) {
        setOtpVerified(true);
        toast.success('OTP verified successfully!');
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      let errorMessage = 'Invalid OTP. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
      setOtpVerified(false);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(3)) {
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
      //submitData.append('uidNumber', formData.uidNumber || '');
      // Explicitly setting paymentVerified to true for backend compatibility (if needed), or you can remove this line if backend doesn't check it.
      submitData.append('paymentVerified', 'true'); 
      
      if (formData.photo) {
        submitData.append('photo', formData.photo);
      }

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
          //uidNumber: '',
        });
        setPhotoPreview(null);
        setOtpVerified(false);
        setOtpSent(false);
        setTermsAccepted(false);
        
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
    if (!validateStep(step)) {
      return;
    }
    
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
    if (isCameraActive) {
      stopCamera();
    }
  };

  // Cleanup camera on unmount
  useEffect(() => {
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
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <span>Review</span>
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
                      disabled={otpVerified || loading}
                    />
                    <button 
                      type="button" 
                      className="otp-btn"
                      onClick={handleSendOtp}
                      disabled={!validateMobile(formData.mobile) || otpVerified || loading || otpLoading}
                    >
                      {otpLoading ? 'Sending...' : (otpVerified ? 'Verified' : 'Send OTP')}
                    </button>
                  </div>
                </div>

                {otpSent && !otpVerified && (
                  <div className="form-group">
                    <label>Enter OTP *</label>
                    <div className="otp-input-group">
                      <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter 6-digit OTP"
                        pattern="[0-9]{6}"
                        maxLength="6"
                        disabled={otpVerified || loading}
                      />
                      <button 
                        type="button" 
                        className="verify-otp-btn"
                        onClick={handleVerifyOtp}
                        disabled={formData.otp.length !== 6 || otpVerified || loading || otpLoading}
                      >
                        {otpLoading ? 'Verifying...' : 'Verify OTP'}
                      </button>
                    </div>
                  </div>
                )}

                {otpVerified && (
                  <div className="success-badge">
                    ✓ Mobile number verified successfully
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
                  <label>{t('photo')} (Optional)</label>
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
                  disabled={loading || !otpVerified}
                >
                  {t('next')}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Professional Information */}
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
                  type="button" 
                  className="next-btn" 
                  onClick={nextStep}
                  disabled={loading || !formData.category || !formData.jobLocationCity}
                >
                  Review & Submit
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Submit (No Payment) */}
          {step === 3 && (
            <div className="form-step">
              <h2>Review Registration</h2>
              
              <div className="review-section" style={{marginBottom: '20px'}}>
                  <div className="info-summary">
                      <p><strong>Name:</strong> {formData.fullName}</p>
                      <p><strong>Mobile:</strong> {formData.mobile}</p>
                      <p><strong>Category:</strong> {t(formData.category)}</p>
                      <p><strong>Location:</strong> {t(formData.jobLocationCity)}</p>
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
                  <input 
                    type="checkbox" 
                    required 
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    disabled={loading}
                  />
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
                  disabled={loading || !termsAccepted}
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

export default CandidateRegistration;
