import { TypeDetail } from "@/interfaces/PokeApi/IPokemonTypes";
import { typeRepository } from "../repositories/types.repository";
import { limitConcurrency } from "../utils/concurrency";
import { extractIdFromUrl } from "../utils/url";
import { IdName } from "@/interfaces/ICommons";
import { IPokemonTypeDetails } from "@/interfaces/IPokemonTypes";
import { pokemonRepository } from "../repositories/pokemon.repository";
import { pokemonService } from "./pokemon.service";

export const typeService = {
    async getList(): Promise<TypeDetail[]> {
        const { results: types } = await typeRepository.getAll({ limit: -1 });

        const typeDetail = await Promise.all(
            types.map(({ url }) =>
                limitConcurrency(async () => {
                    const id = extractIdFromUrl(url);

                    const data = await typeRepository.getById(id);

                    return data;
                }),
            ),
        );

        return typeDetail;
    },

    async getDetailById(id: IdName): Promise<IPokemonTypeDetails> {
        const { pokemon, ...type } = await typeRepository.getById(id);

        const pokemons = await Promise.all(
            pokemon.map(({ pokemon: { url } }) =>
                limitConcurrency(async () => {
                    const id = extractIdFromUrl(url);
                    return pokemonRepository.getById(id);
                }),
            ),
        );

        const filteredPokemons = pokemons.filter((p) => p.is_default);

        return {
            ...type,
            pokemon: pokemonService.sortedSimpleList(
                filteredPokemons.map(({ id, name, types }) => ({
                    id,
                    name,
                    types,
                })),
            ),
        };
    },
};
