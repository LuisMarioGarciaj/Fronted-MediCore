import { useEffect, useState } from "react";
import { getRecetas } from "../api/recetaApi";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Recetas() {
  const [recetas, setRecetas] = useState([]);

  useEffect(() => {
    getRecetas().then((res) => setRecetas(res.data));
  }, []);

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
            className="text-4xl font-bold mb-6 relative z-10 text-pink-400 drop-shadow-[0_0_10px_pink]"
          >
            Recetas
          </motion.h1>

          <div className="relative z-10 grid gap-4">
            {recetas.length === 0 ? (
              <p className="text-gray-400">No hay recetas registradas.</p>
            ) : (
              recetas.map((r, i) => (
                <motion.div
                  key={r._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-black/40 border border-pink-500/30 shadow-[0_0_15px_pink] backdrop-blur-xl"
                >
                  <div className="font-semibold text-pink-400">
                    Receta #{i + 1}
                  </div>
                  <div className="text-sm text-gray-300">
                    Paciente: <span className="text-white">{r.paciente?.nombre}</span>
                  </div>
                  <div className="text-sm text-gray-300">
                    Doctor: <span className="text-white">{r.doctor?.nombre}</span>
                  </div>
                  <div className="text-sm text-gray-300">
                    Medicamento: <span className="text-white">{r.medicamento?.nombre}</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
