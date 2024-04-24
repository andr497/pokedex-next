"use client";
import React, { useState } from "react";
import { Switch } from '@headlessui/react'

interface Props {
    color: string;
    active?: boolean;
    setActive?: React.Dispatch<React.SetStateAction<boolean>>
}

const Toggle = ({ color = "#FFFFFF", setActive, active = false }: Props) => {

    return (
        <div className="grid place-items-center">
            <Switch
                checked={active}
                onChange={setActive}
                style={{
                    backgroundColor: `${active ? color : "gray"}`
                }}
                className={`relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={`${active ? "translate-x-9" : "translate-x-0"}
          pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
        </div>
    );
};

export default Toggle;
