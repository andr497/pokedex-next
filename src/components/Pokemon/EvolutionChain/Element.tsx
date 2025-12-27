"use client";

import React, { useMemo } from "react";

import EvolutionChainDetails from "./Details";
import { IPokemonEvolutionChain } from "@/interfaces/IGeneral";
import clsx from "clsx";

interface Props {
    pokemonId: number;
    firstPokemon: boolean;
    hasEvolution: boolean;
    chain: IPokemonEvolutionChain[];
}

const EvolutionChainElement = ({
    chain,
    firstPokemon,
    hasEvolution,
    pokemonId,
}: Props) => {
    const chainElementLength = useMemo(() => chain.length, [chain]);

    //const isMediumChain = chainElementLength > 1 && chainElementLength < 3;
    const moreThanOne = chainElementLength > 1;

    return (
        <div
            className={clsx("flex items-center flex-1", {
                "flex-col max-md:flex-row max-sm:w-full": moreThanOne,
                "max-sm:flex-col": !moreThanOne,
            })}
            //className="flex flex-col items-center group cursor-pointer flex-1"
        >
            {chain.map((pokemon, key) => (
                <EvolutionChainDetails
                    key={`pokemon-chain-${key}`}
                    pokemon={pokemon}
                    isSelected={pokemonId === parseInt(pokemon.id)}
                    firstPokemon={firstPokemon}
                    hasEvolution={hasEvolution}
                    numberOfPosibleEvolutions={chainElementLength}
                />
            ))}
        </div>
    );
};

export default EvolutionChainElement;
