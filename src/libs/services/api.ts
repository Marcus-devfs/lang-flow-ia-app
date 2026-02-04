import axios, { AxiosError } from 'axios';

// Base API URL - Replace with your actual NestJS backend URL
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Inject Auth Token
api.interceptors.request.use(
    async (config) => {
        // TODO: Retrieve token from SecureStore or Zustand
        const token = null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Global Error Handling
api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            console.error('API Error:', error.response.status, error.response.data);
            // Handle 401 Unauthorized globally (e.g., logout)
        } else {
            console.error('Network Error:', error.message);
        }
        return Promise.reject(error);
    }
);
