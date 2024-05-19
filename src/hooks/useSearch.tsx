"use client";
import React, { useEffect, useState } from "react";

interface Props<T extends Record<string, unknown>, K extends keyof T> {
    data: T[];
    key: K;
    filters?: Filters<T, keyof T>[];
}

interface Filters<T, K extends keyof T> {
    filterKey: K;
    filterCallback: (data: T[], value: NonNullable<any>) => T[];
}

const useSearch = <T extends Record<K, unknown>, K extends keyof T>({
    data,
    key,
    filters = [],
}: Props<T, K>) => {
    const [list, setList] = useState<T[]>(data);
    const [search, setSearch] = useState<string>("");
    const [filtersState, setFiltersState] = useState<any>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        setSearch(value);
    };

    const handleFiltersChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const name = e.currentTarget.name as K;

        const value = e.currentTarget.value;

        setFiltersState({
            ...filtersState,
            [name]: value,
        });
    };

    useEffect(() => {
        let filterList = data.filter((e) => {
            return e[key]!.toString()
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase());
        });

        if (filtersState !== null) {
            filters.forEach(({ filterKey, filterCallback }) => {
                if (typeof filtersState[filterKey] !== "undefined") {
                    filterList = filterCallback(
                        filterList,
                        filtersState[filterKey]
                    );
                }
            });
        }

        setList(filterList);
    }, [search, filtersState]);

    return {
        handleChange,
        handleFiltersChange,
        list,
    };
};

export default useSearch;
