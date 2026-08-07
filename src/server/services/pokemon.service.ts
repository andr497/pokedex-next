import { IPokemonSimpleList } from "@/interfaces/IPokemonList";

export const pokemonService = {
    sortedSimpleList(pokemons: IPokemonSimpleList[]) {
        return pokemons.sort((a, b) =>
            a.id < b.id ? -1 : a.id > b.id ? 1 : 0,
        );
    },
};
