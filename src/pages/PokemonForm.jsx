import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography
} from "@mui/material";
import {
  addPokemon,
  fetchPokemonById,
  updatePokemon
} from "../services/pokemonServices";
import "./PokemonForm.css";

export default function PokemonForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // ← detecta si estamos editando
  const [pokemonData, setPokemonData] = useState({
    name: "",
    type: "",
    weight: "",
    height: "",
    picture: null,
  });

  // Si hay id, cargamos el Pokémon existente
  useEffect(() => {
    if (id) {
      fetchPokemonById(id)
        .then((data) => {
          setPokemonData({
            name: data.name,
            type: data.type,
            weight: data.weight,
            height: data.height,
            picture: null, // la imagen se carga aparte
          });
        })
        .catch((error) => {
          console.error("Error cargando el Pokémon:", error);
          alert("Error cargando el Pokémon");
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture") {
      setPokemonData({ ...pokemonData, picture: files[0] });
    } else {
      setPokemonData({ ...pokemonData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updatePokemon(id, pokemonData);
        alert("Pokémon actualizado exitosamente");
      } else {
        await addPokemon(pokemonData);
        alert("Pokémon agregado exitosamente");
      }
      navigate("/pokemons");
    } catch (error) {
      console.error("Error guardando el Pokémon:", error);
      alert("Error guardando el Pokémon");
    }
  };

  return (
    <Card className="form-card">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {id ? "Editar Pokémon" : "Agregar Pokémon"}
        </Typography>
        <form onSubmit={handleSubmit} className="form-container">
          <TextField
            label="Nombre"
            name="name"
            value={pokemonData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tipo"
            name="type"
            value={pokemonData.type}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Peso"
            name="weight"
            value={pokemonData.weight}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Altura"
            name="height"
            value={pokemonData.height}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          {/* 👇 Campo de archivo */}
          <input
            type="file"
            name="picture"
            accept="image/*"
            onChange={handleChange}
            className="file-input"
          />

          <div className="form-actions">
            <Button type="submit" variant="contained" color="success">
              {id ? "Guardar cambios" : "Guardar"}
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => navigate("/pokemons")}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}