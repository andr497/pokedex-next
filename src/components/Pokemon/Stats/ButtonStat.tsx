"use client";
import { Dispatch, SetStateAction } from "react";

import { Field, Radio, RadioGroup } from "@headlessui/react";
import clsx from "clsx";

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
            aria-label="Radio group container stats"
            className={"flex p-1 rounded-lg bg-base-100 w-fit"}
        >
            {options.map((option, index) => (
                <Field
                    key={option}
                    className={clsx(
                        {
                            "bg-foreground/20": selected === index,
                        },
                        "px-4 py-1.5 text-xs font-bold text-foreground rounded shadow-sm"
                    )}
                >
                    <Radio
                        value={index}
                        className={`h-full flex cursor-pointer`}
                        style={{
                            color: selected === index ? types.colorType1 : "",
                        }}
                    >
                        {option}
                    </Radio>
                </Field>
            ))}
        </RadioGroup>
    );
};

export default ButtonStat;
