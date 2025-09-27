import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-between px-6 py-4 bg-black/40 backdrop-blur-lg border-b border-[#65BDB1]/20 shadow-[0_0_15px_#65BDB1aa] relative z-20"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#65BDB1] to-pink-500 flex items-center justify-center font-bold text-lg shadow-[0_0_15px_pink]">
          S
        </div>
        <div>
          <div className="text-lg font-semibold text-[#65BDB1]">SysClinic</div>
          <div className="text-xs text-gray-300">Gestión médica — React + Mongo</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="text-right">
              <div className="font-medium">{user.nombre}</div>
              <div className="text-xs text-gray-400">{user.rol}</div>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-600 to-[#65BDB1] font-medium shadow-[0_0_15px_pink] hover:shadow-[0_0_25px_#65BDB1] transition"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <div className="text-sm">Invitado</div>
        )}
      </div>
    </motion.header>
  );
}
