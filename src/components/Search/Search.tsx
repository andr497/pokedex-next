"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { getAllPokemon } from "api/pokemon";
import { SPRITE_BASE_URL } from "helpers/constants";
import { fixPokemonName } from "helpers/pokemonHelpers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { pokemonSearchListState } from "recoil/atoms";

const Search = ({ placeholder }: { placeholder: string }) => {
    const [pokemonSearch, setPokemonSearch] = useState<string>("");
    const [focus, setFocus] = useState<boolean>(false);
    const [pokemonList, setPokemonList] = useRecoilState(
        pokemonSearchListState
    );
    const router = useRouter();

    useEffect(() => {
        if (pokemonList.length === 0 && focus) {
            (async () => {
                const data = await getAllPokemon();
                setPokemonList(data);
            })();
        }
    }, [pokemonList, focus]);

    const handleInputSearch = (term: string) => {
        setPokemonSearch(term);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (pokemonList.length > 0) {
            const pokemonValue = cleanPokemonSearchValue(pokemonList[0].name);
            if (pokemonValue !== "") {
                router.push(`/pokemon/${pokemonValue}`);
            }
        }
    };

    const cleanPokemonSearchValue = (searchValue: string): string => {
        return searchValue.toLowerCase().trim().replaceAll(" ", "-");
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <label
                htmlFor="search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
                Search
            </label>
            <div className="relative">
                <span className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
                    <MagnifyingGlassIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </span>
                <input
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={placeholder}
                    onChange={(e) => {
                        handleInputSearch(e.target.value);
                    }}
                    onFocus={() => {
                        setFocus(true);
                    }}
                    onBlur={() => {
                        setFocus(false);
                    }}
                />
                <button
                    type="submit"
                    disabled={pokemonSearch === ""}
                    className="disabled:opacity-50 disabled:cursor-not-allowed text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                    Search
                </button>
            </div>
            <ul
                className={`absolute max-h-48 overflow-x-scroll border-1 mt-1 shadow-md animate-accordion-down ease-in-out delay-300 ${
                    focus ? "" : "hidden"
                }`}
            >
                {pokemonList
                    .filter((pokemon) => {
                        let value = cleanPokemonSearchValue(pokemonSearch);
                        return pokemon.name.includes(value);
                    })
                    .map((pokemon, key) => {
                        const id = pokemon.url.split("/")[6];
                        return (
                            <li key={`list-${pokemon.name}`}>
                                <Link
                                    href={`/pokemon/${id}`}
                                    className="flex items-center hover:bg-blue-600 hover:text-white cursor-pointer"
                                >
                                    <Image
                                        loading="lazy"
                                        alt={`pokemon-${pokemon.name}`}
                                        width={46}
                                        height={46}
                                        src={`${SPRITE_BASE_URL}${id}.png`}
                                    />
                                    <span className="capitalize">
                                        {fixPokemonName(pokemon.name)}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
            </ul>
        </form>
    );
};

export default Search;
