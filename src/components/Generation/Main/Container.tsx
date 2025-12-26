"use client";

import { useEffect, useState } from "react";

import { Generation } from "@/interfaces/PokeApi/IGenerations";
import GenerationCard from "./Card";
import { Loading } from "@/components/Loading";
import { getGenerations } from "@/api/generation";
import useSWR from "swr";

const GenerationGrid = () => {
    const { data, isLoading } = useSWR("1", getGenerations);
    const [generations, setGenerations] = useState<Generation[]>([]);

    useEffect(() => {
        if (!data) return;
        setGenerations(data);
    }, [data]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {generations.map((generation, key) => {
                return (
                    <GenerationCard
                        key={`generation-${key}`}
                        generation={generation}
                    />
                );
            })}
        </section>
    );
};

export default GenerationGrid;
