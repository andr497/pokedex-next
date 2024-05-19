"use client";
import React, { useState } from "react";

import styled from "styled-components";

import Link from "next/link";
import { ARTWORK_BASE_URL } from "helpers/constants";
import { IPokemonList } from "interfaces/IPokemonList";
import {
    checkBrightness,
    colorPokemonTypes,
    fixPokemonName,
} from "helpers/pokemonHelpers";

import IconSvg from "./StyledComponents/IconSvg";
import CustomImage from "./CustomImage";
import SvgPokeball from "./SvgPokeball";
import { motion } from "framer-motion";
import { PokemonImage } from "./StyledComponents/Image";

interface PokemonCardProps {
    pokemon: IPokemonList | null;
}

const PokemonCard = ({ pokemon = null }: PokemonCardProps) => {
    if (pokemon === null) {
        return <></>;
    }
    const { colorType1, colorType2 } = colorPokemonTypes(pokemon);

    let colorType: string[] = [];
    colorType[0] = colorType1;
    colorType[1] = colorType2;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0 }}
            viewport={{ once: true }}
            className={`group card-pokemon-container hover:-translate-y-1 relative mx-auto overflow-hidden rounded w-max-md sm:w-full dark:bg-gray-800 p-[1px]  transition-all duration-300 ease-in-out open:opacity-50 hover:bg-gradient-to-r`}
            style={{
                backgroundImage: `linear-gradient(to right, ${colorType1}, ${colorType2})`,
            }}
        >
            <Link prefetch={false} href={`/pokemon/${pokemon.id}`}>
                <div className="group-hover:animate-spin-slow opacity-0 absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 dark:via-gray-800 to-transparent group-hover:opacity-100"></div>
                <div className="relative rounded dark:bg-gray-800 bg-gray-100 p-6 text-center">
                    <div className="relative flex justify-center align-middle my-4">
                        <PokemonImage
                            loading="lazy"
                            quality={70}
                            className={`group-hover:scale-101 z-10 transition duration-200 ease-out hover:ease-in max-sm:w-18 max-sm:h-18`}
                            width={250}
                            height={250}
                            alt={pokemon.name}
                            src={`${ARTWORK_BASE_URL}${pokemon.id}.png`}
                            colorType1={colorType1}
                            colorType2={colorType2}
                        />
                        {/* <SvgPokeball
                        src="/assets/patterns/pokeball.svg"
                        className="absolute group-hover:animate-rotate z-0"
                        title={pokemon.name}
                        colorType1={colorType1}
                        colorType2={colorType2}
                    /> */}
                    </div>
                    <h2 className="font-bold text-lg md:text-3xl mb-2">
                        #{pokemon.id}
                    </h2>
                    <h2 className="capitalize font-bold text-md md:text-2xl">
                        {fixPokemonName(pokemon.name)}
                    </h2>
                    <div className="w-full flex items-center justify-center">
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
                                        className="mr-1 max-sm:mr-0"
                                        width={15}
                                        color={fontColor}
                                    />
                                    <span className="max-sm:hidden">
                                        {type.name}
                                    </span>
                                </span>
                            );
                        })}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

const PokemonTypesCard = () => {};

export default PokemonCard;
