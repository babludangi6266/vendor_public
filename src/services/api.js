import axios from 'axios';

//const API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = 'https://vendor-backend-4v8l.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Vendor API calls
export const vendorAPI = {
  register: (vendorData) => api.post('/vendors/register', vendorData),
  getAll: () => api.get('/vendors'),
};

export default api;