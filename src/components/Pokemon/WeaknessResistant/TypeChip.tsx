"use client";
import Chip from "@/components/ui/Chip";
import { COLOR } from "@/helpers/constants";
import useBrightness from "@/hooks/useBrightness";
import IconSvg from "@/components/StyledComponents/IconSvg";
import { PokemonType } from "@/interfaces/PokeApi/IPokemonApi";

interface Props {
    type: PokemonType["type"]["name"];
    multiplier: number;
}

function formatMultiplier(multiplier: number): string {
    const map: Record<number, string> = {
        0: "0",
        0.25: "¼",
        0.5: "½",
        0.75: "¾",
        1: "1",
        2: "2",
        4: "4",
    };

    return map[multiplier] ?? multiplier.toString();
}

const TypeChip = ({ type, multiplier }: Props) => {
    const fontColor: string = useBrightness(COLOR[type]);
    return (
        <Chip
            icon={
                <IconSvg
                    className="aspect-auto me-1"
                    src={`/assets/types/${type}.svg`}
                    title={`icon-${type}`}
                    width={18}
                    color={fontColor}
                />
            }
            className="capitalize"
            label={
                <span className="flex items-center">
                    <span className="me-1">{type}</span>
                    <span className="bg-foreground/30 rounded-md m-1 text-xs font-semibold w-7 h-7 flex items-center justify-center">
                        x{formatMultiplier(multiplier)}
                    </span>
                </span>
            }
            size="small"
            style={{
                backgroundColor: COLOR[type],
                color: fontColor,
            }}
        />
    );
};

export default TypeChip;
