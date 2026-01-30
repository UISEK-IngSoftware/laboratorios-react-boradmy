import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";

import PokemonCard from "../components/PokemonCard";
import { fetchPokemons } from "../services/pokemonServices";

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const isLoggedIn = localStorage.getItem("access_token") !== null;

  useEffect(() => {
    fetchPokemons()
      .then((data) => setPokemons(data))
      .catch((error) => {
        console.error(error);
        alert("Error obteniendo los pokemons");
      });
  }, []);

  const handleView = (pokemon) => {
    alert(`Ver detalles de ${pokemon.name}`);
  };

  const handleEdit = (pokemon) => {
    alert(`Editar ${pokemon.name}`);
  };

  const handleDelete = (pokemon) => {
    const confirmed = window.confirm(`¿Eliminar a ${pokemon.name}?`);
    if (confirmed) {
      alert(`${pokemon.name} eliminado (simulado)`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Lista de Pokemons
      </Typography>

      <Grid container spacing={2} marginTop={2}>
        {pokemons.map((pokemon) => (
          <Grid item xs={12} sm={6} md={4} key={pokemon.id}>
            <PokemonCard
              pokemon={pokemon}
              isLoggedIn={isLoggedIn}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}