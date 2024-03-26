export interface BaseDataApi<T> {
  success: boolean;
  data?: T;
  statusCode: number;
  message?: string;
  total?: number;
  error?: string;
}

export interface IPaginationParams {
  offset: number;
  limit: number;
}

export interface IBaseData {
  name: string;
  url: string;
}

export interface IPokemonApiData {
  count: number;
  next?: string;
  previous?: string;
  results: IBaseData[];
}

export interface IPokemonAbility {
  ability: IBaseData;
  is_hidden: boolean;
  slot: number;
}

export interface IStar {
  base_stat: number;
  effort: number;
  stat: IBaseData;
}

export interface IType {
  slot: number;
  type: IBaseData;
}

export interface IPokemonDetail {
  abilities: IPokemonAbility[];
  base_experience: number;
  height: number;
  id: number;
  name: string;
  order: number;
  sprites: {
    back_default: string;
    back_female?: string;
    back_shiny: string;
    back_shiny_female?: string;
    front_default: string;
    front_female?: string;
    front_shiny?: string;
    front_shiny_female?: string;
    other: {
      "official-artwork": {
        front_default: string;
        front_shiny?: string;
      };
    };
  };
  stats: IStar[];
  types: IType[];
  weight: number;
}
