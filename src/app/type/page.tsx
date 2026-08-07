import { Suspense } from "react";
import Loading from "../loading";
import Container from "@/components/layout/Container";
import TypeHeroSection from "./components/TypeHeroSection";
import TypeContainer from "./components/TypeContainer";
import { getTypes } from "@/api/types";

export default async function TypePage() {
    const types = await getTypes();
    return (
        <Suspense fallback={<Loading />}>
            <Container>
                <TypeHeroSection />
                <TypeContainer types={types} />
            </Container>
        </Suspense>
    );
}
