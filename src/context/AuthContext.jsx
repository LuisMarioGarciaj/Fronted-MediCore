// src/context/AuthContext.jsx
import React, { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { _id, nombre, email, rol }
  const [loading, setLoading] = useState(true);

  // Si ya hay token, intentar cargar perfil
  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await api.get("/auth/perfil");
          // res.data.usuario por cómo definimos /perfil
          setUser(res.data.usuario || {
            _id: res.data._id,
            nombre: res.data.nombre,
            email: res.data.email,
            rol: res.data.rol
          });
        } catch (err) {
          console.error("No se pudo cargar perfil", err);
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setLoading(false);
    };
    load();
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser({
      _id: res.data._id,
      nombre: res.data.nombre,
      email: res.data.email,
      rol: res.data.rol,
    });
    return res;
  };

  const register = async (payload) => {
    const res = await api.post("/auth/register", payload);
    localStorage.setItem("token", res.data.token);
    setUser({
      _id: res.data._id,
      nombre: res.data.nombre,
      email: res.data.email,
      rol: res.data.rol,
    });
    return res;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
