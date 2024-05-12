export type NamedAPIResourceWithId<T = string> = {
    id: number | string;
    name: T;
}

export type APIResource = {
    url: string;
};

export type NamedAPIResource<T = string> = {
    url: string;
    name: T;
};

export type Description = {
    description: string;
    language: NamedAPIResource;
};

export type Effect = {
    effect: string;
    language: NamedAPIResource;
}

export type Encounter = {
    min_level: number;
    max_level: number;
    condition_values: NamedAPIResource[];
    chance: number;
    method: NamedAPIResource;
}

export type FlavorText = {
    flavor_text: string;
    language: NamedAPIResource;
    version: NamedAPIResource;
}

export type GenerationGameIndex = {
    game_index: number;
    generation: NamedAPIResource;
}

export type MachineVersionDetail = {
    machine: APIResource;
    version: NamedAPIResource;
}

export type Name = {
    name: string;
    language: NamedAPIResource;
}

export type VerboseEffect = {
    effect: string;
    short_effect: string;
    language: NamedAPIResource;
}

export type VersionEncounterDetail = {
    version: NamedAPIResource;
    max_chance: number;
    encounter_details: Encounter[];
}

export type VersionGameIndex = {
    game_index: number;
    version: NamedAPIResource;
}

export type VersionGroupFlavorText = {
    text: string;
    language: NamedAPIResource;
    version_group: NamedAPIResource;
}

export type PaginationData<T> = {
    count: number,
    next: string | null,
    previous: null,
    results: T
}