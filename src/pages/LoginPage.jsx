import { Box, Typography, TextField, Button } from '@mui/material';
import { login } from '../services/authServices';

export default function LoginPage() {


    
  return (
    <Box
      component="form"
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
        required
      />
      <TextField
        label="Contraseña"
        name="password"
        type="password"
        variant="outlined"
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Iniciar sesión
      </Button>
    </Box>
  );
}