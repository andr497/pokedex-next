"use client";
import Chip from "@/components/Common/Chip";
import { COLOR } from "@/helpers/constants";
import useBrightness from "@/hooks/useBrightness";
import IconSvg from "@/components/StyledComponents/IconSvg";
import { PokemonType } from "@/interfaces/PokeApi/IPokemonApi";

interface Props {
    type: PokemonType["type"]["name"];
}

const TypeChip = ({ type }: Props) => {
    const fontColor: string = useBrightness(COLOR[type]);
    return (
        <Chip
            icon={
                <IconSvg
                    className="aspect-auto"
                    src={`/assets/types/${type}.svg`}
                    title={`icon-${type}`}
                    width={18}
                    color={fontColor}
                />
            }
            className="capitalize"
            label={""}
            size="small"
            style={{
                backgroundColor: COLOR[type],
                color: fontColor,
            }}
        />
    );
};

export default TypeChip;
