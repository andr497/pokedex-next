import { checkBrightness } from "helpers/pokemonHelpers";
import React, { ComponentPropsWithRef, HTMLAttributes } from "react";

interface Props extends Omit<ComponentPropsWithRef<"li">, "color"> {
    title: string;
    index: number;
    vertical?: boolean;
    selectedTab: number;
    setSelectedTab: (index: number) => void;
    color: {
        colorType1: string;
        colorType2: string;
    };
}

const TabTitle: React.FC<Props> = ({
    title,
    selectedTab,
    setSelectedTab,
    index,
    color,
    vertical = false,
    className,
    ...props
}) => {
    const textColor = checkBrightness(color.colorType1) ? "#FFF" : "#000";
    const styles: HTMLAttributes<HTMLButtonElement>["style"] = {
        color: selectedTab === index ? (vertical ? textColor : color.colorType1) : "",
        borderColor:
            selectedTab === index ? (vertical ? "" : color.colorType1) : "",
        background: selectedTab === index ? (vertical ? color.colorType1 : "") : "",
    };
    return (
        <li className={`me-2 ${className}`} role="presentation" {...props}>
            <button
                className={`w-full p-4 uppercase duration-150 border-transparent ${
                    selectedTab === index
                        ? "active font-bold"
                        : `${
                              vertical
                                  ? "hover:bg-gray-300 dark:hover:bg-gray-600"
                                  : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                          }`
                }  ${vertical ? "rounded" : "border-b-2 rounded-t-lg "}`}
                onClick={() => setSelectedTab(index)}
                style={{...styles}}
            >
                {title}
            </button>
        </li>
    );
};

export default TabTitle;
