"use client";
import { useEffect } from "react";

import { useTheme } from "next-themes";

import { COLOR } from "@/helpers/constants";
import { axiosCacheInstance } from "@/api/config";
import { AxiosError } from "axios";

interface Props {
    type: keyof typeof COLOR;
}

const svgCache = new Map<string, string>();

const useSvgTypeBackground = ({ type }: Props) => {
    const { theme } = useTheme();

    useEffect(() => {
        let mounted = true;

        const loadSvg = async () => {
            try {
                const cacheKey = `${type}-${theme}`;

                let modifiedSvgString = svgCache.get(cacheKey);

                if (!modifiedSvgString) {
                    const { data } = await axiosCacheInstance({
                        method: "get",
                        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
                        url: `/assets/types/${type}.svg`,
                    });

                    const parser = new DOMParser();
                    const svgDOM = parser.parseFromString(
                        data,
                        "image/svg+xml",
                    );

                    const paths = svgDOM.getElementsByTagName("path");
                    const fillColor = COLOR[type];

                    Array.from(paths).forEach((element) => {
                        element.setAttribute("fill", fillColor);
                        element.setAttribute(
                            "opacity",
                            theme === "dark" ? "0.2" : "0.5",
                        );
                    });

                    modifiedSvgString = new XMLSerializer().serializeToString(
                        svgDOM,
                    );

                    svgCache.set(cacheKey, modifiedSvgString);
                }

                if (!mounted) return;

                const pokemonContainer = document.getElementById(
                    "image-pokemon-container",
                ) as HTMLDivElement | null;

                if (!pokemonContainer) return;

                pokemonContainer.style.backgroundImage = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(
                    modifiedSvgString,
                )}")`;

                pokemonContainer.style.backgroundSize = "contain";
                pokemonContainer.style.backgroundRepeat = "no-repeat";
                pokemonContainer.style.backgroundPosition = "center";
            } catch (error) {
                if (error instanceof AxiosError || error instanceof Error) {
                    console.error("Failed on load SVG: ", error);
                }
            }
        };
        loadSvg();
    }, [type, theme]);
};

export default useSvgTypeBackground;
