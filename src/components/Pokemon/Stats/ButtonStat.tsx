"use client";
import { Dispatch, SetStateAction } from "react";

import { Field, Radio, RadioGroup } from "@headlessui/react";

const options = ["Base", "Min", "Max"];

interface Props {
    selected: number;
    setSelected: Dispatch<SetStateAction<number>>;
    types: { colorType1: string; colorType2: string };
}

const ButtonStat = ({ selected, setSelected, types }: Props) => {
    return (
        <RadioGroup
            value={selected}
            onChange={setSelected}
            aria-label="Server size"
            className={
                "w-full grid grid-cols-4 justify-center items-center gap-2 my-2"
            }
        >
            {options.map((option, index) => (
                <Field key={option} className={`w-full`}>
                    <Radio
                        value={index}
                        className={`
                        group relative h-full flex cursor-pointer
                        ${
                            selected === index
                                ? "active font-bold"
                                : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        }
                        border-b-2 rounded-t-lg max-sm:p-2
                        `}
                        style={{
                            color: selected === index ? types.colorType1 : "",
                            borderColor:
                                selected === index ? types.colorType1 : "",
                        }}
                    >
                        <div className="flex w-full items-center justify-between">
                            <p className="w-full text-center font-semibold dark:text-white capitalize max-sm:text-xs">
                                {option}
                            </p>
                        </div>
                    </Radio>
                </Field>
            ))}
        </RadioGroup>
    );
};

export default ButtonStat;
