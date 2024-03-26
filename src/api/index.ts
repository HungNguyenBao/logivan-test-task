import PokemonAPI from "./pokemon";

const api = {
  pokemon: PokemonAPI,
};

export type ApiType = typeof api;

export default api;
