import { checkBrightness } from "@/helpers/pokemonHelpers";
import { useMemo } from "react";

type HexColor = string & { __isHexColor: true };

function isHexColor(value: string): value is HexColor {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
}

const useBrightness = (color: string) => {
    const isBright = useMemo<boolean>(() => {
        return checkBrightness(color);
    }, [color]);
    return isBright ? "#FFFFFF" : "#000000";
};

export default useBrightness;
