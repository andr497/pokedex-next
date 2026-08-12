import { Suspense } from "react";

import axios from "axios";
import { notFound } from "next/navigation";
import { Loading } from "@/components/Loading";
import Container from "@/components/layout/Container";
import { generationService } from "@/server/services/generation.service";
import { typeRepository } from "@/server/repositories/types.repository";
import GenerationWrapper from "@/app/generation/[name]/components/GenerationWrapper";

interface PropTypes {
    params: {
        name: string;
    };
}

export default async function GenerationPage({ params }: PropTypes) {
    const { name } = await params;

    const data = await generationService.getDetailById(name).catch((e) => {
        if (axios.isAxiosError(e) && e.response?.status === 404) {
            notFound();
        }
        throw e;
    });

    const { results: pokemonTypes } = await typeRepository.getAll({
        limit: 18,
    });

    return (
        <Suspense fallback={<Loading />}>
            <Container>
                <GenerationWrapper
                    generation={data}
                    pokemonTypes={pokemonTypes}
                />
            </Container>
        </Suspense>
    );
}
