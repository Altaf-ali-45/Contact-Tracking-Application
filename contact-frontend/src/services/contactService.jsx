import api from "../api/axios";

export const getContacts = (page = 0, size = 10) =>
  api.get(`/contacts?page=${page}&size=${size}`);

export const getContactById = (id) => api.get(`/contacts/${id}`);

export const createContact = (data) => api.post("/contacts", data);

export const updateContact = (id, data) => api.put(`/contacts/${id}`, data);

export const deleteContact = (id) => api.delete(`/contacts/${id}`);
