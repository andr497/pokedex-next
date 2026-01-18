import { Suspense } from "react";

import { notFound } from "next/navigation";
import { Loading } from "@/components/Loading";
import Container from "@/components/layout/Container";
import { findPokemonByGenerations } from "@/server/PokemonRepository";
import GenerationWrapper from "@/app/generation/[name]/components/GenerationWrapper";

interface PropTypes {
    params: {
        name: string;
    };
}

export default async function GenerationPage({ params }: PropTypes) {
    const { name } = await params;

    const data = await findPokemonByGenerations(name);
    if (!data) {
        return notFound();
    }

    return (
        <Suspense fallback={<Loading />}>
            <Container>
                <GenerationWrapper
                    pokemonData={data.pokemonSpecies}
                    generation={data.generation}
                />
            </Container>
        </Suspense>
    );
}
