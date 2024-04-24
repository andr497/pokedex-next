"use client";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import { COLOR } from "helpers/constants";

const SetBackground = ({ type }: { type: keyof typeof COLOR }) => {
    const { theme } = useTheme();

    useEffect(() => {
        const fetchSVG = async () => {
            try {
                const response = await fetch(`/assets/types/${type}.svg`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const svgData = await response.text();
                const parser = new DOMParser();
                const svgDOM = parser.parseFromString(svgData, "image/svg+xml");

                const svgElements = svgDOM.getElementsByTagName("path");
                // const fillColor =
                //   theme === "dark" ? "rgb(0, 0, 0, .2)" : "rgb(0, 0, 0, .025)";
                const fillColor = COLOR[type];

                Array.from(svgElements).forEach((element) => {
                    element.setAttribute("fill", fillColor);
                    element.setAttribute(
                        "opacity",
                        theme === "dark" ? "1" : "0.2"
                    );
                });

                const modifiedSvgString = new XMLSerializer().serializeToString(
                    svgDOM
                );

                const pokemonContainer = document.querySelector("#image-pokemon-container") as HTMLDivElement;
                if(!pokemonContainer) return;

                pokemonContainer.style.backgroundImage = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(
                    modifiedSvgString
                )}")`;
                pokemonContainer.style.backgroundSize = "contain";
                pokemonContainer.style.backgroundRepeat = "no-repeat";
                pokemonContainer.style.backgroundPosition = "center";
            } catch (error) {
                console.error(
                    "There has been a problem with your fetch operation:",
                    error
                );
            }
        };

        fetchSVG();
    }, [type, theme]);

    return <></>;
};

export default SetBackground;
