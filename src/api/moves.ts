import { AxiosResponse } from "axios";
import { axiosCacheInstance } from "./config";
import {
    PokemonMove,
    PokemonMoveVersion,
} from "@/interfaces/PokeApi/IPokemonApi";
import { CombinePokemonMove, Moves } from "@/interfaces/PokeApi/IMoves";

export const getMovesById = async (id: string | number) => {
    const response: AxiosResponse<Moves> = await axiosCacheInstance({
        method: "get",
        url: `/move/${id}`,
    });

    return response.data;
};

export const getAllMovesPokemonMoves = async (moves: PokemonMove[]) => {
    const response: CombinePokemonMove[] = await Promise.all(
        moves.map(async (move) => {
            const responseMoves = await getMovesById(move.move.name);
            return {
                ...move,
                ...responseMoves,
            };
        }),
    );

    return response;
};

export const getMovesByPokemonAndVersion = async (
    moves: PokemonMove[],
    searchParams: URLSearchParams,
): Promise<CombinePokemonMove[]> => {
    const versionGroup = searchParams.get("versionGroup") ?? "";
    const learnMethod = searchParams.get("learnMethod") ?? "level-up";

    const movesWithVersionDetail = moves
        .map((move) => {
            const versionDetail = move.version_group_details.find(
                (detail) =>
                    detail.version_group.name === versionGroup &&
                    detail.move_learn_method.name === learnMethod,
            );

            if (!versionDetail) return null;

            return {
                moveName: move.move.name,
                versionDetail,
            };
        })
        .filter(
            (
                item,
            ): item is {
                moveName: string;
                versionDetail: PokemonMoveVersion;
            } => item !== null,
        );

    const response = await Promise.all(
        movesWithVersionDetail.map(async ({ moveName, versionDetail }) => {
            const moveData = await getMovesById(moveName);

            return {
                ...moveData,
                version_group: versionDetail,
            };
        }),
    );

    response.sort(
        (a, b) =>
            a.version_group.level_learned_at - b.version_group.level_learned_at,
    );

    return response;
};

export const getAllPokemonMovesProcess = async ({
    id,
    params,
}: {
    id: string | number;
    params: any;
}) => {
    params = new URLSearchParams(params);
    const response: AxiosResponse<{ moves: CombinePokemonMove[] }> =
        await axiosCacheInstance({
            method: "get",
            baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
            url: `/api/moves/${id}?${params.toString()}`,
        });

    return response.data;
};

export const getVersionGroups = async () => {
    const response: AxiosResponse<{ moves: CombinePokemonMove[] }> =
        await axiosCacheInstance({
            method: "get",
            baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
            url: `/api/version-group`,
        });

    return response.data;
};
