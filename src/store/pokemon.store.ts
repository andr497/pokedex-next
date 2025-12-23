import { IPokemonList } from "@/interfaces/IPokemonList";
import { AllPokemonSpecies } from "@/interfaces/PokeApi/IPokemonSpecies";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PokemonStore {
    countPokemon: number;
    pokemonList: IPokemonList[];
    pokemonSearchList: AllPokemonSpecies["results"];
    searchTextPokemon: string;

    setCountPokemon: (count: number) => void;
    setPokemonList: (list: IPokemonList[]) => void;
    setPokemonSearchList: (list: AllPokemonSpecies["results"]) => void;
    setSearchTextPokemon: (text: string) => void;
    reset: () => void;
}

export const usePokemonStore = create<PokemonStore>()(
    persist(
        (set) => ({
            countPokemon: 0,
            pokemonList: [],
            pokemonSearchList: [],
            searchTextPokemon: "",

            setCountPokemon: (count) => set({ countPokemon: count }),
            setPokemonList: (list) => set({ pokemonList: list }),
            setPokemonSearchList: (list) => set({ pokemonSearchList: list }),
            setSearchTextPokemon: (text) => set({ searchTextPokemon: text }),

            reset: () =>
                set({
                    countPokemon: 0,
                    pokemonList: [],
                    pokemonSearchList: [],
                    searchTextPokemon: "",
                }),
        }),
        {
            name: "pokemon-data-persist",
            storage: {
                getItem: (name) =>
                    typeof window !== "undefined"
                        ? sessionStorage.getItem(name)
                        : null,
                setItem: (name, value) =>
                    typeof window !== "undefined"
                        ? sessionStorage.setItem(name, value)
                        : undefined,
                removeItem: (name) =>
                    typeof window !== "undefined"
                        ? sessionStorage.removeItem(name)
                        : undefined,
            },
        }
    )
);
