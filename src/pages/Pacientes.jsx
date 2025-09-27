import React, { useEffect, useState } from "react";
import { getPacientes, createPaciente, deletePaciente } from "../api/pacienteApi";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [form, setForm] = useState({ nombre: "", edad: "", genero: "Masculino", telefono: "", email: "", direccion: "", historialMedico: "" });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try { const res = await getPacientes(); setPacientes(res.data); } 
    catch (err) { console.error(err); }
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPaciente({ ...form, edad: Number(form.edad) });
      setForm({ nombre: "", edad: "", genero: "Masculino", telefono: "", email: "", direccion: "", historialMedico: "" });
      await load();
    } catch (err) {
      alert(err.response?.data?.message || "Error creando paciente");
    } finally { setLoading(false); }
  };

  const remove = async (id) => {
    if (!confirm("Eliminar paciente?")) return;
    try { await deletePaciente(id); await load(); } 
    catch (err) { alert("Error eliminando"); }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 flex-1 relative overflow-hidden">
          {/* Luces decorativas */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#65BDB1] rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>

          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-6 text-[#65BDB1] drop-shadow-[0_0_10px_#65BDB1]"
          >
            Pacientes
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Formulario */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="col-span-1 p-6 rounded-2xl bg-black/40 border border-[#65BDB1]/30 shadow-[0_0_20px_#65BDB155] backdrop-blur-xl"
            >
              <h2 className="font-semibold mb-4 text-pink-400">Nuevo Paciente</h2>
              <form onSubmit={submit} className="space-y-3">
                {["nombre","edad","telefono","email","direccion"].map((field)=>(
                  <input
                    key={field}
                    value={form[field]}
                    onChange={e=>setForm({...form,[field]:e.target.value})}
                    placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
                    className="w-full p-2 rounded bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#65BDB1]"
                  />
                ))}
                <select value={form.genero} onChange={e=>setForm({...form,genero:e.target.value})} className="w-full p-2 rounded bg-white/5 border border-white/10">
                  <option>Masculino</option>
                  <option>Femenino</option>
                  <option>Otro</option>
                </select>
                <textarea value={form.historialMedico} onChange={e=>setForm({...form,historialMedico:e.target.value})} placeholder="Historial médico" className="w-full p-2 rounded bg-white/5 border border-white/10"/>
                <button disabled={loading} className="w-full py-2 rounded bg-gradient-to-r from-[#65BDB1] to-pink-500 shadow-[0_0_15px_#65BDB155]">
                  {loading ? "Guardando..." : "Crear"}
                </button>
              </form>
            </motion.div>

            {/* Lista */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="col-span-2 p-6 rounded-2xl bg-black/40 border border-pink-500/30 shadow-[0_0_20px_pink] backdrop-blur-xl"
            >
              <h2 className="font-semibold mb-4 text-[#65BDB1]">Lista de Pacientes</h2>
              <div className="space-y-3 max-h-[60vh] overflow-auto pr-2">
                {pacientes.map(p => (
                  <motion.div
                    key={p._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center hover:bg-white/10 transition"
                  >
                    <div>
                      <div className="font-medium text-pink-400">{p.nombre} <span className="text-sm text-gray-300">({p.edad})</span></div>
                      <div className="text-sm text-gray-300">{p.email} • {p.telefono}</div>
                    </div>
                    <button onClick={()=>remove(p._id)} className="px-3 py-1 rounded bg-rose-600/80 hover:bg-rose-700 transition">Eliminar</button>
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
