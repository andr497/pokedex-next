import { cache } from "react";
import {
    convertDecimeterToMeter,
    convertHectogramToKilogram,
} from "@/helpers/converterHelper";
import {
    fixEvolutionNode,
    TreeEvolutionNode,
} from "@/helpers/evolutionChainPokemon";
import { CustomPokemon } from "@/interfaces/CustomPokeApi/CustomPokemon";
import {
    NamedAPIResource,
    PaginationData,
} from "@/interfaces/PokeApi/CommonModels";
import { http } from "./config/http";
import { pokemonRepository } from "./repositories/pokemon.repository";
import { speciesRepository } from "./repositories/species.repository";
import { extractIdFromUrl } from "./utils/url";

export const findPokemonById = cache(async (idToSearch: number | string) => {
    try {
        const pokemonData = await pokemonRepository.getById(idToSearch);
        const id = pokemonData.is_default
            ? idToSearch
            : pokemonData.species.name;

        const pokemonSpeciesData = await speciesRepository.getById(id);

        const pokemon = { ...pokemonData, ...pokemonSpeciesData };

        const evolutionUrl = pokemon.evolution_chain.url;

        const evolutionChain = await getEvolutionChain(evolutionUrl);

        const pokemon_genera = pokemon.genera.filter(
            (v) => v.language.name === "en",
        );

        const pokemonFlavor = pokemon.flavor_text_entries.filter(
            (v) => v.language.name === "en",
        );

        return {
            general: {
                id: pokemon.id,
                name: pokemonData.name ?? pokemon.name,
                color: pokemon.color.name,
                shape: pokemon?.shape?.name ?? null,
                genera:
                    pokemon_genera?.length > 0
                        ? pokemon_genera[0]?.genus
                        : "Not Available",
                flavor_entry:
                    pokemonFlavor?.length > 0
                        ? pokemonFlavor[0]?.flavor_text
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
                is_baby: pokemon.is_baby,
                is_mythical: pokemon.is_mythical,
                is_legendary: pokemon.is_legendary,
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
    } catch {
        return null;
    }
});

const getEvolutionChain = async (url: string): Promise<TreeEvolutionNode> => {
    const { data } = await http.get(url);
    return fixEvolutionNode(data.chain);
};

export const searchPokemonByName = async (
    name: string,
): Promise<CustomPokemon[]> => {
    const cleanName = name.trim().replaceAll(" ", "-").toLocaleLowerCase();

    if (!cleanName) return [];

    const { data: speciesList } = await http.get<
        PaginationData<NamedAPIResource[]>
    >("/pokemon-species", {
        params: {
            limit: -1,
        },
    });

    const filteredPokemonSpecies: NamedAPIResource[] =
        speciesList.results.filter((value) => value.name.includes(cleanName));

    return Promise.all(
        filteredPokemonSpecies.map(async (pokemon) => {
            const id = extractIdFromUrl(pokemon.url);

            const [species, pokemonData] = await Promise.all([
                speciesRepository.getById(id),
                pokemonRepository.getById(id),
            ]);

            return {
                id: species.id,
                name: species.name,
                types: pokemonData.types,
            };
        }),
    );
};
