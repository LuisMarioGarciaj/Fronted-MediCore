import api from "./axios";

export const getCitas = () => api.get("/citas");
export const getCita = (id) => api.get(`/citas/${id}`);
export const createCita = (data) => api.post("/citas", data);
export const updateCita = (id, data) => api.put(`/citas/${id}`, data);
export const deleteCita = (id) => api.delete(`/citas/${id}`);
