import { pokemonTypes } from "./IPokemonTypes";
import { Pokemon } from "./PokeApi/IPokemonApi";

export interface IPokemonList extends Pick<Pokemon, "id" | "name" | "types"> {}
