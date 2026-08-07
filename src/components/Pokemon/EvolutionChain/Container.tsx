"use client";
import { TreeEvolutionNode } from "@/helpers/evolutionChainPokemon";
import EvolutionTreeNode from "./Tree";

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
    return (
        <div className="w-full flex justify-center py-8">
            <EvolutionTreeNode
                pokemon={pokemonChain}
                types={types}
                pokemonIdActual={pokemonIdActual}
                isRoot
            />
        </div>
    );
}
