import { NamedAPIResource } from "@/interfaces/PokeApi/CommonModels";
import React from "react";

interface Props {
    label: string;
    list: NamedAPIResource[];
}

const Counter = ({ label, list }: Props) => {
    const numberOfElements = list.length;

    return (
        <div className="grow basis-0 md:w-1/4 sm:w-1/2 max-sm:w-fit max-sm:min-w-32 cursor-default">
            <div className="border-2 dark:border-gray-600 border-gray-400 px-4 py-6 rounded">
            <h2 className="title-font font-medium text-3xl dark:text-gray-200 text-gray-800 max-sm:text-md">{numberOfElements}</h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-100 max-sm:text-sm">{label}</p>
            </div>
        </div>
    );
};

export default Counter;
