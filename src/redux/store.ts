import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "./pokemonSlice";
import filterReducer from "./filterReducer";
import typeSlice from "./typeSlice";

const store = configureStore({
  reducer: {
    pokemonData: pokemonSlice,
    pokemonFilter: filterReducer,
    pokemonType: typeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;