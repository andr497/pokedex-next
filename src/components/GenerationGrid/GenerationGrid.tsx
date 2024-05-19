"use client";
import React, { useEffect, useState } from "react";

import useSWR from "swr";

import Link from "next/link";
import { getGenerations } from "@/api/generation";
import { GenerationNames } from "@/interfaces/ICommons";
import { GENERATION_HOVER_COLORS } from "@/helpers/constants";
import { Generation } from "@/interfaces/PokeApi/IGenerations";
import { MapIcon, UsersIcon } from "@heroicons/react/20/solid";

import SvgPokeball from "../SvgPokeball";
import Loading from "../../../app/loading";

const GenerationGrid = () => {
    const { data, isLoading } = useSWR("1", getGenerations);
    const [generations, setGenerations] = useState<Generation[]>([]);

    useEffect(() => {
        if (data) {
            setGenerations(data);
        }
    }, [data]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <section className="p-2 mb-1">
                <h1 className={`text-7xl text-center max-sm:text-4xl`}>Choose a generation</h1>
            </section>
            <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 place-items-center">
                {generations.map((generation, key) => {
                    const [from, to]: string[] =
                        GENERATION_HOVER_COLORS[
                            generation.name as GenerationNames
                        ];

                    return (
                        <Link
                            href={`/generation/${generation.id}`}
                            key={`generation-${key}`}
                            className={`group relative mx-auto overflow-hidden rounded w-full dark:bg-gray-800 bg-gray-100 p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r ${from} hover:via-purple-500 ${to}`}
                        >
                            <div className="group-hover:animate-spin-slow opacity-0 absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 dark:via-gray-800 to-transparent group-hover:opacity-100"></div>

                            <div className="relative rounded dark:bg-gray-800 bg-gray-100 p-6">
                                <h2 className="text-center text-4xl mt-8 font-bold min-h-18 px-12 uppercase">
                                    {generation.name.split("-")[1]}
                                </h2>
                                <p className="m-1 text-lg p-4 leading-relaxed text-center">
                                    Generation
                                </p>
                                <p className="flex justify-between">
                                    <span className="flex justify-center items-center">
                                        <MapIcon className="w-5 h-5" />
                                        <small className="capitalize">{`Region: ${generation.main_region.name}`}</small>
                                    </span>
                                    <span className="flex justify-center items-center">
                                        <UsersIcon className="w-5 h-5" />
                                        <small>{`Pokémon: ${generation.pokemon_species.length}`}</small>
                                    </span>
                                </p>
                                <SvgPokeball
                                    src="/assets/patterns/pokeball.svg"
                                    className="group-hover:rotate-0 
                                        absolute top-[20px] left-[-60px]
                                        rotate-45 transition duration-500 
                                        ease-out hover:ease-in"
                                    title={generation.name}
                                />
                            </div>
                        </Link>
                    );
                })}
            </section>
        </>
    );
};

export default GenerationGrid;
