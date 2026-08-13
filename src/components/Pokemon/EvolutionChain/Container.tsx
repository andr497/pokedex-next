"use client";
import { TreeEvolutionNode } from "@/helpers/evolutionChainPokemon";
import EvolutionTree from "./EvolutionTree";

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
        <div className="w-full flex justify-center overflow-x-auto pt-2 pb-4 scrollbar-thin">
            <EvolutionTree
                isRoot
                pokemon={pokemonChain}
                types={types}
                pokemonIdActual={pokemonIdActual}
            />
        </div>
    );
}
