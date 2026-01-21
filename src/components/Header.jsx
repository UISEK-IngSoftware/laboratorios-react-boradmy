import { AppBar, Container, Toolbar } from "@mui/material";
import pokedexLogo from "../assets/pokedex-logo.png";
import { logout } from "../services/authServices";
import './Header.css';
import { useNavigate, NavLink } from "react-router-dom";

export default function Header() {
  const isLoggedIn = localStorage.getItem('access_token') !== null;
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    alert("Sesión cerrada exitosamente");
    navigate('/'); 
    window.location.reload();
  };

  return (
    <header className="pokedex-navbar">
      <Container>
        <AppBar position="static">
          <Toolbar style={{ justifyContent: 'center' }}>
            <div className="image-container">
              <img src={pokedexLogo} alt="Pokédex Logo" height={100} />
            </div>
          </Toolbar>
          <Toolbar>
            <div className="nav-buttons">
              <NavLink to="/" className="nav-btn">Inicio</NavLink>
              {isLoggedIn && (
                <NavLink to="/add-pokemon" className="nav-btn add-btn">
                  Agregar Pokémon
                </NavLink>
              )}
            </div>
            <div className="auth-buttons">
              {isLoggedIn ? (
                <button className="logout-btn" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              ) : (
                <NavLink to="/login" className="login-btn">
                  Iniciar sesión
                </NavLink>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </Container>
    </header>
  );
}