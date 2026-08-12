import { pokemonRepository } from "@/server/repositories/pokemon.repository";
import { moveService } from "@/server/services/move.service";
import ServerError from "@/helpers/ServerError";
import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ pokemon_id: string }> },
) {
    try {
        const { pokemon_id } = await params;

        const { searchParams } = new URL(request.url);
        const pokemonResponse = await pokemonRepository.getById(pokemon_id);

        const movesDetailsResponse =
            await moveService.getMovesByPokemonAndVersion(
                pokemonResponse.moves,
                searchParams,
            );

        return Response.json(
            {
                moves: movesDetailsResponse,
            },
            {
                status: 200,
            },
        );
    } catch (error) {
        if (error instanceof ServerError) {
            return Response.json(
                {
                    error: true,
                    message: error.message,
                },
                {
                    status: error.statusCode,
                },
            );
        }

        if (error instanceof Error) {
            return Response.json(
                {
                    error: true,
                    message: error.message,
                },
                {
                    status: 500,
                },
            );
        }
    }
}
