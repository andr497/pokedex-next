"use client";
import React from "react";

import styled from "styled-components";

import Link from "next/link";
import { IPokemonList } from "interfaces/IPokemonList";
import { ARTWORK_BASE_URL } from "helpers/constants";
import {
    checkBrightness,
    colorPokemonTypes,
    fixPokemonName,
} from "helpers/pokemonHelpers";

import IconSvg from "./IconSvg";
import CustomImage from "./CustomImage";
import SvgPokeball from "./SvgPokeball";

interface PokemonCardProps {
    pokemon: IPokemonList | null;
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

const PokemonCard = ({ pokemon = null }: PokemonCardProps) => {
    if (pokemon === null) {
        return <></>;
    }
    const { colorType1, colorType2 } = colorPokemonTypes(pokemon);

    let colorType: string[] = [];
    colorType[0] = colorType1;
    colorType[1] = colorType2;

    return (
        <div className="flex items-center justify-center rounded hover:scale-105 transition duration-300 card-pokemon-container min-h-[300px] max-sm:w-full">
            <Link
                prefetch={false}
                href={`/pokemon/${pokemon.id}`}
                className={`relative flex justify-center w-full h-full p-1 rounded group`}
                style={{
                    backgroundImage: `linear-gradient(to right, ${colorType1}, ${colorType2})`,
                }}
            >
                <div className="w-full flex flex-col items-center justify-center relative rounded bg-white dark:bg-gray-800 back">
                    <div className="relative flex justify-center align-middle my-4">
                        <SvgPokeball
                            src="/assets/patterns/pokeball.svg"
                            className="group-hover:rotate-0 rotate-12 transition duration-300 ease-out hover:ease-in"
                            title={pokemon.name}
                            colorType1={colorType1}
                            colorType2={colorType2}
                        />
                        <PokemonImage
                            loading="eager"
                            quality={70}
                            className="aspect-auto absolute group-hover:scale-105 transition duration-200 ease-out hover:ease-in "
                            width={250}
                            height={250}
                            alt={pokemon.name}
                            src={`${ARTWORK_BASE_URL}${pokemon.id}.png`}
                            colorType1={colorType1}
                            colorType2={colorType2}
                        />
                    </div>
                    <h2 className="font-bold text-lg md:text-3xl mb-2">
                        #{pokemon.id}
                    </h2>
                    <h2 className="capitalize font-bold text-md md:text-2xl">
                        {fixPokemonName(pokemon.name)}
                    </h2>
                    <div className="flex">
                        {pokemon.types.map(({ type }, key) => {
                            const fontColor = `${
                                checkBrightness(colorType[key])
                                    ? "white"
                                    : "black"
                            }`;
                            return (
                                <span
                                    style={{
                                        backgroundColor: `${colorType[key]}`,
                                        color: fontColor,
                                    }}
                                    className="uppercase text-xs m-1 p-1 rounded flex justify-center items-center"
                                    key={`type-${type.name}-${key}`}
                                >
                                    <IconSvg
                                        src={`/assets/types/${type.name}.svg`}
                                        title={`icon-${type.name}`}
                                        className="mr-1"
                                        width={15}
                                        color={fontColor}
                                    />
                                    {type.name}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default PokemonCard;
