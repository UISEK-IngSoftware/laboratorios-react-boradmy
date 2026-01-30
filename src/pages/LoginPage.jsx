import { Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { login } from "../services/authServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const responseData = await login(
        loginData.username,
        loginData.password
      );

      localStorage.setItem("access_token", responseData.access_token);
      alert("Inicio de sesión exitoso");
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Inicio de sesión
      </Typography>

      <TextField
        label="Usuario"
        name="username"
        variant="outlined"
        value={loginData.username}
        onChange={handleChange}
        required
        disabled={loading}
      />

      <TextField
        label="Contraseña"
        name="password"
        type="password"
        variant="outlined"
        value={loginData.password}
        onChange={handleChange}
        required
        disabled={loading}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{ minWidth: 180 }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Iniciar sesión"}
      </Button>
    </Box>
  );
}
