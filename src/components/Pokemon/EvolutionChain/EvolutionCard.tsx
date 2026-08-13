"use client";

import clsx from "clsx";
import Link from "next/link";
import { motion } from "framer-motion";
import { PokemonImage } from "@/components/StyledComponents/Image";
import { TreeEvolutionNode } from "@/helpers/evolutionChainPokemon";

interface Props {
    pokemon: TreeEvolutionNode;
    pokemonIdActual: number;
    types: { colorType1: string; colorType2: string };
    size?: number;
}

const EvolutionCard = ({
    pokemon,
    pokemonIdActual,
    types,
    size = 100,
}: Props) => {
    const current = pokemonIdActual === pokemon.id;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-2 px-2"
        >
            <Link
                href={`/pokemon/${pokemon.id}`}
                className="card-pokemon-container flex flex-col items-center group rounded-xl w-24"
                style={{
                    background: current ? `${types.colorType1}55` : "",
                }}
            >
                <div
                    className={clsx(
                        "relative flex flex-col items-center justify-center border border-border/50 bg-foreground/10 rounded-xl p-2 pt-7 transition duration-300",
                        {
                            "group-hover:bg-foreground/20": !current,
                        },
                    )}
                >
                    <PokemonImage
                        alt={`Evolution chain - ${pokemon.species_name}`}
                        src={pokemon.image}
                        width={size}
                        height={size}
                    />

                    <span className="absolute top-2 right-2 z-10 bg-muted/20 border border-border text-muted text-xs font-bold px-2 py-0.5 rounded-full transition duration-300 group-hover:bg-primary/10">
                        #{pokemon.id.toString().padStart(3, "0")}
                    </span>

                    <span className="capitalize text-foreground/80 text-sm font-bold px-2 py-1">
                        {pokemon.species_name}
                    </span>
                </div>
            </Link>
        </motion.div>
    );
};

export default EvolutionCard;
