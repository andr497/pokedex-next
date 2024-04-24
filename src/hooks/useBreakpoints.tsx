"use client";
import { useEffect, useState } from "react";
import useMedia from "use-media";

type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl";

const useBreakpoints = (): ScreenSize => {
    const isExtraSmall = useMedia({ minWidth: 0, maxWidth: 639 });
    const isSmall = useMedia({ minWidth: 640, maxWidth: 767 });
    const isMedium = useMedia({ minWidth: 768, maxWidth: 1023 });
    const isLarge = useMedia({ minWidth: 1024, maxWidth: 1279 });

    const [screenSize, setScreenSize] = useState<ScreenSize>(() => {
        if (isExtraSmall) return "xs";
        if (isSmall) return "sm";
        if (isMedium) return "md";
        if (isLarge) return "lg";
        return "xl";
    });

    useEffect(() => {
        if (isExtraSmall) setScreenSize("xs");
        else if (isSmall) setScreenSize("sm");
        else if (isMedium) setScreenSize("md");
        else if (isLarge) setScreenSize("lg");
        else setScreenSize("xl");
    }, [isExtraSmall, isSmall, isMedium, isLarge]);

    return screenSize;
};

export default useBreakpoints;
