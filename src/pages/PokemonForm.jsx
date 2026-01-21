import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { addPokemon, fetchPokemonById, updatePokemon } from "../services/pokemonServices";

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
        // Editar
        await updatePokemon(id, pokemonData);
        alert("Pokémon actualizado exitosamente");
      } else {
        // Agregar
        await addPokemon(pokemonData);
        alert("Pokémon agregado exitosamente");
      }
      navigate("/");
    } catch (error) {
      console.error("Error guardando el Pokémon:", error);
      alert("Error guardando el Pokémon");
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {id ? "Editar Pokémon" : "Agregar Pokémon"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Nombre"
          name="name"
          variant="outlined"
          onChange={handleChange}
          value={pokemonData.name}
        />
        <TextField
          label="Tipo"
          name="type"
          variant="outlined"
          onChange={handleChange}
          value={pokemonData.type}
        />
        <TextField
          label="Peso"
          name="weight"
          variant="outlined"
          onChange={handleChange}
          value={pokemonData.weight}
        />
        <TextField
          label="Altura"
          name="height"
          variant="outlined"
          onChange={handleChange}
          value={pokemonData.height}
        />
        <input type="file" name="picture" onChange={handleChange} />
        <Button variant="contained" type="submit">
          {id ? "Actualizar" : "Guardar"}
        </Button>
      </Box>
    </>
  );
}