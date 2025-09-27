import api from "./axios";

export const getMedicamentos = () => api.get("/medicamentos");
export const getMedicamento = (id) => api.get(`/medicamentos/${id}`);
export const createMedicamento = (data) => api.post("/medicamentos", data);
export const updateMedicamento = (id, data) => api.put(`/medicamentos/${id}`, data);
export const deleteMedicamento = (id) => api.delete(`/medicamentos/${id}`);
