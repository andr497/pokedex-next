import { Generation } from "@/interfaces/PokeApi/IGenerations";
import { generationRepository } from "../repositories/generation.repository";
import { limitConcurrency } from "../utils/concurrency";
import { extractIdFromUrl } from "../utils/url";
import { pokemonRepository } from "../repositories/pokemon.repository";
import { IGenerationDetails } from "@/interfaces/IGeneration";
import { pokemonService } from "./pokemon.service";

type IdName = string | number;

export const generationService = {
    async getList(): Promise<Generation[]> {
        const { results: generations } = await generationRepository.getAll();

        const generationDetail = await Promise.all(
            generations.map((generation) =>
                limitConcurrency(async () => {
                    const id = extractIdFromUrl(generation.url);

                    const data = await generationRepository.getById(id);

                    return data;
                }),
            ),
        );

        return generationDetail;
    },

    async getDetailById(id: IdName): Promise<IGenerationDetails> {
        const { pokemon_species, ...generation } =
            await generationRepository.getById(id);

        const pokemons = await Promise.all(
            pokemon_species.map(({ url }) =>
                limitConcurrency(async () => {
                    const id = extractIdFromUrl(url);
                    const data = await pokemonRepository.getById(id);

                    return data;
                }),
            ),
        );

        return {
            ...generation,
            pokemon: pokemonService.sortedSimpleList(
                pokemons.map(({ id, species: { name }, types }) => ({
                    id,
                    name,
                    types,
                })),
            ),
        };
    },
};
