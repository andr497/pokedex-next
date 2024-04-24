import { GeneralInfoPokemon } from "./IPokemonDetails";

export interface IPokemonEvolutionChain {
    id: string;
    species_name: string;

    min_level: number;
    trigger_name: string;

    item: string;
    held_item: string;

    known_move: string;
    known_move_type: string;

    min_affection: number;
    min_beauty: number;
    min_happiness: number;

    needs_overworld_rain: boolean;
    party_species: string;
    party_type: string;
    time_of_day: string;
    trade_species: string;
    location: string;
    turn_upside_down: boolean;

    relative_physical_stats: number;

    gender: number;
    url: string;

    image: string;
    types: GeneralInfoPokemon["types"];
}
