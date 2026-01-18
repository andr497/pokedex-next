"use client";

import clsx from "clsx";
import Link from "next/link";
import { motion } from "framer-motion";
import useBreakpoints from "@/hooks/useBreakpoints";
import { PokemonImage } from "@/components/StyledComponents/Image";
import { TreeEvolutionNode } from "@/helpers/evolutionChainPokemon";

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
    const current = pokemonIdActual === pokemon.id;

    return (
        <div className="relative flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-2"
            >
                {!isRoot && pokemon.evolution_method && (
                    <pre className="text-xs text-center font-semibold capitalize">
                        {pokemon.evolution_method}
                    </pre>
                )}

                <Link
                    href={`/pokemon/${pokemon.id}`}
                    className="card-pokemon-container flex flex-col items-center group"
                >
                    <div className="relative flex flex-col items-center justify-center border border-border/50 bg-foreground/10 rounded-xl p-2.5 transition duration-300 group-hover:bg-primary/20">
                        <PokemonImage
                            alt={`Evolution chain - ${pokemon.species_name}`}
                            src={pokemon.image}
                            width={120}
                            height={120}
                            {...(current
                                ? {
                                      colorType1: types.colorType1,
                                      colorType2: types.colorType2,
                                      $removeHover: true,
                                  }
                                : {})}
                        />

                        <span className="absolute -top-2 -right-2 bg-muted/20 border border-border text-muted text-xs font-bold px-2 py-1 rounded-full transition duration-300 group-hover:bg-primary/10">
                            #{pokemon.id.toString().padStart(3, "0")}
                        </span>

                        <span className="capitalize text-muted text-xs font-bold px-2 py-1">
                            {pokemon.species_name}
                        </span>
                    </div>
                </Link>
            </motion.div>

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
                        "relative flex gap-10",
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
