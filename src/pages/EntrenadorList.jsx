import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import EntrenadorCard from "../components/EntrenadorCard";
import { getEntrenadores, deleteEntrenador } from "../services/trainerServices";

export default function EntrenadorList() {
  const [entrenadores, setEntrenadores] = useState([]);
  const isLoggedIn = localStorage.getItem("access_token") !== null;

  useEffect(() => {
    async function fetchEntrenadores() {
      const data = await getEntrenadores();
      setEntrenadores(data);
    }
    fetchEntrenadores();
  }, []);

  const handleDelete = async (entrenador) => {
    if (window.confirm(`¿Seguro que quieres eliminar a ${entrenador.name}?`)) {
      await deleteEntrenador(entrenador.id);
      setEntrenadores(entrenadores.filter((e) => e.id !== entrenador.id));
      alert("Entrenador eliminado exitosamente");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Lista de Entrenadores
      </Typography>
      <Grid container spacing={2}>
        {entrenadores.map((e) => (
          <Grid item xs={12} sm={6} md={4} key={e.id}>
            <EntrenadorCard
              entrenador={e}
              isLoggedIn={isLoggedIn}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}