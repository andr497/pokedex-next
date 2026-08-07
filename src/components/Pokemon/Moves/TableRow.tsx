"use client";

import { COLOR } from "@/helpers/constants";
import useBreakpoints from "@/hooks/useBreakpoints";
import IconSvg from "@/components/StyledComponents/IconSvg";
import { CombinePokemonMove } from "@/interfaces/PokeApi/IMoves";
import { MoveLearnMethod, VersionGroup } from "@/interfaces/TableMoveTypes";

interface TableRowProps {
    pokemonMove: CombinePokemonMove;
    game: VersionGroup;
    method: MoveLearnMethod;
}

const TableRow = ({ pokemonMove, game, method }: TableRowProps) => {
    const width = useBreakpoints();

    return (
        <tr className="hover:bg-border/30 transition-colors group">
            {pokemonMove && (
                <>
                    <th scope="row" className="p-4 text-muted font-medium">
                        {pokemonMove.version_group?.level_learned_at ?? "-"}
                    </th>
                    <td className="p-4 font-bold capitalize">
                        {pokemonMove.name.replace("-", " ")}
                    </td>
                    <td className="p-4">
                        <IconSvg
                            src={`/assets/types/${pokemonMove.type.name}.svg`}
                            color={
                                COLOR[
                                    pokemonMove.type.name as keyof typeof COLOR
                                ]
                            }
                        />
                    </td>
                    <td className="p-4">
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
                    </td>
                    <td className="p-4">{pokemonMove.power ?? "-"}</td>
                    <td className="p-4">{pokemonMove.accuracy ?? "-"}</td>
                    <td className="p-4">{pokemonMove.pp}</td>
                </>
            )}
        </tr>
    );
};

export default TableRow;
