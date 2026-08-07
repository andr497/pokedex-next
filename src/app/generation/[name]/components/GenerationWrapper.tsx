"use client";

import useSearch from "@/hooks/useSearch";
import { PokemonGrid } from "@/components/Pokemon";

import GenerationSectionFilters from "./GenerationSectionFilters";
import GenerationHeroSection from "./GenerationHeroSection";
import { IGenerationDetails } from "@/interfaces/IGeneration";

type Props = {
    generation: IGenerationDetails;
};

const GenerationWrapper = ({ generation }: Props) => {
    const {
        handleChange,
        handleFiltersChange,
        list: pokemonList,
    } = useSearch({
        data: generation.pokemon,
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
            <GenerationHeroSection generation={generation} />

            <GenerationSectionFilters
                placeholder={`Search a pokémon`}
                handleChange={handleChange}
                handleFiltersChange={handleFiltersChange}
            />

            <PokemonGrid pokemons={pokemonList} />
        </section>
    );
};

export default GenerationWrapper;
