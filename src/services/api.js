
import axios from 'axios';

// Update this URL to your deployed Render URL if not already done
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://vendor-backend-5zph.onrender.com/api';
//const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance (Standard JSON)
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// For file uploads (Multipart)
const apiWithFormData = axios.create({
  baseURL: API_BASE_URL,
  
  timeout: 180000, 
});

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
  

  getAll: () => api.get('/candidates'),
};

export const companyAPI = {
  register: (companyData) => apiWithFormData.post('/companies/register', companyData),
  sendOtp: (mobile) => api.post('/companies/send-otp', { mobile }),
  verifyOtp: (mobile, otp) => api.post('/companies/verify-otp', { mobile, otp }),
  getAll: () => api.get('/companies'),
};

// Response interceptor (Keep as is)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);


apiWithFormData.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Upload Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;