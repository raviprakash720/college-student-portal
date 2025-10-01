// Utility functions for API calls
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for making HTTP requests
const apiRequest = async (endpoint, method = 'GET', data = null) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('token');

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong');
    }

    return result;
  } catch (error) {
    throw new Error(error.message || 'Network error');
  }
};

// User authentication APIs
export const authAPI = {
  // Register a new user
  register: (userData) => apiRequest('/users/register', 'POST', userData),

  // Login user
  login: (credentials) => apiRequest('/users/login', 'POST', credentials),

  // Get user profile
  getProfile: () => apiRequest('/users/profile', 'GET'),
};