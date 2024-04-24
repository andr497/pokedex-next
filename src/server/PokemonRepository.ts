import { getPokemonById, getPokemonSpeciesById } from "api/pokemon";
import axios from "axios";
import {
    convertDecimeterToMeter,
    convertHectogramToKilogram,
} from "helpers/converterHelper";
import { processEvolutionChain } from "helpers/evolutionChainPokemon";
import { IPokemonEvolutionChain } from "interfaces/IGeneral";

export const findPokemonById = async (idToSearch: number | string) => {
    try {
        const pokemonData = await getPokemonById(idToSearch);
        const id = pokemonData.is_default
            ? idToSearch
            : pokemonData.species.name;

        const pokemonSpeciesData = await getPokemonSpeciesById(id);

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
                image_shiny: pokemon.sprites.other["official-artwork"].front_shiny,
                forms: pokemon.forms,
                capture_rate: pokemon.capture_rate
            },
            abilities: pokemon.abilities,
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

