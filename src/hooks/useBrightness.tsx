import { useMemo } from "react";

import { checkBrightness } from "@/helpers/pokemonHelpers";

const useBrightness = (color: string) => {
    const isBright = useMemo<boolean>(() => {
        return checkBrightness(color);
    }, [color]);
    return isBright ? "#FFFFFF" : "#000000";
};

export default useBrightness;
