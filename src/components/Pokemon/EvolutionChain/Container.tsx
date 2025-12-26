"use client";
import React, { useMemo } from "react";

import { IPokemonEvolutionChain } from "@/interfaces/IGeneral";

import EvolutionChainElement from "./Element";

interface Props {
    pokemonIdActual: number;
    pokemonChain: IPokemonEvolutionChain[][];
}

const Container = ({ pokemonChain, pokemonIdActual }: Props) => {
    const hasEvolution = useMemo(() => pokemonChain.length > 1, [pokemonChain]);

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-12 relative">
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

export default Container;
