"use client";

import React, { ComponentPropsWithRef, useState } from "react";
import { MagnifyingGlassIcon as SearchIcon } from "@heroicons/react/20/solid";

interface Props extends ComponentPropsWithRef<"input"> {
    onSearch: (e: React.FormEvent) => void;
    formClassName?: string;
}

const InputSearch = ({ onSearch, formClassName, ...props }: Props) => {
    const [focus, setFocus] = useState(false);

    return (
        <form className={`${formClassName}`} onSubmit={onSearch}>
            <search className="relative group">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <SearchIcon className={`block h-6 w-6 ${focus ? "text-blue-300" : "text-gray-400"}`} />
                    <span className="sr-only">Search icon</span>
                </div>
                <input
                    type="text"
                    className={`w-full p-2 ps-10 text-gray-900 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    onFocus={() => {
                        setFocus((prev) => !prev);
                    }}
                    onBlur={() => {
                        setFocus((prev) => !prev);
                    }}
                    {...props}
                />
            </search>
        </form>
    );
};

export default InputSearch;
