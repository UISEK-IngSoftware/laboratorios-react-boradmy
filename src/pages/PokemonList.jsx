import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import PokemonCard from "../components/PokemonCard";
import { fetchPokemons } from "../services/pokemonServices";

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetchPokemons()
      .then((data) => setPokemons(data))
      .catch((error) => {
        console.error(error);
        alert("Error obteniendo los pokemons");
      });
  }, []);

  return (
    <Grid container spacing={2} marginTop={2}>
      {pokemons.map((pokemon) => (
        <Grid item xs={12} sm={6} md={4} key={pokemon.id}>
          <PokemonCard pokemon={pokemon} />
        </Grid>
      ))}
    </Grid>
  );
}
