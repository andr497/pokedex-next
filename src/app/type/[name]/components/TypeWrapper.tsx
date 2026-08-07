"use client";

import { PokemonGrid } from "@/components/Pokemon";
import useSearch from "@/hooks/useSearch";
import { IPokemonTypeDetails } from "@/interfaces/IPokemonTypes";
import { TypeDetail } from "@/interfaces/PokeApi/IPokemonTypes";

type Props = {
    type: IPokemonTypeDetails;
};

const TypeWrapper = ({ type }: Props) => {
    const {
        handleChange,
        handleFiltersChange,
        list: pokemonList,
    } = useSearch({
        data: type.pokemon,
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
            {pokemonList.length}
            <PokemonGrid pokemons={pokemonList} />
        </section>
    );
};

export default TypeWrapper;
