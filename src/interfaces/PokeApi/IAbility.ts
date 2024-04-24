import { Effect, Name, NamedAPIResource, VerboseEffect } from "./CommonModels";

export interface IAbility {
    id: number;
    name: string;
    is_main_series: boolean;
    generation: NamedAPIResource;
    names: Name[];
    effect_entries: VerboseEffect[];
    effect_changes: AbilityFlavorText[];
    flavor_text_entries: [];
}

export interface AbilityEffectChange {
    effect_entries: Effect[];
    version_group: NamedAPIResource;
}

export interface AbilityFlavorText {
    flavor_text: string;
    language: NamedAPIResource;
    version_group: NamedAPIResource;
}

export interface AbilityPokemon {
    is_hidden: boolean;
    slot: number;
    pokemon: NamedAPIResource;
}