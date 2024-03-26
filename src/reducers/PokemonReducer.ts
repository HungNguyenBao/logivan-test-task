import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "api";
import { IPaginationParams, IPokemonApiData } from "models";

interface PokemonState {
  data?: IPokemonApiData;
  loading?: boolean;
}

const initialState: PokemonState = {
  loading: false,
};

export const getPokemonData = createAsyncThunk(
  "pokemon/list",
  async (payload?: IPaginationParams) => {
    const res = await api.pokemon.list(payload);
    return res;
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPokemonData.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(getPokemonData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPokemonData.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const POKEMON_ACTIONS = pokemonSlice.actions;

export default pokemonSlice.reducer;
