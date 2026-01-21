import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PokemonCard({ pokemon, isLoggedIn, onDelete }) {
  const mediaUrl = import.meta.env.VITE_MEDIA_URL;
  pokemon.image = `${mediaUrl}/${pokemon.picture}`;
  const navigate = useNavigate();

  return (
    <Card>
      <CardMedia
        component="img"
        height={200}
        image={pokemon.image}
        alt={pokemon.name}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {pokemon.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tipo: {pokemon.type}
        </Typography>
      </CardContent>
      <CardActions>
        {/* Siempre visible */}
        <Button size="small" onClick={() => navigate(`/pokemon/${pokemon.id}`)}>
          Ver detalles
        </Button>

        {/* Solo si está logueado */}
        {isLoggedIn && (
          <>
            <Button size="small" onClick={() => navigate(`/edit-pokemon/${pokemon.id}`)}>
              Editar
            </Button>
            <Button size="small" color="error" onClick={() => onDelete(pokemon)}>
              Eliminar
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}