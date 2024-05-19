"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

import BarStat from "./BarStat";
import useStats from "@/hooks/useStats";
import { StatsPokemon } from "@/interfaces/IPokemonDetails";
import {
    StatsPokemonCalculated,
    StatsPokemonClean,
} from "@/helpers/PokemonStatsHelper";
import { StatsNamesCombine } from "./../../helpers/PokemonStatsHelper";
import ButtonStat from "./ButtonStat";

interface Props {
    stats: {
        id: number;
        stats_details: StatsPokemon[];
    };
    types: { colorType1: string; colorType2: string };
}

type StatsNamesCombineKey = keyof StatsNamesCombine;

const ContainerBarStat = ({ stats, types }: Props) => {
    const { valueStats } = useStats({ stats });
    const [selected, setSelected] = useState<number>(0);
    const prevSelectRef = useRef(0);

    useEffect(() => {
        prevSelectRef.current = selected;
    }, [selected]);

    const handleItemClick = (index: number) => {
        setSelected(index);
    };

    return (
        <div>
            <ButtonStat 
                selected={selected}
                setSelected={setSelected}
                types={types}
            />
            {Object.entries(valueStats).map(
                (stats: [string, StatsPokemonClean[]], index) => (
                    <div
                        key={`stats-bar-${selected}-${index}`}
                        className={`py-2 cursor-pointer`}
                    >
                        <span className="capitalize text-base font-medium text-black dark:text-white">
                            {stats[0]}
                        </span>
                        <BarStat
                            stats={stats[1]}
                            selected={selected}
                            prev={prevSelectRef.current}
                            color={types}
                        />
                    </div>
                )
            )}
        </div>
    );
};

export default ContainerBarStat;