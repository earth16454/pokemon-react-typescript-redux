import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../interface/interface";

interface PokemonFilterState {
  pokemonsFilter: Pokemon[];
}

const initialState: PokemonFilterState = {
  pokemonsFilter: [],
};

const filterReducer = createSlice({
  name: "pokemonFilter",
  initialState: initialState,
  reducers: {
    setPokemonFilter: (state, action: PayloadAction<any>) => {
      state.pokemonsFilter = action.payload;
    },
  }
})

export const { setPokemonFilter } = filterReducer.actions;

export default filterReducer.reducer;
