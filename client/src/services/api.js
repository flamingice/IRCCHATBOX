import axios from 'axios';

// Use environment variable if provided, otherwise default to `/api`
// so the frontend works out of the box during local development.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;
