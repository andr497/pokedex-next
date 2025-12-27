"use client";

import clsx from "clsx";
import { motion } from "framer-motion";

import Link from "next/link";
import Image from "next/image";
import useBreakpoints from "@/hooks/useBreakpoints";
import { IMAGE_ITEM_BASE_URL } from "@/helpers/constants";
import useEvolutionChain from "@/hooks/useEvolutionChain";
import { IPokemonEvolutionChain } from "@/interfaces/IGeneral";
import { PokemonImage } from "@/components/StyledComponents/Image";
import { ArrowDownIcon, ArrowRightIcon } from "@heroicons/react/20/solid";

interface Props {
    pokemon: IPokemonEvolutionChain;
    isSelected: boolean;
    firstPokemon: boolean;
    hasEvolution: boolean;
    numberOfPosibleEvolutions: number;
}

const EvolutionChainDetails = ({
    pokemon,
    firstPokemon,
    hasEvolution,
}: Props) => {
    const width = useBreakpoints();
    const {
        evolutionDescription,
        pokemonGender,
        color: { colorType1, colorType2 },
    } = useEvolutionChain({
        pokemon,
    });

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={clsx("w-full flex flex-wrap", {
                "justify-center": firstPokemon,
                "flex-col w-full": !hasEvolution,
                "flex-row-reverse max-md:flex-col-reverse justify-between":
                    hasEvolution,
            })}
        >
            <Link
                prefetch={false}
                href={`/pokemon/${pokemon.id}`}
                className="group card-pokemon-container flex flex-col items-center justify-center gap-2 lg:gap-8 relative"
            >
                <div className="relative w-32 h-32 flex items-center justify-center max-sm:mb-1">
                    <PokemonImage
                        className="duration-300 w-full max-sm:w-30 max-w-50"
                        alt={`Evolution chain - ${pokemon.species_name}`}
                        src={pokemon.image}
                        width={120}
                        height={120}
                        colorType1={colorType1}
                        colorType2={colorType2}
                    />
                    <span className="absolute -top-2 -right-2 bg-muted/20 border border-border text-muted text-xs font-bold max-sm:px-1 max-sm:py-0.5 px-2 py-1 rounded-full">
                        # {pokemon.id.toString().padStart(3, "0")}
                    </span>
                </div>
                <h4 className="font-bold text-sm  capitalize">
                    <span
                    /*className="capitalize w-full max-sm:text-sm"
                        style={{
                            background: colorType1,
                            color: checkBrightness(colorType1)
                                ? "#fff"
                                : "#000",
                        }}*/
                    >
                        {pokemon.species_name}
                    </span>
                </h4>
            </Link>
            {!firstPokemon && (
                <div
                    className="flex flex-col items-center justify-center-safe gap-2 py-4 md:py-0"
                    //flex items-center wrap-break-word max-w-max p-5 self-center text-center flex-col-reverse max-sm:grow max-sm:max-w-full
                >
                    {["xs", "sm"].includes(width) ? (
                        <ArrowDownIcon className="w-8" />
                    ) : (
                        <ArrowRightIcon className="w-11" />
                    )}
                    <p>
                        {evolutionDescription
                            .split("\n")
                            .map((value, index) => (
                                <span
                                    key={index}
                                    className="capitalize font-semibold text-xs"
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
                    {pokemon.item && (
                        <Image
                            src={`${IMAGE_ITEM_BASE_URL}${pokemon.item}.png`}
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
