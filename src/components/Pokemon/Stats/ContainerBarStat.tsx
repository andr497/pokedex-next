"use client";
import { useEffect, useState } from "react";

import useStats from "@/hooks/useStats";
import { StatsPokemon } from "@/interfaces/IPokemonDetails";
import { StatsPokemonClean } from "@/helpers/PokemonStatsHelper";

import BarStat from "./BarStat";
import ButtonStat from "./ButtonStat";

interface Props {
    stats: {
        id: number;
        stats_details: StatsPokemon[];
    };
    types: { colorType1: string; colorType2: string };
}

const ContainerBarStat = ({ stats, types }: Props) => {
    const { valueStats } = useStats({ stats });
    const [selected, setSelected] = useState<number>(0);
    const [prevSelected, setPrevSelected] = useState<number>(0);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPrevSelected(selected);
    }, [selected]);

    return (
        <>
            <div className="flex-1 w-1/2 max-md:w-full items-center justify-end mb-4">
                <ButtonStat
                    selected={selected}
                    setSelected={setSelected}
                    types={types}
                />
            </div>
            <div className="grow space-y-5">
                {Object.entries(valueStats).map(
                    (stats: [string, StatsPokemonClean[]], index) => (
                        <div key={`stats-bar-${selected}-${index}`}>
                            <div className="flex justify-between text-sm mb-2.5">
                                <BarStat
                                    stats={stats[1]}
                                    selected={selected}
                                    prev={prevSelected}
                                    color={types}
                                />
                            </div>
                        </div>
                    )
                )}
                <div className="pt-4 border-t border-border mt-4">
                    <p className="text-xs text-muted mt-2">
                        The base value represents the Pokémon’s natural stat.
                        The minimum and maximum values indicate the possible
                        range that stat can reach at level 100, depending on
                        factors such as nature, effort values (EVs), and
                        individual values (IVs).
                    </p>
                </div>
            </div>
        </>
    );
};

export default ContainerBarStat;
