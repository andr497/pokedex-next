import { IPokemonList } from "./IPokemonList";
import { Pokemon } from "./PokeApi/IPokemonApi";
import { PokemonSpecies } from "./PokeApi/IPokemonSpecies";

export interface GeneralInfoPokemon
    extends Pick<
            Pokemon,
            "id" | "name" | "height" | "weight" | "types" | "forms"
        >,
        Pick<PokemonSpecies, "capture_rate"> {
    image: string;
    image_shiny: string;
    genera: string;
    color: string;
    shape: string;
}

export interface StatsPokemon {
    stat: {
        name: string;
        url: string;
    };
    effort: number;
    base_stat: number;
}

export interface IPokemonDetails {}
