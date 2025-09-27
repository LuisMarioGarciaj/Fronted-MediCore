import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 flex-1 relative overflow-hidden">
          {/* Luces decorativas */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#65BDB1] rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-6 relative z-10 text-[#65BDB1] drop-shadow-[0_0_10px_#65BDB1]"
          >
            Dashboard
          </motion.h1>

          {/* Tarjetas de métricas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {["Pacientes", "Doctores", "Citas"].map((title, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * i, duration: 0.7 }}
                className="p-6 rounded-2xl bg-black/40 border border-[#65BDB1]/30 shadow-[0_0_20px_#65BDB155] backdrop-blur-xl hover:scale-105 hover:shadow-[0_0_25px_pink] transition transform cursor-pointer"
              >
                <h2 className="text-xl font-semibold mb-2 text-[#65BDB1]">{title}</h2>
                <p className="text-gray-300 text-sm">Sección de {title.toLowerCase()}.</p>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
