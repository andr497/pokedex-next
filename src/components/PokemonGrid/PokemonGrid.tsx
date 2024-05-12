"use client";
import React, { useEffect, useMemo, useState } from "react";

import { IPokemonList, PokemonData } from "@/interfaces/IPokemonList";
import { MagnifyingGlassIcon as SearchIcon } from "@heroicons/react/20/solid";

import PokemonCard from "../PokemonCard";
import useSearch from "@/hooks/useSearch";
import { Generation } from "@/interfaces/PokeApi/IGenerations";
import CounterApiResource from "../ApiNamedResource/Counter";

interface Props {
    pokemonData: PokemonData[];
    generation: Generation;
}

const PokemonGrid = ({ pokemonData, generation }: Props) => {
    const { handleChange, list: pokemonList } = useSearch({
        data: pokemonData,
        key: "name",
    });

    const generationName = useMemo(
        () => generation.names.filter((name) => name.language.name === "en"),
        [generation]
    );

    return (
        <section className="flex flex-col gap-4">
            <section className="flex flex-wrap text-center justify-between gap-4">
                <div className="w-full">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold text-gray-200 sm:text-4xl">
                            {generationName[0].name}
                        </h2>
                        <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                            {`You can see the list of ${generationName[0].name} pokemons below`}
                        </p>
                        <p>
                            {generation.version_groups.map((version) => version.name).join(" ")}
                        </p>
                    </div>
                </div>
                <CounterApiResource
                    label={"Pokémon"}
                    list={generation.pokemon_species}
                />
                <CounterApiResource
                    label={"Abilities"}
                    list={generation.abilities}
                />
                <CounterApiResource label={"Types"} list={generation.types} />
                <CounterApiResource label={"Moves"} list={generation.moves} />
            </section>

            <div className="relative grid grid-cols-1">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <SearchIcon className="block h-6 w-6" />
                    <span className="sr-only">Search icon</span>
                </div>
                <input
                    type="text"
                    className={`w-full p-2 ps-10 text-gray-900 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    onChange={handleChange}
                    placeholder={`Search a pokémon of ${generationName[0].name}`}
                />
            </div>

            <section className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-2 gap-4">
                {pokemonList.map((pokemon, key) => (
                    <PokemonCard
                        pokemon={pokemon}
                        key={`pokemon-card-${key}`}
                    />
                ))}
            </section>
        </section>
    );
};

export default PokemonGrid;
