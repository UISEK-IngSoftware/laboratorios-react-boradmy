import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, CardMedia, CardContent } from "@mui/material";
import { fetchPokemonById } from "../services/pokemonServices";

export default function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetchPokemonById(id)
      .then((data) => setPokemon(data))
      .catch((error) => {
        console.error(error);
        alert("Error obteniendo el Pokémon");
      });
  }, [id]);

  if (!pokemon) return <p>Cargando...</p>;

  const mediaUrl = import.meta.env.VITE_MEDIA_URL;
  const image = `${mediaUrl}/${pokemon.picture}`;

  return (
    <Card sx={{ maxWidth: 400, margin: "2em auto" }}>
      <CardMedia component="img" height={300} image={image} alt={pokemon.name} />
      <CardContent>
        <Typography variant="h4">{pokemon.name}</Typography>
        <Typography variant="body1">Tipo: {pokemon.type}</Typography>
        <Typography variant="body1">Altura: {pokemon.height}</Typography>
        <Typography variant="body1">Peso: {pokemon.weight}</Typography>
      </CardContent>
    </Card>
  );
}