// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="p-6">Cargando...</div>;
  if (!user) return <Navigate to="/" replace />;

  if (roles && !roles.includes(user.rol)) {
    // si no tiene rol permitido, lo mandamos al dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
