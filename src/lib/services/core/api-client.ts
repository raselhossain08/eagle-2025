import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

// API configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// Create axios instance with default configuration
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor - Add auth token
  client.interceptors.request.use(
    (config) => {
      const token = Cookies.get('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor - Handle common errors
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      if (error.response) {
        const { status, data } = error.response;
        
        // Handle specific error status codes
        switch (status) {
          case 401:
            // Token expired or invalid
            Cookies.remove('token');
            Cookies.remove('user');
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            break;
          case 403:
            throw new Error(data?.message || 'Access denied - insufficient permissions');
          case 404:
            throw new Error(data?.message || 'Resource not found');
          case 422:
            throw new Error(data?.message || 'Validation error');
          case 429:
            throw new Error('Too many requests - please try again later');
          case 500:
            throw new Error('Server error - please try again later');
          default:
            throw new Error(data?.message || `API Error: ${status}`);
        }
      } else if (error.request) {
        // Network error
        throw new Error('Network error - please check your connection');
      } else {
        // Something else happened
        throw new Error(error.message || 'An unexpected error occurred');
      }
      
      return Promise.reject(error);
    }
  );

  return client;
};

// Create the main API client instance
export const apiClient = createApiClient();

// Helper function to make API calls with retry logic
export const apiCall = async <T = any>(
  config: AxiosRequestConfig,
  retryCount = 0
): Promise<T> => {
  try {
    const response = await apiClient(config);
    return response.data;
  } catch (error) {
    if (retryCount < API_CONFIG.RETRY_ATTEMPTS) {
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY_DELAY * (retryCount + 1)));
      return apiCall<T>(config, retryCount + 1);
    }
    throw error;
  }
};

// Common API methods
export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    apiCall<T>({ method: 'GET', url, ...config }),

  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    apiCall<T>({ method: 'POST', url, data, ...config }),

  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    apiCall<T>({ method: 'PUT', url, data, ...config }),

  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    apiCall<T>({ method: 'PATCH', url, data, ...config }),

  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    apiCall<T>({ method: 'DELETE', url, ...config }),
};

// Export types for use in other services
export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
};

export type PaginatedResponse<T = any> = ApiResponse<T> & {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};