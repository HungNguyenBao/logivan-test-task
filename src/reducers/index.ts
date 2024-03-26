import { combineReducers } from "redux";
import PokemonReducer from "./PokemonReducer";

const reducers = combineReducers({
  pokemon: PokemonReducer,
});

export default reducers;
