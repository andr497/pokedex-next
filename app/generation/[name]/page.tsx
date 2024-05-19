import { Suspense } from "react";

import { notFound } from "next/navigation";
import PokemonGrid from "@/components/PokemonGrid/PokemonGrid";
import { findPokemonByGenerations } from "server/PokemonRepository";

import Loading from "../../loading";

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
