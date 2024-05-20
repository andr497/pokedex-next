import { PokemonContainer } from "@/components/Pokemon";
import { searchPokemonByName } from "@/server/PokemonRepository";
import NotFound from "../not-found";

interface Props {
    searchParams: { q: string };
}

export default async function PokemonSearchPage({ searchParams }: Props) {
    const { q: name } = searchParams;

    const pokemon = await searchPokemonByName(name);
    return (
        <>
            {typeof name === "undefined" ||
            name === "" ||
            pokemon.length < 1 ? (
                <NotFound />
            ) : (
                <PokemonContainer pokemons={pokemon} />
            )}
        </>
    );
}
