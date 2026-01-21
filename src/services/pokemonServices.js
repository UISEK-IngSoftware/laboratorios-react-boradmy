import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Obtener la lista de pokemones
 * @returns
 */
export async function fetchPokemons() {
  const response = await axios.get(`${API_BASE_URL}/pokemons`);
  console.log(response);
  return response.data;
}

/**
 * Convertir un archivo a Base64
 * @param {} file
 * @returns
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // reader.result ya incluye el encabezado, lo usamos completo
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Crear un nuevo pokemon
 * @param {*} pokemonData
 * @returns
 */
export async function addPokemon(pokemonData) {
  let pictureBase64 = "";

  if (pokemonData.picture) {
    pictureBase64 = await fileToBase64(pokemonData.picture);
  }

  const payload = {
    ...pokemonData,
    picture: pictureBase64,
  };

  const response = await axios.post(`${API_BASE_URL}/pokemons/`, payload);
  return response.data;
}

export async function logout() {
  const token = localStorage.getItem("access_token");
  if (!token) return;

  const params = new URLSearchParams();
  params.append("token", token);
  params.append("client_id", CLIENT_ID);
  params.append("client_secret", CLIENT_SECRET);

  await axios.post(`${AUTH_BASE_URL}/revoke_token/`, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  localStorage.removeItem("access_token");
}