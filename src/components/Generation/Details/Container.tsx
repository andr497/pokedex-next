"use client";

import useSearch from "@/hooks/useSearch";
import { PokemonContainer } from "@/components/Pokemon";
import { IPokemonList } from "@/interfaces/IPokemonList";
import { Generation } from "@/interfaces/PokeApi/IGenerations";

import GenerationDetails from "./Details";
import GenerationSectionFilters from "./SearchFilters";

interface Props {
    pokemonData: IPokemonList[];
    generation: Generation;
}

const Container = ({ pokemonData, generation }: Props) => {
    const {
        handleChange,
        handleFiltersChange,
        list: pokemonList,
    } = useSearch({
        data: pokemonData,
        key: "name",
        filters: [
            {
                filterKey: "types",
                filterCallback: (data, value) => {
                    const filtered = data.filter((e) => {
                        return (
                            e.types.filter((t) => t.type.name.includes(value))
                                .length > 0
                        );
                    });

                    return filtered;
                },
            },
        ],
    });

    return (
        <section className="flex flex-col gap-4">
            <GenerationDetails generation={generation} />

            <GenerationSectionFilters
                placeholder={`Search a pokémon`}
                handleChange={handleChange}
                handleFiltersChange={handleFiltersChange}
            />

            <PokemonContainer pokemons={pokemonList} />
        </section>
    );
};

export default Container;
