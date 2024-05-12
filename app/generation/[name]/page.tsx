import { Suspense } from "react";

import { Metadata } from "next";

import { notFound } from "next/navigation";
import PokemonCard from "@/components/PokemonCard";
import { findPokemonByGenerations } from "server/PokemonRepository";

import Loading from "../../loading";
import PokemonGrid from "@/components/PokemonGrid/PokemonGrid";

interface PropTypes {
    params: {
        name: string;
    };
}

export default async function GenerationPage({ params }: PropTypes) {
    const { name } = params;

    const data = await findPokemonByGenerations(name);
    if (!data) {
        return notFound();
    }

    return (
        <Suspense fallback={<Loading />}>
            <PokemonGrid pokemonData={data.pokemonSpecies} generation={data.generation} />
        </Suspense>
    );
}
