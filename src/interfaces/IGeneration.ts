import { IPokemonSimpleList } from "./IPokemonList";
import { Generation } from "./PokeApi/IGenerations";

export interface IGenerationDetails extends Omit<
    Generation,
    "pokemon_species"
> {
    pokemon: IPokemonSimpleList[];
}
