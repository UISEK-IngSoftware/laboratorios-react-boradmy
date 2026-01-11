// src/components/PokemonList.jsx

import { Grid } from '@mui/material'
import { pokemons } from '../data/pokemons'
import PokemonCard from './PokemonCard'

export default function PokemonList() {
  return (
    <Grid container spacing={2} marginTop={2}>
      {pokemons.map((pokemon, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <PokemonCard pokemon={pokemon} />
        </Grid>
      ))}
    </Grid>
  )
}