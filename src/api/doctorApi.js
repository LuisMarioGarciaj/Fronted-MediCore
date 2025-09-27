import api from "./axios";

export const getDoctores = () => api.get("/doctores");
export const getDoctor = (id) => api.get(`/doctores/${id}`);
export const createDoctor = (data) => api.post("/doctores", data);
export const updateDoctor = (id, data) => api.put(`/doctores/${id}`, data);
export const deleteDoctor = (id) => api.delete(`/doctores/${id}`);
