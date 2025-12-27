import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// Add request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// User Authentication
export const registerUser = async (userData) => {
    return await api.post('/api/auth/register', userData);
};

export const loginUser = async (loginData) => {
    const response = await api.post('/api/auth/login', loginData);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response;
};

// Admin Authentication
export const loginAdmin = async (adminData) => {
    const response = await api.post('/api/admin/login', adminData);
    if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
    }
    return response;
};

export const registerAdmin = async (adminData) => {
    return await api.post('/api/admin/register', adminData);
};

// Quiz API
export const getQuizzes = async () => {
    return await api.get('/api/quizzes');
};

export const submitQuiz = async (quizData) => {
    return await api.post('/api/quizzes/submit', quizData);
};

// Results API
export const getResults = async () => {
    return await api.get('/api/results');
};

export const getLeaderboard = async () => {
    return await api.get('/api/leaderboard');
};
