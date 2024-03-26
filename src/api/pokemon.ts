import { IPaginationParams, IPokemonApiData, IPokemonDetail } from "models";
import Caller from "./Caller";

const PokemonAPI = {
  list: (params?: IPaginationParams) =>
    Caller.get<IPokemonApiData>(
      `v2/pokemon/?offset=${params?.offset || 0}&limit=${params?.offset || 100}`
    ),
  detail: (url: string) => Caller.get<IPokemonDetail>(url, ""),
};

export default PokemonAPI;
