import { IPokemonList } from "interfaces/IPokemonList";
import { AllPokemonSpecies } from "interfaces/PokeApi/IPokemonSpecies";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

let recoilPersistObject = recoilPersist();

if (typeof window !== "undefined") {
    recoilPersistObject = recoilPersist({
        key: "pokemon-data-persist",
        storage: window.sessionStorage,
    });
}

const { persistAtom } = recoilPersistObject;

export const countPokemonState = atom<number>({
    key: "countPokemonState",
    default: 0,
    effects_UNSTABLE: [persistAtom],
});

export const pokemonListState = atom<IPokemonList[]>({
    key: "pokemonListState",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const pokemonSearchListState = atom<AllPokemonSpecies["results"]>({
    key: "pokemonSearchListState",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const searchTextPokemonState = atom<string>({
    key: "searchTextPokemon",
    default: ""
})