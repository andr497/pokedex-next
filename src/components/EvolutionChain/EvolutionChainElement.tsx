"use client";
import React, { useMemo } from "react";

import { IPokemonEvolutionChain } from "@/interfaces/IGeneral";
import EvolutionChainDetails from "./EvolutionChainDetails";

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

    return (
        <div
            className={`flex flex-wrap justify-center ${
                chainElementLength > 1
                    ? "flex-col max-sm:flex-row max-sm:w-full"
                    : "max-sm:flex-col"
            }`}
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
