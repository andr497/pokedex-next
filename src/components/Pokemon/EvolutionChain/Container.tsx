"use client";
import {
    TreeEvolutionNode,
    isLinearChain,
} from "@/helpers/evolutionChainPokemon";
import EvolutionTreeNode from "./Tree";
import LinearChain from "./LinearChain";

interface Props {
    pokemonIdActual: number;
    pokemonChain: TreeEvolutionNode;
    types: { colorType1: string; colorType2: string };
}

export default function EvolutionChainContainer({
    pokemonChain,
    types,
    pokemonIdActual,
}: Props) {
    const isLinear = isLinearChain(pokemonChain);

    console.log(pokemonChain);
    return (
        <div className="w-full flex justify-center py-2">
            {isLinear ? (
                <LinearChain
                    pokemon={pokemonChain}
                    types={types}
                    pokemonIdActual={pokemonIdActual}
                />
            ) : (
                <EvolutionTreeNode
                    pokemon={pokemonChain}
                    types={types}
                    pokemonIdActual={pokemonIdActual}
                    isRoot
                />
            )}
        </div>
    );
}
