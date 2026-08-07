import axios, { AxiosResponse } from "axios";

import { Generation } from "@/interfaces/PokeApi/IGenerations";
import {
    NamedAPIResource,
    PaginationData,
} from "@/interfaces/PokeApi/CommonModels";

import { axiosInstance, clientAxios, clientHttp } from "./config";
import { getPokemonById } from "./pokemon";
import { IPokemonList } from "@/interfaces/IPokemonList";
import { IGenerationDetails } from "@/interfaces/IGeneration";

export const getGenerationById = async (
    id: string | number,
): Promise<AxiosResponse<Generation> | null> => {
    try {
        const response = await axiosInstance({
            method: "get",
            url: `/generation/${id}`,
        });

        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                return null;
            }
        }

        throw error;
    }
};

export const getGenerations = async (): Promise<Generation[]> => {
    const response: AxiosResponse<Generation[]> =
        await clientAxios.get(`/generations`);

    return response.data;
};

export const getGenerationDetail = async (
    id: string | number,
): Promise<IGenerationDetails> => {
    const response: AxiosResponse<IGenerationDetails> = await clientAxios.get(
        `/generations/${id}`,
    );

    return response.data;
};

export const getPokemonByGenerations2 = async (
    id: string | number,
): Promise<{
    pokemonSpecies: IPokemonList[];
    generation: Generation;
} | null> => {
    const generationData = await getGenerationById(id);
    if (!generationData) return null;

    const {
        data: { pokemon_species, ...generation },
    } = generationData;

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
        }),
    );

    return {
        pokemonSpecies,
        generation: {
            ...generation,
            pokemon_species: pokemon_species,
        },
    };
};
