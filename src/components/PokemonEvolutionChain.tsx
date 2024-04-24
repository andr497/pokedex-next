"use client";
import React, { useEffect, useState } from "react";

import useSWR from "swr";

import Link from "next/link";
import { Pokemon } from "interfaces/PokeApi/IPokemonApi";
import { colorPokemonTypes } from "helpers/pokemonHelpers";
import { IPokemonEvolutionChain } from "interfaces/IGeneral";
import { GeneralInfoPokemon } from "interfaces/IPokemonDetails";
import { ArrowDownIcon, ArrowRightIcon } from "@heroicons/react/20/solid";

import Chip from "./Chip/Chip";
import CustomImage from "./CustomImage";
import useBreakpoints from "./../hooks/useBreakpoints";

interface Props {
    pokemonIdActual: number,
    data: IPokemonEvolutionChain[][];
}

const PokemonEvolutionChain = ({ data, pokemonIdActual }: Props) => {
    const chainLength = data.length === 1;

    return (
        <div className="w-full flex flex-wrap justify-center max-sm:flex-col">
            {data.map((chain, chainKey) => {
                return (
                    <div
                        className={`flex flex-wrap justify-center ${
                            chain.length > 1
                                ? "flex-col max-sm:flex-row max-sm:w-full"
                                : "max-sm:flex-col"
                        }`}
                        key={`chain-${chainKey}`}
                    >
                        {chain.map((pokemon, key) => {
                            return (
                                <Link
                                    prefetch={false}
                                    href={`/pokemon/${pokemon.id}`}
                                    className={`flex flex-wrap justify-center  ${
                                        chainKey === 0 ? "self-center" : ""
                                    } ${
                                        chainLength
                                            ? `flex-col w-full`
                                            : "flex-row-reverse max-sm:flex-col-reverse"
                                    }`}
                                    key={`pokemon-chain-${key}`}
                                >
                                    <PokemonEvolutionChainDetails
                                        pokemon={pokemon}
                                        isSelected={pokemonIdActual === parseInt(pokemon.id)}
                                        firstPokemon={chainKey === 0}
                                    />
                                    {chainLength ? (
                                        <span>
                                            {"This pokemon doesn't evolve"}
                                        </span>
                                    ) : null}
                                </Link>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default PokemonEvolutionChain;

interface PropsDetails {
    pokemon: IPokemonEvolutionChain;
    isSelected: boolean;
    firstPokemon: boolean;
}

const PokemonEvolutionChainDetails = ({
    pokemon,
    isSelected,
    firstPokemon,
}: PropsDetails) => {
    const [color, setColor] = useState<Pick<Pokemon, "types">>({ types: [] });
    const [loading, setLoading] = useState(false);
    const width = useBreakpoints();
    console.log(width)

    useEffect(() => {
        (async () => {
            const url = pokemon.url.replace("pokemon-species", "pokemon");
            setLoading(true);
            await fetch(url, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((res) => {
                    setColor(res);
                })
                .finally(() => {
                    setLoading(false);
                });
        })();
    }, [pokemon.url]);

    const { colorType1, colorType2 } = colorPokemonTypes(color);
    return (
        <>
            <div className={`flex self-center p-3 flex-col`}>
                <CustomImage
                className="duration-300"
                    alt={pokemon.species_name}
                    src={pokemon.image ?? ""}
                    width={180}
                    height={180}
                    style={{
                        filter: `drop-shadow(${isSelected ? "5px 5px 1px" : "2px 2px 0px"} ${colorType2})
                                 drop-shadow(${isSelected ? "-5px -5px 1px" : "-2px -2px 0px"} ${colorType1})`,
                    }}
                />
                <div className="w-full">
                    <Chip
                        className="capitalize w-full max-sm:text-sm"
                        label={pokemon.species_name}
                        size="small"
                    />
                </div>
            </div>
            {!firstPokemon ? (
                <div className="flex items-center break-words max-w-max p-5 self-center text-center flex-col-reverse max-sm:flex-grow max-sm:max-w-full">
                    {width === "xs" ? (
                        <ArrowDownIcon className="w-11" />
                    ) : (
                        <ArrowRightIcon className="w-16" />
                    )}
                    <p>
                        {fixEvolutionMethod(pokemon)
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
                    <span>{fixGenderText(pokemon.gender)}</span>
                </div>
            ) : null}
        </>
    );
};

const fixTriggerName = (name: string) => {
    if (!name) return "";

    if (name === "shed") {
        return "level up 20 \n with empty PokéBall and \n an open slot in party";
    }

    return name.replace("-", " ");
};

const fixGenderText = (gender: number) => {
    if (!gender) return null;

    let fullName = gender === 1 ? "♀️" : "‍♂️";

    return "Only " + fullName;
};

const fixEvolutionMethod = ({
    min_level,
    min_happiness,
    min_affection,
    min_beauty,
    trigger_name,
    item,
    held_item,
    relative_physical_stats,
    known_move,
    known_move_type,
    time_of_day,
    location,
    needs_overworld_rain,
    turn_upside_down,
    trade_species,
    party_species,
    ...others
}: IPokemonEvolutionChain) => {
    let fixTrigger = fixTriggerName(trigger_name);
    let minLevelArray = Object.entries({
        min_level,
        min_happiness,
        min_affection,
        min_beauty,
    }).filter(([, v]) => v !== null);

    const textLevel =
        minLevelArray.length === 1
            ? minLevelArray[0][0] === "min_level"
                ? minLevelArray[0][1]
                : `${minLevelArray[0][1]} of ${minLevelArray[0][0].replace(
                      "min_",
                      ""
                  )}`
            : "";

    const fixItem =
        item !== null
            ? ` ${item.replace("-", " ")}`
            : held_item !== null
            ? ` holding ${held_item.replace("-", " ")}`
            : "";

    //Data to show if

    const moreDetails = [
        relative_physical_stats === 0
            ? "Attack = Defense"
            : relative_physical_stats === 1
            ? "Attack > Defense"
            : relative_physical_stats === -1
            ? "Attack < Defense"
            : null,
        known_move && `knowing ${known_move}`,
        known_move_type && `knowing a ${known_move_type} move`,
        time_of_day && `at ${time_of_day} time`,
        location && `at ${location}`,
        needs_overworld_rain && "during rain",
        turn_upside_down && "holding the console upside down",
        trade_species && `with ${trade_species}`,
        party_species && `with ${party_species} in party`,
    ]
        .filter(Boolean)
        .join("\n");

    return `${fixTrigger}${fixItem} ${textLevel}${
        moreDetails ? "\n" + moreDetails : ""
    }`;
};
