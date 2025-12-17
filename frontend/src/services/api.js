import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la petición:', error);
    return Promise.reject(error);
  }
);

export default api;