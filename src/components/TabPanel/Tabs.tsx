"use client";
import React, { ReactElement, ComponentPropsWithoutRef, useState } from "react";
import TabTitle from "./TabTitle";
import ProgressBar from "components/ProgressBar/ProgressBar";

interface Props extends ComponentPropsWithoutRef<"div"> {
    children: ReactElement[];
    vertical?: boolean;
    color: {
        colorType1: string;
        colorType2: string;
    };
}

const Tabs: React.FC<Props> = ({
    children,
    vertical = false,
    color,
    className,
    ...props
}) => {
    const [selectedTab, setSelectedTab] = useState(0);
    return (
        <div className={`${vertical ? "flex justify-center w-full" : ""}`}>
            <div
                className={[
                    "border-gray-200 dark:border-gray-700",
                    `${
                        vertical
                            ? "flex justify-start items-start border-r max-h-[200px] w-[250px] overflow-y-scroll"
                            : "border-b mb-4"
                    }`,
                    className,
                ].join(" ")}
            >
                <ul
                    className={`flex -mb-px text-sm font-medium text-center ${
                        vertical ? "flex-col grow w-full" : "flex-wrap"
                    }`}
                    role="tablist"
                >
                    {children.map((item, index) => {
                        return (
                            <TabTitle
                                key={`title-${item.key}`}
                                title={item.props.title}
                                index={index}
                                selectedTab={selectedTab}
                                setSelectedTab={setSelectedTab}
                                color={color}
                                className={`${vertical ? "w-full" : ""}`}
                                vertical={vertical}
                            />
                        );
                    })}
                </ul>
            </div>
            
            {children[selectedTab]}
        </div>
    );
};

export default Tabs;
