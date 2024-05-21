"use client";
import React, { useMemo } from "react";

import { motion } from "framer-motion";

import Link from "next/link";
import { TOTAL_POKEMON } from "@/helpers/constants";
import { GeneralInfoPokemon } from "interfaces/IPokemonDetails";
import { colorPokemonTypes, fixPokemonName } from "helpers/pokemonHelpers";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

interface Props {
    data: GeneralInfoPokemon;
}

const NavigationName = ({ data }: Props) => {
    const {
        colors: { colorType1, colorType2 },
        nextPokemon,
        prevPokemon,
        isFirst,
        isLast,
        pokemonName,
    } = useMemo(
        () => ({
            colors: colorPokemonTypes(data),
            pokemonName: fixPokemonName(data.name),
            isFirst: data.id === 1,
            isLast: data.id === TOTAL_POKEMON,
            prevPokemon: data.id === 1 ? data.id : data.id - 1,
            nextPokemon: data.id === TOTAL_POKEMON ? 1 : data.id + 1,
        }),
        [data]
    );

    return (
        <>
            <Link
                prefetch={false}
                style={{
                    color: colorType1,
                    visibility: isFirst ? "hidden" : "visible",
                }}
                className="flex justify-center align-middle"
                href={`/pokemon/${prevPokemon}`}
                aria-label="Previous pokemon"
            >
                <motion.div
                    initial={{ x: -50 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5, origin: 1 }}
                >
                    <ChevronLeftIcon className="xl:w-36 lg:w-32 md:w-28 sm:w-24 w-12" />
                </motion.div>
            </Link>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center"
            >
                <h1
                    className="uppercase font-bold xl:text-9xl lg:text-7xl md:text-6xl sm:text-5xl text-3xl"
                    style={{
                        background: `linear-gradient(to right, ${colorType1}, ${colorType2})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    {pokemonName}
                </h1>
            </motion.div>
            <Link
                prefetch={false}
                style={{
                    color: colorType2,
                    visibility: isLast ? "hidden" : "visible",
                }}
                className="flex justify-normal align-middle"
                href={`/pokemon/${nextPokemon}`}
                aria-label="Next pokemon"
            >
                <motion.div
                    initial={{ x: 50 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5, origin: 1 }}
                >
                    <ChevronRightIcon className="xl:w-36 lg:w-32 md:w-28 sm:w-24 w-12" />
                </motion.div>
            </Link>
        </>
    );
};

export default NavigationName;
