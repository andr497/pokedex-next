"use client";
import React, { useMemo } from "react";

import { COLOR } from "@/helpers/constants";
import useBreakpoints from "@/hooks/useBreakpoints";
import { CombinePokemonMove } from "@/interfaces/PokeApi/IMoves";
import { MoveLearnMethod, VersionGroup } from "@/interfaces/TableMoveTypes";

import IconSvg from "../StyledComponents/IconSvg";

interface TableRowProps {
    pokemonMove: CombinePokemonMove;
    game: VersionGroup;
    method: MoveLearnMethod;
}

const TableRow = ({ pokemonMove, game, method }: TableRowProps) => {
    const width = useBreakpoints();
    const version = useMemo(
        () =>
            pokemonMove.version_group_details.filter(
                ({ move_learn_method, version_group }) =>
                    move_learn_method.name === method &&
                    version_group.name === game
            ),
        [pokemonMove]
    );

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            {pokemonMove && (
                <>
                    <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                        {version[0].level_learned_at}
                    </th>
                    <td className="px-6 py-4 capitalize text-nowrap max-sm:text-sm">
                        {pokemonMove.name.replace("-", " ")}
                    </td>
                    <td className="px-6 py-4 flex gap-2 items-center justify-evenly">
                        <IconSvg
                            src={`/assets/damage-moves-icon/${pokemonMove.damage_class.name}.svg`}
                            width={width === "xs" ? 25 : 30}
                            height={width === "xs" ? 25 : 30}
                            color={
                                pokemonMove.damage_class.name === "special"
                                    ? "skyblue"
                                    : pokemonMove.damage_class.name ===
                                      "physical"
                                    ? "orange"
                                    : "gray"
                            }
                        />
                        <IconSvg
                            src={`/assets/types/${pokemonMove.type.name}.svg`}
                            width={width === "xs" ? 20 : 25}
                            height={width === "xs" ? 20 : 25}
                            color={
                                COLOR[
                                    pokemonMove.type.name as keyof typeof COLOR
                                ]
                            }
                        />
                    </td>
                    <td className="px-6 py-4">{pokemonMove.power ?? "-"}</td>
                    <td className="px-6 py-4">{pokemonMove.pp}</td>
                </>
            )}
        </tr>
    );
};

export default TableRow;
