// // import axios from 'axios';

// // //const API_BASE_URL = 'http://localhost:5000/api';
// // const API_BASE_URL = 'https://vendor-backend-4v8l.onrender.com/api';

// // const api = axios.create({
// //   baseURL: API_BASE_URL,
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// // });

// // // Vendor API calls
// // export const vendorAPI = {
// //   register: (vendorData) => api.post('/vendors/register', vendorData),
// //   getAll: () => api.get('/vendors'),
// // };

// // export default api;
// import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // For file uploads, we'll create a separate instance
// const apiWithFormData = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'multipart/form-data',
//   },
// });

// // Candidate API calls
// export const candidateAPI = {
//   register: (candidateData) => apiWithFormData.post('/candidates/register', candidateData),
//   sendOtp: (mobile) => api.post('/candidates/send-otp', { mobile }),
//   verifyOtp: (mobile, otp) => api.post('/candidates/verify-otp', { mobile, otp }),
//   getAll: () => api.get('/candidates'),
// };

// // Company API calls  
// export const companyAPI = {
//   register: (companyData) => apiWithFormData.post('/companies/register', companyData),
//   sendOtp: (mobile) => api.post('/companies/send-otp', { mobile }),
//   verifyOtp: (mobile, otp) => api.post('/companies/verify-otp', { mobile, otp }),
//   getAll: () => api.get('/companies'),
// };

// // Response interceptor for error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('API Error:', error);
//     return Promise.reject(error);
//   }
// );

// apiWithFormData.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('API Error:', error);
//     return Promise.reject(error);
//   }
// );

// export default api;

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://vendor-backend-4v8l.onrender.com/api';

// Create axios instance with better error handling
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // Increase timeout
});

// For file uploads
const apiWithFormData = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  timeout: 60000, // Longer timeout for file uploads
});

// Candidate API calls
export const candidateAPI = {
  register: (candidateData) => {
    console.log('Sending candidate registration request...');
    return apiWithFormData.post('/candidates/register', candidateData);
  },
  sendOtp: (mobile) => {
    console.log('Sending OTP request for:', mobile);
    return api.post('/candidates/send-otp', { mobile });
  },
  verifyOtp: (mobile, otp) => {
    console.log('Verifying OTP:', { mobile, otp });
    return api.post('/candidates/verify-otp', { mobile, otp });
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
    console.log('API Response:', response.status, response.config.url);
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

apiWithFormData.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('File Upload Error:', error);
    return Promise.reject(error);
  }
);

export default api;