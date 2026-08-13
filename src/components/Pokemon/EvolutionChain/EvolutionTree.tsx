"use client";

import { cn } from "@/helpers/twLib";
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

const EvolutionTrigger = ({ node }: { node: TreeEvolutionNode }) => (
    <span className="relative z-10 inline-flex flex-col items-center justify-center gap-0.5 rounded-xl border border-border bg-background/90 px-3 py-1 text-center text-xs font-semibold leading-snug text-foreground/80 capitalize shadow-md backdrop-blur-sm">
        {node.item_image && (
            <ItemImage
                src={node.item_image}
                alt={node.item_name ?? "item"}
                width={16}
                height={16}
            />
        )}
        <span className="whitespace-pre-line">{node.evolution_method}</span>
    </span>
);

const VerticalConnector = ({ child }: { child: TreeEvolutionNode }) => (
    <div className="relative flex flex-col items-center">
        <div className="absolute top-0 bottom-0 w-px bg-border/70 rounded-full" />
        <div className="h-3" />
        <EvolutionTrigger node={child} />
        <div className="h-4" />
    </div>
);

const EvolutionTree = ({
    pokemon,
    types,
    pokemonIdActual,
    isRoot = false,
}: Props) => {
    const width = useBreakpoints();
    const isDesktop = ["md", "lg", "xl"].includes(width);
    const imgSize = isDesktop ? 90 : 80;
    const children = pokemon.children ?? [];
    const childCount = children.length;
    const horizontal = isDesktop && childCount > 0 && childCount <= 4;
    const vertical = !horizontal && childCount > 0;

    return (
        <div
            className={cn(
                "relative flex items-center",
                !horizontal && "flex-col",
            )}
        >
            <EvolutionCard
                pokemon={pokemon}
                types={types}
                pokemonIdActual={pokemonIdActual}
                size={imgSize}
            />

            {vertical && (
                <>
                    <div className="w-px h-4 bg-border/70 rounded-full" />
                    <div className="flex flex-col items-center">
                        <div className="flex flex-nowrap w-max min-w-full mx-auto">
                            {children.map((child, i) => (
                                <div
                                    key={child.id}
                                    className="flex flex-col items-center"
                                >
                                    <div className="w-full flex h-px">
                                        <div
                                            className={cn(
                                                "w-1/2 h-full bg-border/70 rounded-full",
                                                i === 0 && "invisible",
                                            )}
                                        />
                                        <div
                                            className={cn(
                                                "w-1/2 h-full bg-border/70 rounded-full",
                                                i === childCount - 1 &&
                                                    "invisible",
                                            )}
                                        />
                                    </div>
                                    <div className="w-px h-4 bg-border/70 rounded-full" />
                                    <VerticalConnector child={child} />
                                    <EvolutionTree
                                        pokemon={child}
                                        types={types}
                                        pokemonIdActual={pokemonIdActual}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {horizontal && (
                <div className="flex flex-row items-stretch">
                    <div className="flex items-center">
                        <div className="w-4 h-px bg-border/70" />
                    </div>

                    <div className="flex flex-col justify-center">
                        {children.map((child, i) => {
                            const isFirst = i === 0;
                            const isLast = i === childCount - 1;

                            return (
                                <div
                                    key={child.id}
                                    className="flex flex-row items-center"
                                >
                                    <div className="flex flex-col self-stretch w-4">
                                        <div
                                            className={cn(
                                                "w-full h-1/2 border-r border-border/70",
                                                isFirst && "border-transparent",
                                            )}
                                        />
                                        <div
                                            className={cn(
                                                "w-full h-1/2 border-r border-border/70",
                                                isLast && "border-transparent",
                                            )}
                                        />
                                    </div>

                                    <div className="w-4 h-px bg-border/70" />

                                    <div className="flex flex-row items-center gap-x-3 py-4 pl-2">
                                        <EvolutionTrigger node={child} />
                                        <EvolutionTree
                                            pokemon={child}
                                            types={types}
                                            pokemonIdActual={pokemonIdActual}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {isRoot && childCount === 0 && (
                <small className="mt-3 rounded-full border border-border bg-muted/20 px-3 py-1 text-sm font-semibold text-muted">
                    This pokemon doesn´t evolve
                </small>
            )}
        </div>
    );
};

export default EvolutionTree;