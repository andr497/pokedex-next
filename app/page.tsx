import { Suspense } from "react";
import PokemonListGrid from "components/PokemonListGrid";
import Loading from "./loading";

export default function Home() {
    return (
        <Suspense fallback={<Loading />}>
            <PokemonListGrid />
        </Suspense>
    );
}
