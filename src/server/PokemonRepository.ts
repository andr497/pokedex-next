import { getPokemonByGenerations } from "@/api/generation";
import { getPokemonById, getPokemonSpeciesById } from "api/pokemon";
import axios, { AxiosResponse } from "axios";
import {
    convertDecimeterToMeter,
    convertHectogramToKilogram,
} from "helpers/converterHelper";
import { processEvolutionChain } from "helpers/evolutionChainPokemon";
import { IPokemonEvolutionChain } from "interfaces/IGeneral";
import { CustomPokemon } from "@/interfaces/CustomPokeApi/CustomPokemon";
import { axiosCacheInstance } from "@/api/config";

export const findPokemonById = async (idToSearch: number | string) => {
    try {
        const { data: pokemonData } = await getPokemonById(idToSearch);
        const id = pokemonData.is_default
            ? idToSearch
            : pokemonData.species.name;

        const { data: pokemonSpeciesData } = await getPokemonSpeciesById(id);

        const pokemon = { ...pokemonData, ...pokemonSpeciesData };

        const evolutionUrl = pokemon.evolution_chain.url;

        const evolutionChain = await getEvolutionChain(evolutionUrl);

        const pokemon_genera = pokemon.genera.filter(
            (v) => v.language.name === "en"
        );

        return {
            general: {
                id: pokemon.id,
                name: pokemon.name,
                color: pokemon.color.name,
                shape: pokemon?.shape?.name ?? null,
                genera:
                    pokemon_genera?.length > 0
                        ? pokemon_genera[0]?.genus
                        : "Not Available",
                height: convertDecimeterToMeter(pokemon.height),
                weight: convertHectogramToKilogram(pokemon.weight),
                types: pokemon.types,
                image: pokemon.sprites.other["official-artwork"].front_default,
                image_shiny:
                    pokemon.sprites.other["official-artwork"].front_shiny,
                forms: pokemon.forms,
                capture_rate: pokemon.capture_rate,
                cries: pokemon.cries,
                generation: pokemon.generation,
            },
            abilities: pokemon.abilities,
            moves: pokemon.moves,
            varieties: pokemon.varieties,
            stats: {
                id: pokemon.id,
                stats_details: pokemon.stats,
            },
            evolution_chain: evolutionChain,
            flavor_text_entries: pokemon.flavor_text_entries,
        };
    } catch (e) {
        return null;
    }
};

const getEvolutionChain = async (
    url: string
): Promise<IPokemonEvolutionChain[][]> => {
    const evolutionData = await axios(url, {
        method: "GET",
    }).then(async (res) => {
        return await res.data;
    });
    return processEvolutionChain(evolutionData);
};

export const findPokemonByGenerations = async (idToSearch: number | string) => {
    const { pokemonSpecies, generation } = await getPokemonByGenerations(
        idToSearch
    );

    return {
        pokemonSpecies: pokemonSpecies.sort((a, b) =>
            a.id < b.id ? -1 : a.id > b.id ? 1 : 0
        ),
        generation,
    };
};

export const searchPokemonByName = async (
    name: string
): Promise<CustomPokemon[]> => {
    const response: AxiosResponse<{ pokemon: CustomPokemon[] }> =
        await axiosCacheInstance({
            url: `/api/pokemon`,
            baseURL: `http://localhost:3000`,
            params: {
                name,
            },
        });

    return response.data.pokemon;
};
