"use client";
import { StatsPokemonClean } from "@/helpers/PokemonStatsHelper";
import { useEffect, useState } from "react";

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

    useEffect(() => {
        if (stats[selected] && stats[selected].percentage !== completed) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCompleted(stats[selected].percentage);
        }
    }, [selected, prev, stats, completed]);

    return (
        <>
            <span className="font-bold text-muted w-12 uppercase">
                {stats[selected].initials}
            </span>
            <span className="font-bold w-12 text-right">
                {stats[selected].base_stat}
            </span>

            <div className="flex-1 mx-4 relative overflow-hidden self-center h-3.5 bg-foreground/15 rounded-full">
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
                    </>
                )}
            </div>
        </>
    );
};

export default BarStat;
