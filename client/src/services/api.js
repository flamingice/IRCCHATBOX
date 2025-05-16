import axios from 'axios';

const API_PORT = import.meta.env.VITE_API_PORT || 3550
const BASE_URL = `http://localhost:${API_PORT}/api`;
const api = axios.create({
    baseURL: BASE_URL,
});

export default api;
