"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type Props = {
    title: string;
    value: number;
    percentage: number;
    color: {
        colorType1: string;
        colorType2: string;
    };
};

const ProgressBar = ({ title, value, percentage, color }: Props) => {
    const [filledPercentage, setFilledPercentage] = useState(0);

    useEffect(() => {
        setFilledPercentage(percentage); // Setear el porcentaje para animar el llenado
    }, [percentage]);

    return (
        <>
            <div className="flex justify-between mb-1">
                <span className="capitalize text-base font-medium text-black dark:text-white">
                    {title}
                </span>
                <span className="text-sm font-medium text-black dark:text-white">
                    {value}
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                    className="h-2.5 rounded-full transition-width duration-1000"
                    style={{
                        background: `linear-gradient(to right, ${color.colorType1}, ${color.colorType2})`,
                        width: `${filledPercentage}%`,
                    }}
                ></div>
            </div>
        </>
    );
};

export default ProgressBar;
