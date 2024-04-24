import { GenerationGameIndex, Name, NamedAPIResource } from "./CommonModels";

export interface TypeDetail {
    id: number;
    name: string;
    damage_relations: TypeRelations;
    past_damage_relations: TypeRelationsPast;
    game_indices: GenerationGameIndex;
    generation: NamedAPIResource;
    move_damage_class: NamedAPIResource;
    names: Name;
    pokemon: TypePokemon;
    moves: NamedAPIResource;
}

export interface TypePokemon {
    slot: number;
    pokemon: NamedAPIResource;
}

export interface TypeRelations {
    no_damage_to: NamedAPIResource[];
    half_damage_to: NamedAPIResource[];
    double_damage_to: NamedAPIResource[];
    no_damage_from: NamedAPIResource[];
    half_damage_from: NamedAPIResource[];
    double_damage_from: NamedAPIResource[];
}

export interface TypeRelationsPast {
    generation: NamedAPIResource;
    damage_relations: TypeRelations;
}

export interface TypeDefenses {
    very_weak: string[];
    weak: string[];
    normal: string[];
    resistant: string[];
    very_resistant: string[];
    immune: string[];
}