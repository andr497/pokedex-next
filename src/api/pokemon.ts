import axios from "axios";
import { axiosInstance } from "./config";
import { LIMIT_PAGE, OFFSET_PAGE } from "helpers/constants";
import { IAbility } from "interfaces/PokeApi/IAbility";
import { Pokemon } from "interfaces/PokeApi/IPokemonApi";
import {
    AllPokemonSpecies,
    PokemonSpecies,
} from "interfaces/PokeApi/IPokemonSpecies";

export const fetchPokemonList = async (url: string) => {
    const allPokemonResponse = await axios({
        method: "get",
        url: `/api/${url}`,
    });

    return allPokemonResponse.data;
};

export const getPokemonList = async (url: string) => {
    let limit = LIMIT_PAGE;
    let offset = OFFSET_PAGE;

    //offset = (page - 1) * limit;

    const allPokemonResponse = await axiosInstance({
        method: "get",
        url: `/${url}`,
        params: {
            limit,
            offset,
        },
    });

    const {
        data,
        data: { count },
    } = allPokemonResponse;

    let pokemonList = await Promise.all(
        data.results.map(async (value: any) => {
            let pokemonId = value.url.split("/")[6];
            let pokemon = await getPokemonById(pokemonId).then((res) => res);

            return {
                id: pokemonId,
                name: pokemon.species.name,
                types: pokemon.types,
            };
        })
    );

    return {
        pokemonList,
        pokemonTotal: count,
    };
};

export const getAllPokemon = async (): Promise<
    AllPokemonSpecies["results"]
> => {
    const response = await axiosInstance({
        method: "get",
        url: `/pokemon-species`,
        params: {
            limit: 2000,
        },
    });

    return response.data.results;
};

export const getPokemonById = async (id: number | string): Promise<Pokemon> => {
    const response = await axiosInstance({
        method: "get",
        url: `/pokemon/${id}`,
    });

    return response.data;
};

export const getPokemonSpeciesById = async (
    id: number | string
): Promise<PokemonSpecies> => {
    const response = await axiosInstance({
        method: "get",
        url: `/pokemon-species/${id}`,
    });

    return response.data;
};

export const getAbilityById = async (
    id: number | string
): Promise<IAbility> => {
    const response = await axiosInstance({
        method: "get",
        url: `/ability/${id}`,
    });

    return response.data;
};
