"use client";
import React, { useMemo, useState } from "react";

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

    const list = useMemo(() => {
        let filterList = data.filter((e) =>
            e[key]!.toString().toLowerCase().includes(search.toLowerCase())
        );

        filters.forEach(({ filterKey, filterCallback }) => {
            if (filtersState[filterKey] !== undefined) {
                filterList = filterCallback(
                    filterList,
                    filtersState[filterKey]
                );
            }
        });

        return filterList;
    }, [data, key, search, filters, filtersState]);

    return {
        handleChange,
        handleFiltersChange,
        list,
    };
};

export default useSearch;
