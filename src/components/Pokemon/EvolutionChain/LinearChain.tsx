"use client";
import { Fragment } from "react";
import {
    TreeEvolutionNode,
    flattenChain,
} from "@/helpers/evolutionChainPokemon";
import EvolutionCard from "./EvolutionCard";
import ItemImage from "./ItemImage";

interface Props {
    pokemon: TreeEvolutionNode;
    pokemonIdActual: number;
    types: { colorType1: string; colorType2: string };
}

const Arrow = ({ node }: { node: TreeEvolutionNode }) => (
    <div className="flex flex-col items-center gap-1.5 mb-1">
        <span className="text-muted font-bold rotate-90 md:rotate-0">→</span>
        {node.item_image && (
            <ItemImage
                src={node.item_image}
                alt={node.item_name ?? "item"}
            />
        )}
        {node.evolution_method && (
            <span className="text-[10px] leading-tight text-center text-muted font-semibold max-w-24 whitespace-pre-line line-clamp-2 capitalize">
                {node.evolution_method}
            </span>
        )}
    </div>
);

const LinearChain = ({ pokemon, pokemonIdActual, types }: Props) => {
    const steps = flattenChain(pokemon);

    return (
        <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:gap-2">
            {steps.map(({ node }, i) => (
                <Fragment key={`evo-${node.id}`}>
                    {i > 0 && <Arrow node={node} />}
                    <EvolutionCard
                        pokemon={node}
                        pokemonIdActual={pokemonIdActual}
                        types={types}
                        size={90}
                    />
                </Fragment>
            ))}
        </div>
    );
};

export default LinearChain;
