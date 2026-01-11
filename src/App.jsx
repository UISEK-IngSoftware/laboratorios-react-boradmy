// App.jsx
import { Container, Grid } from '@mui/material'
import Header from './components/Header'
import { pokemons } from './data/pokemons'

import './App.css'
import PokemonCard from './components/PokemonCard'

function App() {
  return (
    <>
      <Header />
      <Container>
        <Grid container spacing={2} marginTop={2}>
          {pokemons.map((pokemon, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <PokemonCard pokemon={pokemon} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default App