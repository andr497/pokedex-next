import { getPokemonList } from "api/pokemon";

export async function GET(request: Request) {
    try {
        const data = await getPokemonList("pokemon-species");
        return Response.json({ ...data });
    } catch (e) {
        const error = e as Error;

        return Response.json(
            { error: true, status_code: 500, message: error.message },
            {
                status: 500,
            }
        );
    }
}
