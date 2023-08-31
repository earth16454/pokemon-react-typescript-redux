import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../interface/interface";

interface PokemonState {
  pokemons: Pokemon[];
  selectedPokemon: Pokemon | null;
  url: string;
  count: number;
}

const initialState: PokemonState = {
  pokemons: [],
  selectedPokemon: null,
  url: "https://pokeapi.co/api/v2/pokemon/",
  count: 0,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: initialState,
  reducers: {
    setPokemon: (state, action: PayloadAction<any>) => {
      state.pokemons = action.payload;
    },
    setSelectedPokemon: (state, action: PayloadAction<any>) => {
      state.selectedPokemon = action.payload;
    },
    setPokemonUrl: (state, action: PayloadAction<any>) => {
      state.url = action.payload;
    },
    setPokemonCount: (state, action: PayloadAction<any>) => {
      state.count = action.payload;
    },
  }
})

export const { setPokemon, setSelectedPokemon, setPokemonUrl, setPokemonCount } = pokemonSlice.actions;

export default pokemonSlice.reducer;
