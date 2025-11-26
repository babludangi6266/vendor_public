import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://vendor-backend-4v8l.onrender.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// For file uploads
const apiWithFormData = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  timeout: 60000,
});

// Candidate API calls
export const candidateAPI = {
  register: (candidateData) => {
    return apiWithFormData.post('/candidates/register', candidateData);
  },
  sendOtp: (mobile) => {
    return api.post('/candidates/send-otp', { mobile });
  },
  verifyOtp: (mobile, otp) => {
    return api.post('/candidates/verify-otp', { mobile, otp });
  },
  // FIXED: Payment endpoints should be under candidates
  createOrder: (orderData) => {
    return api.post('/candidates/create-order', orderData); // Changed from /payments/create-order
  },
  verifyPayment: (paymentData) => {
    return api.post('/candidates/verify-payment', paymentData); // Changed from /payments/verify-payment
  },
  getAll: () => api.get('/candidates'),
};

// Company API calls  
export const companyAPI = {
  register: (companyData) => apiWithFormData.post('/companies/register', companyData),
  sendOtp: (mobile) => api.post('/companies/send-otp', { mobile }),
  verifyOtp: (mobile, otp) => api.post('/companies/verify-otp', { mobile, otp }),
  getAll: () => api.get('/companies'),
};

// Enhanced response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error Details:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message,
      data: error.response?.data
    });
    
    if (error.code === 'ECONNREFUSED') {
      console.error('Backend server is not running. Please start the backend server.');
    }
    
    return Promise.reject(error);
  }
);

export default api;