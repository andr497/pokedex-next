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
                    <SearchIcon
                        className={`block h-6 w-6 ${
                            focus ? "text-blue-300" : "text-gray-400"
                        }`}
                    />
                    <span className="sr-only">Search icon</span>
                </div>
                <input
                    type="text"
                    placeholder="Search pokemon by name..."
                    className={`block w-full pl-12 pr-4 py-1.5 bg-base-100 border border-border rounded-lg text-foreground placeholder-text-secondary focus:ring-1 focus:ring-primary focus:border-transparent transition-all outline-none`}
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
