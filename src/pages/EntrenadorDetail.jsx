import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { getEntrenadorById, deleteEntrenador } from "../services/trainerServices";

export default function EntrenadorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entrenador, setEntrenador] = useState(null);
  const mediaUrl = import.meta.env.VITE_MEDIA_URL;
  const isLoggedIn = localStorage.getItem("access_token") !== null;

  useEffect(() => {
    async function fetchEntrenador() {
      const data = await getEntrenadorById(id);
      setEntrenador(data);
    }
    fetchEntrenador();
  }, [id]);

  const handleDelete = async () => {
    await deleteEntrenador(id);
    alert("Entrenador eliminado exitosamente");
    navigate("/entrenadores");
  };

  if (!entrenador) return <p>Cargando...</p>;

  return (
    <Card sx={{ maxWidth: 500, margin: "20px auto" }}>
      {entrenador.picture && (
        <CardMedia
          component="img"
          height="300"
          image={`${mediaUrl}/${entrenador.picture}`}
          alt={entrenador.name}
        />
      )}
      <CardContent>
        <Typography variant="h4">{entrenador.name}</Typography>
        <Typography variant="body1">Edad: {entrenador.age}</Typography>
        {entrenador.city && <Typography variant="body1">Ciudad: {entrenador.city}</Typography>}
        {entrenador.specialty && (
          <Typography variant="body1">Especialidad: {entrenador.specialty}</Typography>
        )}

        <Typography variant="h6" sx={{ marginTop: 2 }}>Pokémons:</Typography>
        {entrenador.pokemons && entrenador.pokemons.length > 0 ? (
          <ul>
            {entrenador.pokemons.map((p) => (
              <li key={p.id}>{p.name} ({p.type})</li>
            ))}
          </ul>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Este entrenador no tiene pokémons asignados.
          </Typography>
        )}
      </CardContent>

      {isLoggedIn && (
        <CardContent>
          <Button variant="contained" color="primary" onClick={() => navigate(`/edit-entrenador/${id}`)}>
            Editar
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete} sx={{ ml: 2 }}>
            Eliminar
          </Button>
        </CardContent>
      )}
    </Card>
  );
}