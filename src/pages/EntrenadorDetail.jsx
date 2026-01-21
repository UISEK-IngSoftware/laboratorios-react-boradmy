import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { getEntrenadorById } from "../services/trainerServices";
import "./EntrenadorDetail.css";

export default function EntrenadorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entrenador, setEntrenador] = useState(null);

  useEffect(() => {
    async function fetchEntrenador() {
      const data = await getEntrenadorById(id);
      setEntrenador(data);
    }
    fetchEntrenador();
  }, [id]);

  if (!entrenador) return <Typography>Cargando...</Typography>;

  return (
    <Card className="detail-card">
      <CardContent>
        <Typography variant="h4">{entrenador.name}</Typography>
        <Typography variant="body1">Edad: {entrenador.age}</Typography>
        <Typography variant="body1">Ciudad: {entrenador.city}</Typography>
        <Typography variant="body1">Especialidad: {entrenador.specialty}</Typography>

        <div className="detail-actions">
        
          <Button
            variant="contained"
            color="error"
            onClick={() => navigate("/entrenadores")}
          >
            Volver
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}