"use client";
import { useEffect } from "react";

import { useTheme } from "next-themes";

import { COLOR } from "@/helpers/constants";
import { axiosCacheInstance } from "@/api/config";
import { AxiosError } from "axios";

interface Props {
    type: keyof typeof COLOR;
}

const useSvgTypeBackground = ({ type }: Props) => {
    const { theme } = useTheme();

    useEffect(() => {
        (async () => {
            const response = await axiosCacheInstance({
                method: "get",
                baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
                url: `/assets/types/${type}.svg`,
            });

            const { data } = response;

            const parser = new DOMParser();
            const svgDOM = parser.parseFromString(data, "image/svg+xml");

            const svgElements = svgDOM.getElementsByTagName("path");

            const fillColor = COLOR[type];

            Array.from(svgElements).forEach((element) => {
                element.setAttribute("fill", fillColor);
                element.setAttribute("opacity", theme === "dark" ? "1" : "0.2");
            });

            const modifiedSvgString = new XMLSerializer().serializeToString(
                svgDOM
            );

            const pokemonContainer = document.querySelector(
                "#image-pokemon-container"
            ) as HTMLDivElement;
            if (!pokemonContainer) return;

            pokemonContainer.style.backgroundImage = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(
                modifiedSvgString
            )}")`;
            pokemonContainer.style.backgroundSize = "contain";
            pokemonContainer.style.backgroundRepeat = "no-repeat";
            pokemonContainer.style.backgroundPosition = "center";
        })().catch((error) => {
            if (error instanceof AxiosError) {
                console.log(error);
            } else if (error instanceof Error) {
                console.log(error);
            }
        });
    }, [type, theme]);
};

export default useSvgTypeBackground;
