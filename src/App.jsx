import { Container } from '@mui/material';
import Header from './components/Header';
import PokemonList from './pages/PokemonList';
import PokemonForm from './pages/PokemonForm';
import PokemonDetail from './pages/PokemonDetail'; 
import LoginPage from './pages/LoginPage';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<PokemonList />} />
          <Route path='/add-pokemon' element={<PokemonForm />} />
          <Route path='/edit-pokemon/:id' element={<PokemonForm />} />
          <Route path='/pokemon/:id' element={<PokemonDetail />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;