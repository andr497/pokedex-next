import { Suspense } from "react";

import GenerationContainer from "@/components/Generation/Main/Container";

import Loading from "./loading";
import Container from "@/components/layout/Container";
import HeroSection from "@/components/Home/HeroSection";

export default function Home() {
    return (
        <Suspense fallback={<Loading />}>
            <Container>
                <HeroSection />
                <GenerationContainer />
            </Container>
        </Suspense>
    );
}
