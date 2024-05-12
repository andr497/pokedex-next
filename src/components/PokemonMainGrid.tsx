"use client";
import React, { useEffect, useState } from "react";

import useSWR from "swr";
import { useRecoilState, useRecoilValue } from "recoil";

import { fetchPokemonList } from "api/pokemon";
import { getAllPokemonTypes } from "api/types";
import { IPokemonList } from "interfaces/IPokemonList";
import { NamedAPIResourceWithId } from "interfaces/PokeApi/CommonModels";

import { Loader, Rectangular } from "./Skeleton";
import PokemonListGrid from "./PokemonList/PokemonListGrid";
import { pokemonListState, searchTextPokemonState } from "../recoil/atoms";

const PokemonMainGrid = () => {
    const [isClient, setIsClient] = useState(false);
    const [triggerFetch, setTriggerFetch] = useState<boolean>(false);

    const { data: options } = useSWR({ limit: 18 }, getAllPokemonTypes);
    const [primaryTypeOption, setPrimaryTypeOption] =
        useState<NamedAPIResourceWithId>(
            typeof options === "undefined" ? { name: "", id: "" } : options[0]
        );
    const [secondaryTypeOption, setSecondaryTypeOption] =
        useState<NamedAPIResourceWithId>(
            typeof options === "undefined" ? { name: "", id: "" } : options[0]
        );

    const { data, isLoading, error } = useSWR(
        triggerFetch ? "pokemon" : null,
        fetchPokemonList
    );

    const [pokemonList, setPokemonList] =
        useRecoilState<IPokemonList[]>(pokemonListState);

    const [pokemon, setPokemon] = useState<IPokemonList[]>(pokemonList);
    const searchText = useRecoilValue<string>(searchTextPokemonState);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (pokemonList.length === 0) {
            setTriggerFetch(true);
            if (typeof data !== "undefined") {
                setPokemonList(data.pokemonList);
                setPokemon(data.pokemonList);
            } else {
                setPokemon(pokemonList);
            }
        }
    }, [data, pokemonList, pokemon, setPokemonList]);

    useEffect(() => {
        let filterPokemon = pokemonList.filter((e) =>
            e.name.toLowerCase().includes(searchText.toLowerCase())
        );

        filterPokemon.filter((e) => {
            if (e.types.length > 1) {
                return e;
            }
        });

        if (primaryTypeOption.id !== "") {
            filterPokemon = filterPokemon.filter(
                (e) => e.types[0].type.name === primaryTypeOption.name
            );
        }

        if (secondaryTypeOption.id !== "") {
            filterPokemon = filterPokemon.filter((e) => {
                return (
                    e.types.length > 1 &&
                    e.types[1].type.name === secondaryTypeOption.name
                );
            });
        }
        setPokemon(filterPokemon);
    }, [searchText, pokemonList, primaryTypeOption, secondaryTypeOption]);

    return (
        <>
            {isClient && (
                <>
                    {!isLoading && typeof pokemonList !== "undefined" ? (
                        <PokemonListGrid pokemon={pokemon} />
                    ) : error ? null : (
                        <Loader className="w-full">
                            <Rectangular
                                height={300}
                                elements={24}
                                gap={8}
                                className="flex items-center justify-center bg-gray-300 dark:bg-gray-200 rounded-md dark:opacity-50"
                                parentClassName="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1"
                            />
                        </Loader>
                    )}
                </>
            )}
        </>
    );
};

export default PokemonMainGrid;
