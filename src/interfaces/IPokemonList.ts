import { pokemonTypes } from "./IPokemonTypes";
import { Pokemon } from "./PokeApi/IPokemonApi";
import { PokemonSpecies } from "./PokeApi/IPokemonSpecies";

//export interface IPokemonList extends Pick<Pokemon, "id" | "name" | "types"> {}

export type PokemonData = Pokemon & PokemonSpecies;

export interface IPokemonList {
    id: Pokemon["id"];
    name: Pokemon["name"];
    types: Pokemon["types"];
}
