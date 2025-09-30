import { useEffect, useState } from "react";
import { getCitas, createCita, updateCita, deleteCita } from "../api/citaApi";
import { getPacientes } from "../api/pacienteApi";
import { getDoctores } from "../api/doctorApi";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Citas() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ paciente: "", doctor: "", fecha: "", motivo: "" });
  const [editId, setEditId] = useState(null);

  const [pacientes, setPacientes] = useState([]);
  const [doctores, setDoctores] = useState([]);

  const load = async () => {
    const res = await getCitas();
    setItems(res.data);
    setPacientes((await getPacientes()).data);
    setDoctores((await getDoctores()).data);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateCita(editId, form);
      setEditId(null);
    } else {
      await createCita(form);
    }
    setForm({ paciente: "", doctor: "", fecha: "", motivo: "" });
    await load();
  };

  const del = async (id) => {
    if (!confirm("Eliminar cita?")) return;
    await deleteCita(id);
    await load();
  };

  const edit = (c) => {
    setForm({
      paciente: c.paciente?._id,
      doctor: c.doctor?._id,
      fecha: c.fecha?.substring(0, 16),
      motivo: c.motivo || "",
    });
    setEditId(c._id);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 flex-1 relative overflow-hidden">
          <motion.h1 className="text-4xl font-bold mb-6 text-[#65BDB1] drop-shadow-[0_0_10px_#65BDB1]">
            Citas
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Formulario */}
            <motion.form onSubmit={submit} className="col-span-1 p-6 rounded-2xl bg-black/40 border border-[#65BDB1]/30 shadow-[0_0_20px_#65BDB155] backdrop-blur-xl space-y-3">
              <select required value={form.paciente} onChange={e => setForm({ ...form, paciente: e.target.value })} className="w-full p-2 rounded bg-white/5 border border-white/10">
                <option value="">Seleccionar Paciente</option>
                {pacientes.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
              </select>
              <select required value={form.doctor} onChange={e => setForm({ ...form, doctor: e.target.value })} className="w-full p-2 rounded bg-white/5 border border-white/10">
                <option value="">Seleccionar Doctor</option>
                {doctores.map(d => <option key={d._id} value={d._id}>{d.nombre}</option>)}
              </select>
              <input type="datetime-local" required value={form.fecha} onChange={e => setForm({ ...form, fecha: e.target.value })} className="w-full p-2 rounded bg-white/5 border border-white/10"/>
              <input placeholder="Motivo" value={form.motivo} onChange={e => setForm({ ...form, motivo: e.target.value })} className="w-full p-2 rounded bg-white/5 border border-white/10"/>
              <button className="w-full py-2 rounded bg-gradient-to-r from-[#65BDB1] to-pink-500 shadow-[0_0_15px_#65BDB1]">
                {editId ? "Actualizar" : "Crear"}
              </button>
            </motion.form>

            {/* Listado */}
            <motion.div className="col-span-2 p-6 rounded-2xl bg-black/40 border border-[#65BDB1]/30 shadow-[0_0_20px_#65BDB155] backdrop-blur-xl">
              <h2 className="font-semibold mb-4 text-[#65BDB1]">Listado de Citas</h2>
              <div className="space-y-3 max-h-[60vh] overflow-auto pr-2">
                {items.map(c => (
                  <motion.div key={c._id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center hover:bg-white/10 transition">
                    <div>
                      <div className="font-medium text-[#65BDB1]">
                        {new Date(c.fecha).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-300">
                        {c.paciente?.nombre} con {c.doctor?.nombre} – {c.motivo}
                      </div>
                    </div>
                    <div className="space-x-2">
                      <button onClick={() => edit(c)} className="px-3 py-1 rounded bg-blue-600/80 hover:bg-blue-700">Editar</button>
                      <button onClick={() => del(c._id)} className="px-3 py-1 rounded bg-rose-600/80 hover:bg-rose-700">Eliminar</button>
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
