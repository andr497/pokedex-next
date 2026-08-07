import { PokemonGrid } from "@/components/Pokemon";
import { searchPokemonByName } from "@/server/PokemonRepository";
import NotFound from "../not-found";
import { Suspense } from "react";
import Loading from "../loading";
import Container from "@/components/layout/Container";

interface Props {
    searchParams: { q: string };
}

export default async function PokemonSearchPage({ searchParams }: Props) {
    const { q: name } = await searchParams;

    const pokemon = name?.trim() ? await searchPokemonByName(name) : [];

    return (
        <Suspense fallback={<Loading />}>
            <Container className="mt-4 space-y-4">
                {pokemon.length > 0 && (
                    <>
                        <section className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end border-b pb-6 mt-5 mb-10">
                            <div>
                                <h1 className="text-foreground tracking-tight text-[32px] font-bold leading-tight">
                                    Result for {`"${name}"`}
                                </h1>
                                <p className="text-muted text-sm font-normal leading-normal pt-2 flex items-center gap-2">
                                    <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                                        {pokemon.length} Found
                                    </span>
                                    <span>in Pokemon</span>
                                </p>
                            </div>
                        </section>
                        <PokemonGrid pokemons={pokemon} />
                    </>
                )}
                {pokemon.length < 1 && <NotFound />}
            </Container>
        </Suspense>
    );
}
