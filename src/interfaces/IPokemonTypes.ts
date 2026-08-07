import { COLOR } from "./../helpers/constants";
import { IPokemonSimpleList } from "./IPokemonList";
import { TypeDetail } from "./PokeApi/IPokemonTypes";

type pokemonTypeKey = keyof typeof COLOR;

export interface pokemonTypes {
    name: pokemonTypeKey;
    url: string;
}

export interface IPokemonTypeDetails extends Omit<TypeDetail, "pokemon"> {
    pokemon: IPokemonSimpleList[];
}
