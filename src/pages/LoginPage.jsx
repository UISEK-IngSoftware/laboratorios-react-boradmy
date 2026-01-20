import { Box, Typography, TextField, Button } from '@mui/material';
import { login } from '../services/authServices';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
 
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const responseData = await login(loginData.username, loginData.password);
    localStorage.setItem('access_token', responseData.access_token);
    alert("Inicio de sesión exitoso");
    navigate('/');
  } catch (error) {
    console.error("Error during login:", error);
    alert("Error al iniciar sesión");
  }
};

  return (
    <Box
      component="form" onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
      />
      <TextField
        label="Contraseña"
        name="password"
        type="password"
        variant="outlined"
        value={loginData.password}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Iniciar sesión
      </Button>
    </Box>
  );
}