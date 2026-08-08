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
            className="capitalize"
            label={
                <span className="inline-flex items-center gap-1.5">
                    <IconSvg
                        src={`/assets/types/${type}.svg`}
                        title={`icon-${type}`}
                        width={14}
                        color={fontColor}
                    />
                    <span>{type}</span>
                    <span className="bg-foreground/30 rounded text-xs font-semibold px-1.5 py-0.5 text-center leading-none">
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
