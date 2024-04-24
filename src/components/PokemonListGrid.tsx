"use client";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import useSWR from "swr";

import { fetchPokemonList } from "api/pokemon";
import { WindowScroller } from "react-virtualized/dist/es/WindowScroller";
import { List } from "react-virtualized/dist/es/List";

import { IPokemonList } from "interfaces/IPokemonList";
import { Loader, Rectangular } from "./Skeleton";
import { pokemonListState, searchTextPokemonState } from "./../recoil/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import ListRowWrapper from "./ListRowWrapper";
import useBreakpoints from "hooks/useBreakpoints";

import { getAllPokemonTypes } from "api/types";

import { InformationCircleIcon as ErrorIcon } from "@heroicons/react/20/solid";
import SelectTypePokemon from "./Select/SelectTypePokemon";
import { NamedAPIResourceWithId } from "interfaces/PokeApi/CommonModels";
import Link from "next/link";

const PokemonListGrid = () => {
    const [isClient, setIsClient] = useState(false);
    const [triggerFetch, setTriggerFetch] = useState<boolean>(false);
    const breakpoint = useBreakpoints();

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

    console.log(pokemon);

    return (
        <>
            {isClient && (
                <>
                    {!isLoading && typeof pokemonList !== "undefined" ? (
                        <WindowScroller>
                            {({
                                width,
                                height,
                                isScrolling,
                                registerChild,
                                scrollTop,
                            }) => {
                                const WIDTH_ROW = 320;
                                const extraSpace = width >= 950 ? 1 : 0;
                                const sizes = {
                                    xl: 6,
                                    lg: 4,
                                    md: 3,
                                    sm: 2,
                                    xs: 1,
                                };
                                let itemsPerRow = sizes[breakpoint];

                                itemsPerRow =
                                    itemsPerRow > pokemon.length
                                        ? pokemon.length
                                        : itemsPerRow;
                                let rowCount = Math.ceil(
                                    pokemon.length / itemsPerRow
                                );
                                rowCount = isNaN(rowCount) ? 0 : rowCount;

                                return (
                                    <>
                                        <div>
                                            <SelectTypePokemon
                                                options={options ?? []}
                                                primaryTypeOption={
                                                    primaryTypeOption
                                                }
                                                setPrimaryTypeOption={
                                                    setPrimaryTypeOption
                                                }
                                                secondaryTypeOption={
                                                    secondaryTypeOption
                                                }
                                                setSecondaryTypeOption={
                                                    setSecondaryTypeOption
                                                }
                                            />
                                        </div>
                                        <div
                                            className="mt-3"
                                            ref={
                                                registerChild as LegacyRef<HTMLDivElement>
                                            }
                                        >
                                            <List
                                                //className="outline outline-lime-400 w-full grid place-content-center"
                                                autoHeight
                                                autoWidth
                                                width={width}
                                                height={height}
                                                isScrolling={isScrolling}
                                                scrollTop={scrollTop}
                                                rowCount={rowCount}
                                                rowHeight={WIDTH_ROW}
                                                noRowsRenderer={() => (
                                                    <PokemonNotFound
                                                        name={searchText}
                                                    />
                                                )}
                                                rowRenderer={ListRowWrapper(
                                                    itemsPerRow,
                                                    pokemon
                                                )}
                                            />
                                        </div>
                                    </>
                                );
                            }}
                        </WindowScroller>
                    ) : error ? (
                        <PokemonNotFound name={searchText} />
                    ) : (
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

function PokemonNotFound({ name }: { name: string }) {
    return (
        <div
            className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
        >
            <ErrorIcon
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
            />
            <span className="sr-only">Info</span>
            <div>
                <span className="font-medium">Pokemon not found</span>
            </div>
        </div>
    );
}

export default PokemonListGrid;
