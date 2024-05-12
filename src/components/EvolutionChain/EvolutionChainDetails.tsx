"use client";
import React from "react";

import Link from "next/link";
import { IPokemonEvolutionChain } from "@/interfaces/IGeneral";
import { ArrowDownIcon, ArrowRightIcon } from "@heroicons/react/20/solid";

import Chip from "../Chip/Chip";
import CustomImage from "../CustomImage";
import useBreakpoints from "@/hooks/useBreakpoints";
import { IMAGE_ITEM_BASE_URL } from "@/helpers/constants";
import Image from "next/image";
import useEvolutionChain from "@/hooks/useEvolutionChain";
import styled from "styled-components";
import { checkBrightness } from "@/helpers/pokemonHelpers";

interface Props {
    pokemon: IPokemonEvolutionChain;
    isSelected: boolean;
    firstPokemon: boolean;
    hasEvolution: boolean;
    numberOfPosibleEvolutions: number;
}

const PokemonImage = styled(CustomImage)((props) => {
    const { colorType1, colorType2 } = props;
    return {
        ".card-pokemon-container:hover &": {
            filter: `drop-shadow(5px 5px 0px ${colorType2})
            drop-shadow(-5px -5px 0px ${colorType1})`,
        },
    };
});

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
        color: { colorType1, colorType2 },
    } = useEvolutionChain({
        pokemon,
    });

    return (
        <div
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
        </div>
    );
};

export default EvolutionChainDetails;
