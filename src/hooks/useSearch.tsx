"use client";
import React, { useEffect, useState } from "react";

interface Props<T, K extends keyof T> {
    data: T[];
    key: K;
}

const useSearch = <T extends unknown, K extends keyof T>({ data, key }: Props<T, K>) => {
    const [list, setList] = useState<T[]>(data);
    const [search, setSearch] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        setSearch(value);
    };

    useEffect(() => {
        let filterList = data.filter((e) =>{
            return e[key]!.toString().toLocaleLowerCase().includes(search.toLocaleLowerCase())
        });

        setList(filterList);
    }, [search]);

    return {
        handleChange,
        list
    }
};

export default useSearch;
