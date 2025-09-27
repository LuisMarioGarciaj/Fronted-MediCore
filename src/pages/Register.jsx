import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("Paciente");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register({ nombre, email, password, rol });
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Error en registro");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden">
      {/* Luces de fondo */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#65BDB1] rounded-full blur-3xl opacity-40 animate-pulse"></div>

      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-black/50 backdrop-blur-xl p-8 rounded-2xl w-96 border border-pink-400/40 shadow-[0_0_20px_pink]"
      >
        <h1 className="text-4xl font-bold mb-6 text-center text-pink-400 drop-shadow-[0_0_10px_pink] tracking-wider">
          Crear cuenta
        </h1>

        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          className="w-full p-3 mb-4 rounded-lg bg-black/60 border border-pink-400/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:shadow-[0_0_15px_pink]"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg bg-black/60 border border-[#65BDB1]/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#65BDB1] focus:shadow-[0_0_15px_#65BDB1]"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="w-full p-3 mb-4 rounded-lg bg-black/60 border border-indigo-400/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:shadow-[0_0_15px_indigo]"
        />
        <select
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg bg-black/60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-violet-400 focus:shadow-[0_0_15px_violet]"
        >
          <option value="Paciente" className="bg-gray-900">
            Paciente
          </option>
          <option value="Doctor" className="bg-gray-900">
            Doctor
          </option>
          <option value="Admin" className="bg-gray-900">
            Admin
          </option>
        </select>

        <button className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-[#65BDB1] text-white font-semibold shadow-[0_0_20px_pink] hover:shadow-[0_0_30px_#65BDB1] transition">
          Crear cuenta
        </button>
      </motion.form>
    </div>
  );
}
