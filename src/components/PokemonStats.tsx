"use client";
import React, { useEffect, useState } from "react";
import {
    StatsPokemonCalculated,
    calculateStatsPokemon,
} from "helpers/PokemonStatsHelper";
import { StatsPokemon } from "interfaces/IPokemonDetails";
import { Variants, motion } from "framer-motion";
// import Tabs from "./TabPanel/Tabs";
// import Tab from "./TabPanel/Tab";
import { Tab } from "@headlessui/react";
import ProgressBar from "./ProgressBar/ProgressBar";
import { StatsPokemonClean } from "./../helpers/PokemonStatsHelper";

interface Props {
    stats: {
        id: number;
        stats_details: StatsPokemon[];
    };
    types: { colorType1: string; colorType2: string };
}

// const PokemonStats = ({ stats, types }: Props) => {
//     const { id, stats_details } = stats;
//     const stats_pokemon = calculateStatsPokemon(stats_details, id);

//     return (
//         <div className="">
//             <Tabs className="font-bold uppercase" color={types} role="tabpanel">
//                 {Object.entries(stats_pokemon).map(
//                     (
//                         [title, data]: [title: string, data: StatsPokemonClean[]],
//                         index
//                     ) => (
//                         <Tab key={`stats-tab-${index}`} title={title} role="tab">
//                             <div>
//                                 {data.map((value, key) => {
//                                     return (
//                                         <div key={`stats-bar-${title}-${key}`}>
//                                             <ProgressBar
//                                                 color={types}
//                                                 title={value.name}
//                                                 value={value.base_stat}
//                                                 percentage={value.percentage!}
//                                             />
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </Tab>
//                     )
//                 )}
//             </Tabs>
//         </div>
//     );
// };

type OptionsStats = "base" | "min" | "max";

const PokemonStats = ({ stats, types }: Props) => {
    const [selected, setSelected] = useState<number>(0);
    const [valueStats, setValueStats] = useState<StatsPokemonClean[]>([]);
    const [maxPokemonStats, setMaxPokemonStats] = useState<StatsPokemonClean[]>(
        []
    );
    const [minPokemonStats, setMinPokemonStats] = useState<StatsPokemonClean[]>(
        []
    );

    useEffect(() => {
        if (typeof stats !== "undefined") {
            const { id, stats_details } = stats;
            const { base, max, min } = calculateStatsPokemon(stats_details, id);

            setValueStats(base);
            setMaxPokemonStats(max);
            setMinPokemonStats(min);
        }
    }, [stats]);

    const statsContent = [valueStats, minPokemonStats, maxPokemonStats];
    const statsKeys: OptionsStats[] = ["base", "min", "max"];

    return (
        <Tab.Group
            onChange={(index) => {
                setSelected(index);
            }}
        >
            <Tab.List>
                {statsKeys.map((title: OptionsStats, index) => (
                    <Tab
                        key={`stats-button-${index}`}
                        className={`inline-block p-4 capitalize ${
                            selected === index
                                ? "active font-bold"
                                : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        } border-b-2 rounded-t-lg`}
                        style={{
                            color: selected === index ? types.colorType1 : "",
                            borderColor:
                                selected === index ? types.colorType1 : "",
                        }}
                    >
                        {title}
                    </Tab>
                ))}
            </Tab.List>

            <Tab.Panels className="sm:w-max-[300px]">
                {statsContent.map((stats, stats_index) => (
                    <Tab.Panel key={`tab-panel-${stats_index}`}>
                        {stats.map((stat, stat_index) => (
                            <div key={`stats-bar-${selected}-${stat_index}`}>
                                <ProgressBar
                                    color={types}
                                    title={stat.name}
                                    value={stat.base_stat}
                                    percentage={stat.percentage!}
                                />
                            </div>
                        ))}
                    </Tab.Panel>
                ))}
                {/* {
                    <Tab.Panel>
                        {statsContent[selected].map((stat, stat_index) => (
                            <div key={`stats-bar-${selected}-${stat_index}`}>
                                <ProgressBar
                                    color={types}
                                    title={stat.name}
                                    value={stat.base_stat}
                                    percentage={stat.percentage!}
                                />
                            </div>
                        ))}
                    </Tab.Panel>
                } */}
            </Tab.Panels>
        </Tab.Group>
    );
};

export default PokemonStats;
