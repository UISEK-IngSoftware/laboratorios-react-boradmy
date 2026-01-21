import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Typography, Grid } from "@mui/material";
import { getEntrenadorById, createEntrenador, updateEntrenador } from "../services/trainerServices";
import { fetchPokemons } from "../services/pokemonServices";

export default function EntrenadorForm() {
  const { id } = useParams(); // si existe, estamos editando
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    city: "",
    specialty: "",
    picture: null,
    pokemons: [],
  });
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const allPokemons = await getPokemons();
      setPokemons(allPokemons);

      if (id) {
        const entrenador = await getEntrenadorById(id);
        setFormData({
          name: entrenador.name,
          age: entrenador.age,
          city: entrenador.city || "",
          specialty: entrenador.specialty || "",
          picture: null, // imagen nueva si se sube
          pokemons: entrenador.pokemons.map((p) => p.id),
        });
      }
    }
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture") {
      setFormData({ ...formData, picture: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePokemonSelect = (pokemonId) => {
    setFormData((prev) => {
      const alreadySelected = prev.pokemons.includes(pokemonId);
      return {
        ...prev,
        pokemons: alreadySelected
          ? prev.pokemons.filter((id) => id !== pokemonId)
          : [...prev.pokemons, pokemonId],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateEntrenador(id, formData);
      alert("Entrenador actualizado exitosamente");
    } else {
      await createEntrenador(formData);
      alert("Entrenador creado exitosamente");
    }
    navigate("/entrenadores");
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        {id ? "Editar Entrenador" : "Agregar Entrenador"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Edad"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Ciudad"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Especialidad"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              name="picture"
              accept="image/*"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Pokémons:</Typography>
            {pokemons.map((p) => (
              <div key={p.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.pokemons.includes(p.id)}
                    onChange={() => handlePokemonSelect(p.id)}
                  />
                  {p.name}
                </label>
              </div>
            ))}
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Guardar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/entrenadores")}
              style={{ marginLeft: "10px" }}
            >
              Volver
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}