import { Suspense } from "react";

import GenerationContainer from "@/components/Generation/Main/Container";

import Loading from "./loading";

export default function Home() {
    return (
        <Suspense fallback={<Loading />}>
            <GenerationContainer />
        </Suspense>
    );
}
