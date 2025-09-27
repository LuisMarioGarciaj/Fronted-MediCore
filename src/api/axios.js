import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/api",
});

// Interceptor para añadir token automáticamente
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/"; // Redirige al login
      }
      // Puedes manejar 403, 404, 500, etc.
      if (status === 403) {
        alert("No tienes permisos para realizar esta acción.");
      }
      if (status === 404) {
        alert("Recurso no encontrado.");
      }
      if (status === 500) {
        alert("Error en el servidor. Intenta más tarde.");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
