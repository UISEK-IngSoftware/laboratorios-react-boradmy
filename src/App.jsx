import { Container, Grid } from '@mui/material';
import Header from './components/Header';
import PokemonList from './pages/PokemonList';
import PokemonForm from './pages/PokemonForm';
import LoginPage from './pages/LoginPage';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<PokemonList />} />
            <Route path='/add-pokemon' element={<PokemonForm />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;