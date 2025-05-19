import axios from 'axios';
import { BASE_URL } from '@/shared/constants/api';

const api = axios.create({
  baseURL: BASE_URL
});

export default api;
