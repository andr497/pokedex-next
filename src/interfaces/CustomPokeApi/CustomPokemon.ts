import { Pokemon } from "../PokeApi/IPokemonApi";
import { PokemonSpecies } from "../PokeApi/IPokemonSpecies";

export type CustomPokemon = {
    id: PokemonSpecies["id"];
    name: PokemonSpecies["name"];
    type: Pokemon["types"];
};
