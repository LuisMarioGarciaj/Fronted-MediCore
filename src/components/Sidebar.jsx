import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const Item = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-4 py-2 rounded-lg mb-2 transition font-medium ${
        isActive
          ? "bg-gradient-to-r from-[#65BDB1] to-pink-500 shadow-lg shadow-pink-500/40 text-white"
          : "text-gray-400 hover:text-white hover:bg-white/10"
      }`
    }
  >
    {children}
  </NavLink>
);

export default function Sidebar() {
  const { user } = useContext(AuthContext);

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-64 bg-black/50 backdrop-blur-xl text-white p-6 min-h-screen border-r border-[#65BDB1]/20 shadow-[0_0_15px_#65BDB1aa] relative z-20"
    >
      <h2 className="text-2xl font-bold mb-8 tracking-wide text-[#65BDB1] drop-shadow-[0_0_8px_#65BDB1]">
        ⚡ SysClinic
      </h2>
      <nav>
        <Item to="/dashboard">Dashboard</Item>
        <Item to="/pacientes">Pacientes</Item>
        <Item to="/doctores">Doctores</Item>
        <Item to="/citas">Citas</Item>
        <Item to="/recetas">Recetas</Item>
        <Item to="/medicamentos">Medicamentos</Item>
        <Item to="/especialidades">Especialidades</Item>
        {user?.rol === "Admin" && <Item to="/admin">Admin</Item>}
      </nav>
    </motion.aside>
  );
}
