import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function getEntrenadores() {
  const res = await axios.get(`${API_URL}/entrenadores/`);
  return res.data;
}

export async function getEntrenadorById(id) {
  const res = await axios.get(`${API_URL}/entrenadores/${id}/`);
  return res.data;
}

export async function createEntrenador(data) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("age", data.age);
  formData.append("city", data.city);
  formData.append("specialty", data.specialty);
  if (data.picture) formData.append("picture", data.picture);
  data.pokemons.forEach((p) => formData.append("pokemons", p));

  const res = await axios.post(`${API_URL}/entrenadores/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateEntrenador(id, data) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("age", data.age);
  formData.append("city", data.city);
  formData.append("specialty", data.specialty);
  if (data.picture) formData.append("picture", data.picture);
  data.pokemons.forEach((p) => formData.append("pokemons", p));

  const res = await axios.put(`${API_URL}/entrenadores/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteEntrenador(id) {
  await axios.delete(`${API_URL}/entrenadores/${id}/`);
}