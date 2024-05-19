"use client";
import React from "react";

import Link from "next/link";
import Image from "next/image";
import Chip from "@/components/Common/Chip";
import useBreakpoints from "@/hooks/useBreakpoints";
import { IMAGE_ITEM_BASE_URL } from "@/helpers/constants";
import useEvolutionChain from "@/hooks/useEvolutionChain";
import { checkBrightness } from "@/helpers/pokemonHelpers";
import { IPokemonEvolutionChain } from "@/interfaces/IGeneral";
import { PokemonImage } from "@/components/StyledComponents/Image";
import { ArrowDownIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";

interface Props {
    pokemon: IPokemonEvolutionChain;
    isSelected: boolean;
    firstPokemon: boolean;
    hasEvolution: boolean;
    numberOfPosibleEvolutions: number;
}

const EvolutionChainDetails = ({
    pokemon,
    isSelected,
    firstPokemon,
    hasEvolution,
    numberOfPosibleEvolutions,
}: Props) => {
    const width = useBreakpoints();
    const {
        evolutionDescription,
        pokemonGender,
        isLoading,
        color: { colorType1, colorType2 },
    } = useEvolutionChain({
        pokemon,
    });

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`flex flex-wrap justify-center
                ${firstPokemon ? "self-center" : ""}
                ${
                    !hasEvolution
                        ? `flex-col w-full`
                        : "flex-row-reverse max-sm:flex-col-reverse"
                }
            `}
        >
            <Link
                prefetch={false}
                href={`/pokemon/${pokemon.id}`}
                className="group card-pokemon-container flex self-center flex-col"
            >
                <PokemonImage
                    className="duration-300 max-sm:max-w-[180px] w-full max-w-[200px]"
                    alt={`Evolution chain - ${pokemon.species_name}`}
                    src={pokemon.image ?? ""}
                    width={180}
                    height={180}
                    colorType1={colorType1}
                    colorType2={colorType2}
                />
                <div className="w-full flex justify-center items-center">
                    <Chip
                        className="capitalize w-full max-sm:text-sm"
                        label={pokemon.species_name}
                        size="small"
                        style={{
                            background: colorType1,
                            color: checkBrightness(colorType1)
                                ? "#fff"
                                : "#000",
                        }}
                    />
                </div>
            </Link>
            {!firstPokemon && (
                <div className="flex items-center break-words max-w-max p-5 self-center text-center flex-col-reverse max-sm:flex-grow max-sm:max-w-full">
                    {width === "xs" ? (
                        <ArrowDownIcon className="w-11" />
                    ) : (
                        <ArrowRightIcon className="w-16" />
                    )}
                    <p>
                        {evolutionDescription
                            .split("\n")
                            .map((value, index) => (
                                <span
                                    key={index}
                                    className="capitalize text-sm max-sm:text-xs"
                                >
                                    {value} <br />
                                </span>
                            ))}
                    </p>
                    {pokemon.held_item && (
                        <Image
                            src={`${IMAGE_ITEM_BASE_URL}${pokemon.held_item}.png`}
                            alt=""
                            width={30}
                            height={30}
                        />
                    )}
                    <span>{pokemonGender}</span>
                </div>
            )}
            {!hasEvolution && (
                <small className="text-center">
                    {"This pokemon doesn´t evolve"}
                </small>
            )}
        </motion.div>
    );
};

export default EvolutionChainDetails;
