import {
    PokemonMove,
    PokemonMoveVersion,
} from "@/interfaces/PokeApi/IPokemonApi";
import { CombinePokemonMove } from "@/interfaces/PokeApi/IMoves";
import { moveRepository } from "../repositories/move.repository";

export const moveService = {
    async getMovesByPokemonAndVersion(
        moves: PokemonMove[],
        searchParams: URLSearchParams,
    ): Promise<CombinePokemonMove[]> {
        const versionGroup = searchParams.get("versionGroup") ?? "";
        const learnMethod = searchParams.get("learnMethod") ?? "level-up";

        const versionGroupId = (name: string) =>
            Number(name.split("/").filter(Boolean).pop() ?? 0);

        const movesWithVersionDetail = moves
            .map((move) => {
                const versionDetail = versionGroup
                    ? move.version_group_details.find(
                          (detail) =>
                              detail.version_group.name === versionGroup &&
                              detail.move_learn_method.name === learnMethod,
                      )
                    : move.version_group_details
                          .filter(
                              (detail) =>
                                  detail.move_learn_method.name === learnMethod,
                          )
                          .sort(
                              (a, b) =>
                                  versionGroupId(b.version_group.url) -
                                  versionGroupId(a.version_group.url),
                          )[0];

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
                const moveData = await moveRepository.getById(moveName);

                return {
                    ...moveData,
                    version_group: versionDetail,
                };
            }),
        );

        response.sort(
            (a, b) =>
                a.version_group!.level_learned_at -
                b.version_group!.level_learned_at,
        );

        return response;
    },
};
