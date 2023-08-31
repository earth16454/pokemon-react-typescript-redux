import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypesAPI } from "../interface/interface";

interface TypeState {
  types: TypesAPI[];
}

const initialState: TypeState = {
  types: [],
};

const typeSlice = createSlice({
  name: "pokemonType",
  initialState: initialState,
  reducers: {
    setPokemonType: (state, action: PayloadAction<any>) => {
      state.types = action.payload;
    },
  }
})

export const { setPokemonType } = typeSlice.actions;

export default typeSlice.reducer;
