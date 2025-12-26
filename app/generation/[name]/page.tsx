import { Suspense } from "react";

import { notFound } from "next/navigation";
import { Loading } from "@/components/Loading";
import { findPokemonByGenerations } from "server/PokemonRepository";
import GenerationDetailsContainer from "@/components/Generation/Details/Container";
import Container from "@/components/layout/Container";

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
            <Container>
                <GenerationDetailsContainer
                    pokemonData={data.pokemonSpecies}
                    generation={data.generation}
                />
            </Container>
        </Suspense>
    );
}
