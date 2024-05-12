import { Suspense } from "react";

import GenerationGrid from "@/components/GenerationGrid/GenerationGrid";

import Loading from "./loading";

export default function Home() {
    return (
        <Suspense fallback={<Loading />}>
            <GenerationGrid />
        </Suspense>
    );
}
