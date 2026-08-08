"use client";

import clsx from "clsx";
import useBreakpoints from "@/hooks/useBreakpoints";
import { TreeEvolutionNode } from "@/helpers/evolutionChainPokemon";
import EvolutionCard from "./EvolutionCard";
import ItemImage from "./ItemImage";

interface Props {
    pokemon: TreeEvolutionNode;
    pokemonIdActual: number;
    isRoot?: boolean;
    types: { colorType1: string; colorType2: string };
}

const EvolutionTreeNode = ({
    pokemon,
    types,
    pokemonIdActual,
    isRoot = false,
}: Props) => {
    const width = useBreakpoints();
    const isMobile = ["xs", "sm"].includes(width);
    const hasEvolution = pokemon.children.length > 0;
    const imgSize = isMobile ? 80 : 90;

    return (
        <div className="relative flex flex-col items-center justify-content-center">
            <div className="flex flex-col items-center gap-2">
                {!isRoot && pokemon.evolution_method && (
                    <span className="mb-1 text-[10px] leading-tight text-center text-muted font-semibold max-w-24 whitespace-pre-line line-clamp-2 capitalize">
                        {pokemon.evolution_method}
                    </span>
                )}
                {!isRoot && pokemon.item_image && (
                    <ItemImage
                        src={pokemon.item_image}
                        alt={pokemon.item_name ?? "item"}
                    />
                )}
                <EvolutionCard
                    pokemon={pokemon}
                    types={types}
                    pokemonIdActual={pokemonIdActual}
                    size={imgSize}
                />
            </div>
            {hasEvolution && (
                <div className="relative flex flex-col items-center">
                    <div className="w-px h-6 bg-border" />
                    {!isMobile && pokemon.children.length > 1 && (
                        <div className="w-full h-px bg-border" />
                    )}
                </div>
            )}
            {hasEvolution && (
                <div
                    className={clsx(
                        "relative flex flex-wrap gap-4 md:max-w-3xl",
                        isMobile
                            ? "flex-col items-center"
                            : "flex-row justify-center",
                    )}
                >
                    {pokemon.children.map((child) => (
                        <div
                            key={child.id}
                            className="relative flex flex-col items-center"
                        >
                            {!isMobile && (
                                <div className="w-px h-6 bg-border" />
                            )}
                            <EvolutionTreeNode
                                pokemon={child}
                                types={types}
                                pokemonIdActual={pokemonIdActual}
                            />
                        </div>
                    ))}
                </div>
            )}
            {isRoot && !hasEvolution && (
                <small className="bg-muted/20 border border-border text-muted text-xs font-bold px-2 py-1 rounded-full mt-2">
                    This pokemon doesn´t evolve
                </small>
            )}
        </div>
    );
};

export default EvolutionTreeNode;
