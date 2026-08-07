import { Suspense } from "react";
import Loading from "../loading";
import Container from "@/components/layout/Container";
import TypeHeroSection from "./components/TypeHeroSection";
import TypeContainer from "./components/TypeContainer";
import { typeService } from "@/server/services/types.service";

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
