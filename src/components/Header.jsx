import { AppBar, Button, Container, Toolbar } from "@mui/material";
import pokedexLogo from "../assets/pokedex-logo.png";
import { logout } from "../services/authServices";
import './Header.css';
import { useNavigate } from "react-router-dom";

export default function Header() {
  const isLoggedIn = localStorage.getItem('access_token') !== null;
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    alert("Sesión cerrada exitosamente");
    navigate('/');
  };

  return (
    <header className="pokedex-navbar">
      <Container>
        <AppBar position="static">
          <Toolbar>
            <div className="image-container">
              <img src={pokedexLogo} alt="Pokédex Logo" height={100} />
            </div>
          </Toolbar>
          <Toolbar>
            <Button color="inherit" href="/">Inicio</Button>
            {isLoggedIn ? (
              <>
                <Button color="inherit" href="/add-pokemon">Agregar Pokémon</Button>
                <Button color="inherit" onClick={handleLogout}>Cerrar sesión</Button>
              </>
            ) : (
              <Button color="inherit" href="/login">Iniciar sesión</Button>
            )}
          </Toolbar>
        </AppBar>
      </Container>
    </header>
  );
}