"use client";
import React, { useEffect, useMemo, useState } from "react";
import useBrightness from "@/hooks/useBrightness";

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
    const fontColor = useBrightness(color.colorType2);

    useEffect(() => {
        const actualPercentage = percentage <= 5 ? 5 : percentage;

        setFilledPercentage(actualPercentage);
    }, [percentage]);

    return (
        <div className="flex flex-col">
            <div className="flex justify-between mb-1">
                <span className="capitalize text-base font-medium text-black dark:text-white">
                    {title}
                </span>
            </div>
            <div className="group relative w-full bg-gray-200 rounded-full h-5 dark:bg-gray-700 overflow-hidden">
                <div
                    role="progressbar"
                    aria-labelledby={`progressbar-${title}`}
                    aria-label={`progressbar-${title}`}
                    className="h-5 rounded-full transition-all duration-1000 ease-in-out"
                    style={{
                        background: `linear-gradient(to right, ${color.colorType1}, ${color.colorType2})`,
                        width: `${filledPercentage}%`,
                    }}
                />
                <span
                    className="absolute top-0 text-sm font-medium transition-all duration-1000 ease-in-out"
                    style={{
                        right: `${102 - filledPercentage}%`,
                        color: fontColor,
                    }}
                >
                    {value}
                </span>
            </div>
        </div>
    );
};

export default ProgressBar;
