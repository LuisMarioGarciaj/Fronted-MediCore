import React, { useEffect, useState } from "react";
import { getEspecialidades, createEspecialidad, updateEspecialidad, deleteEspecialidad } from "../api/especialidadApi";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Especialidades() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ nombre: "", descripcion: "" });

  const load = async () => {
    const res = await getEspecialidades();
    setItems(res.data);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await createEspecialidad(form);
    setForm({ nombre: "", descripcion: "" });
    await load();
  };

  const del = async (id) => {
    if (!confirm("Eliminar especialidad?")) return;
    await deleteEspecialidad(id);
    await load();
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 flex-1 relative overflow-hidden">
          {/* Luces */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#65BDB1] rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>

          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl font-bold mb-6 text-pink-400 drop-shadow-[0_0_10px_pink]">
            Especialidades
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.form onSubmit={submit} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="col-span-1 p-6 rounded-2xl bg-black/40 border border-pink-500/30 shadow-[0_0_20px_pink] backdrop-blur-xl space-y-3">
              <input required value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} placeholder="Nombre" className="w-full p-2 rounded bg-white/5 border border-white/10"/>
              <textarea value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} placeholder="Descripción" className="w-full p-2 rounded bg-white/5 border border-white/10"/>
              <button className="w-full py-2 rounded bg-gradient-to-r from-pink-500 to-[#65BDB1] shadow-[0_0_15px_pink]">Crear</button>
            </motion.form>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="col-span-2 p-6 rounded-2xl bg-black/40 border border-[#65BDB1]/30 shadow-[0_0_20px_#65BDB155] backdrop-blur-xl">
              <h2 className="font-semibold mb-4 text-[#65BDB1]">Listado de Especialidades</h2>
              <div className="space-y-3 max-h-[60vh] overflow-auto pr-2">
                {items.map(e => (
                  <motion.div key={e._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center hover:bg-white/10 transition">
                    <div>
                      <div className="font-medium text-pink-400">{e.nombre}</div>
                      <div className="text-sm text-gray-300">{e.descripcion}</div>
                    </div>
                    <button onClick={() => del(e._id)} className="px-3 py-1 rounded bg-rose-600/80 hover:bg-rose-700 transition">Eliminar</button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
