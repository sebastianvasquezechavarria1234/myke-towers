import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getHistory = async () => {
  const response = await api.get('/historia');
  return response.data;
};

export const getStats = async () => {
  const response = await api.get('/stats');
  return response.data;
};

export const getChannelData = async () => {
  const response = await api.get('/canal');
  return response.data;
};

export const getVideos = async () => {
  const response = await api.get('/videos');
  return response.data;
};

export const searchVideos = async (query) => {
  const response = await api.get(`/buscar?q=${query}`);
  return response.data;
};

export default api;
