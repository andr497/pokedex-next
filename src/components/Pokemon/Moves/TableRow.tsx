"use client";

import { COLOR } from "@/helpers/constants";
import useBreakpoints from "@/hooks/useBreakpoints";
import IconSvg from "@/components/StyledComponents/IconSvg";
import { CombinePokemonMove } from "@/interfaces/PokeApi/IMoves";

interface TableRowProps {
    pokemonMove: CombinePokemonMove;
}

const TableRow = ({ pokemonMove }: TableRowProps) => {
    const width = useBreakpoints();

    return (
        <tr className="hover:bg-border/30 transition-colors group">
            <th scope="row" className="p-3 text-muted font-medium">
                {pokemonMove.version_group?.level_learned_at ?? "-"}
            </th>
            <td className="p-3 font-bold capitalize">
                {pokemonMove.name.replace(/-/g, " ")}
            </td>
            <td className="p-3">
                <IconSvg
                    src={`/assets/types/${pokemonMove.type.name}.svg`}
                    color={COLOR[pokemonMove.type.name as keyof typeof COLOR]}
                />
            </td>
            <td className="p-3">
                <IconSvg
                    src={`/assets/damage-moves-icon/${pokemonMove.damage_class.name}.svg`}
                    width={width === "xs" ? 25 : 30}
                    height={width === "xs" ? 25 : 30}
                    color={
                        pokemonMove.damage_class.name === "special"
                            ? "skyblue"
                            : pokemonMove.damage_class.name === "physical"
                              ? "orange"
                              : "gray"
                    }
                />
            </td>
            <td className="p-3">{pokemonMove.power ?? "-"}</td>
            <td className="p-3">{pokemonMove.accuracy ?? "-"}</td>
            <td className="p-3">{pokemonMove.pp}</td>
        </tr>
    );
};

export default TableRow;