import api from "./axios";

export const getEspecialidades = () => api.get("/especialidades");
export const createEspecialidad = (data) => api.post("/especialidades", data);
export const updateEspecialidad = (id, data) => api.put(`/especialidades/${id}`, data);
export const deleteEspecialidad = (id) => api.delete(`/especialidades/${id}`);
