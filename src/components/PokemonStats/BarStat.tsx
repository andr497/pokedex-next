"use client";
import { StatsPokemonClean } from "@/helpers/PokemonStatsHelper";
import useBrightness from "@/hooks/useBrightness";
import React, { useEffect, useState } from "react";

interface Props {
    stats: StatsPokemonClean[];
    selected: number;
    prev: number;
    color: {
        colorType1: string;
        colorType2: string;
    };
}

const BarStat = ({ stats, selected, prev, color }: Props) => {
    const [completed, setCompleted] = useState<number | undefined>(
        stats[prev]?.percentage
    );
    const fontColor = useBrightness(color.colorType2);

    useEffect(() => {
        if (stats[selected] && stats[selected].percentage !== completed) {
            setCompleted(stats[selected].percentage);
        }
    }, [selected, prev, stats, completed]);

    return (
        <div className="group relative w-full bg-gray-200 rounded-full h-5 dark:bg-gray-700 overflow-hidden">
            {typeof completed !== "undefined" && (
                <>
                    <div
                        className="h-full rounded-full bg-blue-500 transition-all duration-1000 ease-in-out"
                        role="progressbar"
                        aria-labelledby={`progressbar-${stats[selected].name}`}
                        aria-label={`progressbar-${stats[selected].name}`}
                        style={{
                            background: `linear-gradient(to right, ${color.colorType1}, ${color.colorType2})`,
                            width: `${completed}%`,
                        }}
                    />
                    <span
                        className="absolute top-0 text-sm font-medium transition-all duration-1000 ease-in-out"
                        style={{
                            right: `${102 - completed}%`,
                            color: fontColor,
                        }}
                    >
                        {stats[selected].base_stat}
                    </span>
                </>
            )}
        </div>
    );
};

export default BarStat;
