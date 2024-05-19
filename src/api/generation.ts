import { AxiosResponse } from "axios";

import { Generation } from "@/interfaces/PokeApi/IGenerations";
import {
    NamedAPIResource,
    PaginationData,
} from "@/interfaces/PokeApi/CommonModels";

import { axiosInstance } from "./config";
import { getPokemonById } from "./pokemon";
import { IPokemonList } from "@/interfaces/IPokemonList";

export const getGenerationById = async (
    id: string | number
): Promise<AxiosResponse<Generation>> => {
    const response = await axiosInstance({
        method: "get",
        url: `/generation/${id}`,
    });

    return response;
};

export const getGenerations = async (): Promise<Generation[]> => {
    const response: AxiosResponse<PaginationData<NamedAPIResource[]>> =
        await axiosInstance({
            method: "get",
            url: `/generation`,
        });

    const responseGenerations = await Promise.all(
        response.data.results.map(async (value) => {
            const splitted = value.url
                .split("/")
                .filter((value) => value !== "");
            const id = splitted[splitted.length - 1];

            const generation = await getGenerationById(id);

            return generation.data;
        })
    );

    return responseGenerations;
};

export const getPokemonByGenerations = async (
    id: string | number
): Promise<{
    pokemonSpecies: IPokemonList[];
    generation: Generation;
}> => {
    const {
        data: { pokemon_species, ...generation },
    } = await getGenerationById(id);

    const pokemonSpecies = await Promise.all(
        pokemon_species.map(async (pokemon) => {
            const splittedUrl = pokemon.url
                .split("/")
                .filter((value) => value !== "");
            const id = parseInt(splittedUrl[splittedUrl.length - 1]);
            const responsePokemon = await getPokemonById(id);
            const { types } = responsePokemon.data;

            return {
                id,
                name: pokemon.name,
                types,
            };
        })
    );

    return {
        pokemonSpecies,
        generation: {
            ...generation,
            pokemon_species: pokemon_species,
        },
    };
};
