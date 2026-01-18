import { Suspense } from "react";

import GenerationContainer from "@/app/generation/components/GenerationContainer";

import Loading from "../loading";
import Container from "@/components/layout/Container";
import GenerationHeroSection from "@/app/generation/components/GenerationHeroSection";
import { getGenerations } from "@/api/generation";

export default async function GenerationPage() {
    const generations = await getGenerations();
    return (
        <Suspense fallback={<Loading />}>
            <Container>
                <GenerationHeroSection />
                <GenerationContainer generations={generations} />
            </Container>
        </Suspense>
    );
}
