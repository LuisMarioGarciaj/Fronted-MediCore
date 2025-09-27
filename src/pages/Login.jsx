import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Error en login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden">
      {/* Luces de fondo */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#65BDB1] rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-40 animate-pulse"></div>

      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-black/50 backdrop-blur-xl p-8 rounded-2xl w-96 border border-[#65BDB1]/50 shadow-[0_0_20px_#65BDB1aa]"
      >
        <h1 className="text-4xl font-bold mb-6 text-center text-[#65BDB1] drop-shadow-[0_0_10px_#65BDB1] tracking-wider">
          Bienvenido
        </h1>

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
          className="w-full p-3 mb-6 rounded-lg bg-black/60 border border-pink-400/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:shadow-[0_0_15px_pink]"
        />

        <button className="w-full py-3 rounded-lg bg-gradient-to-r from-[#65BDB1] to-pink-500 text-white font-semibold shadow-[0_0_20px_#65BDB1aa] hover:shadow-[0_0_30px_pink] transition">
          Entrar
        </button>

        <div className="mt-4 text-sm text-gray-300 text-center">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="text-[#65BDB1] hover:text-pink-400 transition"
          >
            Regístrate
          </Link>
        </div>
      </motion.form>
    </div>
  );
}
