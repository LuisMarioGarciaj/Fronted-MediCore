import { useEffect, useState } from "react";
import { getRecetas, createReceta, updateReceta, deleteReceta } from "../api/recetaApi";
import { getPacientes } from "../api/pacienteApi";
import { getDoctores } from "../api/doctorApi";
import { getMedicamentos } from "../api/medicamentoApi";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Recetas() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ paciente: "", doctor: "", medicamento: "", indicaciones: "" });
  const [editId, setEditId] = useState(null);

  const [pacientes, setPacientes] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);

  const load = async () => {
    const res = await getRecetas();
    setItems(res.data);
    setPacientes((await getPacientes()).data);
    setDoctores((await getDoctores()).data);
    setMedicamentos((await getMedicamentos()).data);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      paciente: form.paciente,
      doctor: form.doctor,
      medicamentos: [{ medicamento: form.medicamento, indicaciones: form.indicaciones }],
    };
    if (editId) {
      await updateReceta(editId, payload);
      setEditId(null);
    } else {
      await createReceta(payload);
    }
    setForm({ paciente: "", doctor: "", medicamento: "", indicaciones: "" });
    await load();
  };

  const del = async (id) => {
    if (!confirm("Eliminar receta?")) return;
    await deleteReceta(id);
    await load();
  };

  const edit = (r) => {
    setForm({
      paciente: r.paciente?._id,
      doctor: r.doctor?._id,
      medicamento: r.medicamentos[0]?.medicamento?._id,
      indicaciones: r.medicamentos[0]?.indicaciones || "",
    });
    setEditId(r._id);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 flex-1 relative overflow-hidden">
          <motion.h1 className="text-4xl font-bold mb-6 text-pink-400 drop-shadow-[0_0_10px_pink]">
            Recetas
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Formulario */}
            <motion.form onSubmit={submit} className="col-span-1 p-6 rounded-2xl bg-black/40 border border-pink-500/30 shadow-[0_0_20px_pink] backdrop-blur-xl space-y-3">
              <select required value={form.paciente} onChange={e => setForm({ ...form, paciente: e.target.value })} className="w-full p-2 rounded bg-white/5 border border-white/10">
                <option value="">Seleccionar Paciente</option>
                {pacientes.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
              </select>
              <select required value={form.doctor} onChange={e => setForm({ ...form, doctor: e.target.value })} className="w-full p-2 rounded bg-white/5 border border-white/10">
                <option value="">Seleccionar Doctor</option>
                {doctores.map(d => <option key={d._id} value={d._id}>{d.nombre}</option>)}
              </select>
              <select required value={form.medicamento} onChange={e => setForm({ ...form, medicamento: e.target.value })} className="w-full p-2 rounded bg-white/5 border border-white/10">
                <option value="">Seleccionar Medicamento</option>
                {medicamentos.map(m => <option key={m._id} value={m._id}>{m.nombre}</option>)}
              </select>
              <textarea placeholder="Indicaciones" value={form.indicaciones} onChange={e => setForm({ ...form, indicaciones: e.target.value })} className="w-full p-2 rounded bg-white/5 border border-white/10"/>
              <button className="w-full py-2 rounded bg-gradient-to-r from-pink-500 to-[#65BDB1] shadow-[0_0_15px_pink]">
                {editId ? "Actualizar" : "Crear"}
              </button>
            </motion.form>

            {/* Listado */}
            <motion.div className="col-span-2 p-6 rounded-2xl bg-black/40 border border-pink-500/30 shadow-[0_0_20px_pink] backdrop-blur-xl">
              <h2 className="font-semibold mb-4 text-pink-400">Listado de Recetas</h2>
              <div className="space-y-3 max-h-[60vh] overflow-auto pr-2">
                {items.map(r => (
                  <motion.div key={r._id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center hover:bg-white/10 transition">
                    <div>
                      <div className="font-medium text-pink-400">Receta de {r.paciente?.nombre}</div>
                      <div className="text-sm text-gray-300">Doctor: {r.doctor?.nombre}</div>
                      {r.medicamentos.map((m, i) => (
                        <div key={i} className="text-sm text-gray-300">
                          {m.medicamento?.nombre} – {m.indicaciones}
                        </div>
                      ))}
                    </div>
                    <div className="space-x-2">
                      <button onClick={() => edit(r)} className="px-3 py-1 rounded bg-blue-600/80 hover:bg-blue-700">Editar</button>
                      <button onClick={() => del(r._id)} className="px-3 py-1 rounded bg-rose-600/80 hover:bg-rose-700">Eliminar</button>
                    </div>
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
