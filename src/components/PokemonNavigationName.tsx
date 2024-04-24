"use client";
import React from "react";

import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { colorPokemonTypes, fixPokemonName } from "helpers/pokemonHelpers";
import { GeneralInfoPokemon } from "interfaces/IPokemonDetails";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
    data: GeneralInfoPokemon;
}

const PokemonNavigationName = ({ data }: Props) => {
    const { colorType1, colorType2 } = colorPokemonTypes(data);

    const prevPokemon = data.id === 1 ? data.id : data.id - 1;
    const nextPokemon = data.id === 1017 ? 1 : data.id + 1;
    return (
        <>
            <Link
                prefetch={false}
                style={{ color: colorType1 }}
                className="flex justify-center align-middle"
                href={`/pokemon/${prevPokemon}`}
            >
                <ChevronLeftIcon className="xl:w-36 lg:w-32 md:w-28 sm:w-24 w-12" />
            </Link>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
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
                    {fixPokemonName(data.name)}
                </h1>
            </motion.div>
            <Link
                prefetch={false}
                style={{ color: colorType2 }}
                className="flex justify-normal align-middle"
                href={`/pokemon/${nextPokemon}`}
            >
                <ChevronRightIcon className="xl:w-36 lg:w-32 md:w-28 sm:w-24 w-12" />
            </Link>
        </>
    );
};

export default PokemonNavigationName;
