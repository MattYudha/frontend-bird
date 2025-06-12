import axios from 'axios';

// Base configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout for file uploads
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication services
export const authService = {
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { token, user };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  register: async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
};

// Bird identification services
export const birdService = {
  identifyBirdFromAudio: async (audioFile, onProgress = null) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioFile);
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
        },
      };

      const response = await apiClient.post('/birds/identify', formData, config);
      return response.data;
    } catch (error) {
      const errorDetails = handleApiError(error);
      throw new Error(errorDetails.message);
    }
  },

  getBirdDetails: async (birdId) => {
    try {
      const response = await apiClient.get(`/birds/${birdId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bird details');
    }
  },

  getAllBirds: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters);
      const response = await apiClient.get(`/birds?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch birds');
    }
  },

  searchBirds: async (query) => {
    try {
      const response = await apiClient.get(`/birds/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Search failed');
    }
  }
};

// User history services
export const historyService = {
  getUserHistory: async () => {
    try {
      const response = await apiClient.get('/history');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch history');
    }
  },

  saveIdentification: async (identificationData) => {
    try {
      const response = await apiClient.post('/history', identificationData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to save identification');
    }
  },

  deleteHistoryItem: async (itemId) => {
    try {
      await apiClient.delete(`/history/${itemId}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete history item');
    }
  }
};

// Utility function for handling API errors
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data?.message || 'Server error occurred',
      status: error.response.status,
      data: error.response.data
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      message: 'Network error - please check your connection',
      status: 0,
      data: null
    };
  } else {
    // Something else happened
    return {
      message: error.message || 'An unexpected error occurred',
      status: -1,
      data: null
    };
  }
};

export default apiClient;