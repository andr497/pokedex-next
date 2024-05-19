"use client";
import React from "react";
import { Switch } from "@headlessui/react";
import {
    SparklesIcon,
} from "@heroicons/react/20/solid";

interface Props {
    color: string;
    active?: boolean;
    setActive?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Toggle = ({ color = "#FFFFFF", setActive, active = false }: Props) => {
    return (
        <div className="grid place-items-center mt-2">
            <Switch
                checked={active}
                onChange={setActive}
                style={{
                    backgroundColor: active ? color : "gray"
                }}
                className={`relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={`
                        ${active ? "translate-x-9" : "translate-x-0"}
                        p-1.5 pointer-events-none inline-block 
                        h-[34px] w-[34px] transform rounded-full 
                        bg-white shadow-lg ring-0 
                        transition duration-200 ease-in-out
                    `}
                >
                    <SparklesIcon color={active ? color : "gray"} />
                </span>
            </Switch>
        </div>
    );
};

export default Toggle;
