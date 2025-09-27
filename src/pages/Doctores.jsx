import React, { useEffect, useState } from "react";
import { getDoctores, createDoctor, deleteDoctor } from "../api/doctorApi";
import api from "../api/axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Doctores() {
  const [doctores, setDoctores] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [form, setForm] = useState({ nombre: "", especialidad: "", telefono: "", email: ""});

  const load = async () => {
    const res = await getDoctores();
    setDoctores(res.data);
  };

  const loadEspecialidades = async () => {
    try {
      const res = await api.get("/especialidades");
      setEspecialidades(res.data);
    } catch {
      console.warn("No hay endpoint /especialidades");
    }
  };

  useEffect(() => { load(); loadEspecialidades(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await createDoctor(form);
    setForm({ nombre: "", especialidad: "", telefono: "", email: "" });
    await load();
  };

  const remove = async (id) => {
    if (!confirm("Eliminar doctor?")) return;
    await deleteDoctor(id);
    await load();
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 flex-1 relative overflow-hidden">
          {/* Luces decorativas */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#65BDB1] rounded-full blur-3xl opacity-20 animate-pulse"></div>

          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-6 text-pink-400 drop-shadow-[0_0_10px_pink]"
          >
            Doctores
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <motion.form 
              onSubmit={submit}
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="col-span-1 p-6 rounded-2xl bg-black/40 border border-pink-500/30 shadow-[0_0_20px_pink] backdrop-blur-xl space-y-3"
            >
              <input required value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})} placeholder="Nombre" className="w-full p-2 rounded bg-white/5 border border-white/10"/>
              <select value={form.especialidad} onChange={e=>setForm({...form,especialidad:e.target.value})} className="w-full p-2 rounded bg-white/5 border border-white/10">
                <option value="">Selecciona especialidad</option>
                {especialidades.map(s => <option key={s._id} value={s._id}>{s.nombre}</option>)}
              </select>
              <input value={form.telefono} onChange={e=>setForm({...form,telefono:e.target.value})} placeholder="Teléfono" className="w-full p-2 rounded bg-white/5 border border-white/10"/>
              <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="w-full p-2 rounded bg-white/5 border border-white/10"/>
              <button className="w-full py-2 rounded bg-gradient-to-r from-pink-500 to-[#65BDB1] shadow-[0_0_15px_pink]">Crear doctor</button>
            </motion.form>

            {/* Lista */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="col-span-2 p-6 rounded-2xl bg-black/40 border border-[#65BDB1]/30 shadow-[0_0_20px_#65BDB155] backdrop-blur-xl"
            >
              <h2 className="font-semibold mb-4 text-[#65BDB1]">Lista de Doctores</h2>
              <div className="space-y-3 max-h-[60vh] overflow-auto pr-2">
                {doctores.map(d => (
                  <motion.div
                    key={d._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center hover:bg-white/10 transition"
                  >
                    <div>
                      <div className="font-medium text-pink-400">{d.nombre}</div>
                      <div className="text-sm text-gray-300">{d.email} • {d.telefono}</div>
                      <div className="text-sm text-gray-300">Especialidad: {d.especialidad?.nombre || d.especialidad}</div>
                    </div>
                    <button onClick={()=>remove(d._id)} className="px-3 py-1 rounded bg-rose-600/80 hover:bg-rose-700 transition">Eliminar</button>
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
