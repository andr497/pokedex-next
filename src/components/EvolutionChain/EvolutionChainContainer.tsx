"use client";
import React, { useMemo } from "react";

import { IPokemonEvolutionChain } from "@/interfaces/IGeneral";
import EvolutionChainElement from "./EvolutionChainElement";

interface Props {
    pokemonIdActual: number;
    pokemonChain: IPokemonEvolutionChain[][];
}

const EvolutionChainContainer = ({ pokemonChain, pokemonIdActual }: Props) => {
    const hasEvolution = useMemo(
        () => pokemonChain.length > 1,
        [pokemonChain]
    );

    return (
        <div className="w-full flex flex-wrap justify-center max-sm:flex-col">
            {pokemonChain.map((chain, key) => (
                <EvolutionChainElement
                    key={`chain-${key}`}
                    chain={chain}
                    pokemonId={pokemonIdActual}
                    firstPokemon={key === 0}
                    hasEvolution={hasEvolution}
                />
            ))}
        </div>
    );
};

export default EvolutionChainContainer;
