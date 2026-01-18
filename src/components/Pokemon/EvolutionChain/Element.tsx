"use client";

import React, { useMemo } from "react";

import EvolutionChainDetails from "./Details";
import { IPokemonEvolutionChain } from "@/interfaces/IGeneral";
import clsx from "clsx";
import { TreeEvolutionNode } from "@/helpers/evolutionChainPokemon";

interface Props {
    pokemonId: number;
    firstPokemon: boolean;
    hasEvolution: boolean;
    chain: TreeEvolutionNode[];
}

const EvolutionChainElement = ({
    chain,
    firstPokemon,
    hasEvolution,
    pokemonId,
}: Props) => {
    const chainElementLength = useMemo(() => chain.length, [chain]);
    const moreThanOne = chainElementLength > 1;

    return (
        <div
            className={clsx("flex items-center flex-1", {
                "flex-col max-md:flex-row max-sm:w-full": moreThanOne,
                "max-sm:flex-col": !moreThanOne,
            })}
        >
            {chain.map((node, key) => (
                <EvolutionChainDetails
                    key={`pokemon-chain-${key}`}
                    pokemon={node}
                    isSelected={pokemonId === node.id}
                    firstPokemon={firstPokemon}
                    hasEvolution={hasEvolution}
                    numberOfPosibleEvolutions={chainElementLength}
                />
            ))}
        </div>
    );
};

export default EvolutionChainElement;
