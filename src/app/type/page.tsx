import { Suspense } from "react";

import Container from "@/components/layout/Container";
import { typeService } from "@/server/services/types.service";

import Loading from "../loading";
import TypeContainer from "./components/TypeContainer";
import TypeHeroSection from "./components/TypeHeroSection";

export default async function TypePage() {
    const types = await typeService.getList();
    return (
        <Suspense fallback={<Loading />}>
            <Container>
                <TypeHeroSection />
                <TypeContainer types={types} />
            </Container>
        </Suspense>
    );
}
