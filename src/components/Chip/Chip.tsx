import React, { ReactNode, ComponentPropsWithoutRef } from "react";

const TextAlign = {
    center: "justify-center",
    left: "text-left",
    right: "text-right",
};

interface ChipProps extends ComponentPropsWithoutRef<"div"> {
    label: string;
    alignText?: keyof typeof TextAlign;
    size?: "small" | "large";
    rounded?: "normal" | "full";
    icon?: ReactNode | null;
}

const Chip = ({
    label,
    alignText = "center",
    size = "large",
    rounded = "normal",
    icon = null,
    className,
    ...props
}: ChipProps) => {
    const roundedClass = rounded === "normal" ? "rounded" : "rounded-full";
    const sizeClass = size === "large" ? "p-3" : "p-1";

    return (
        <div
            className={`inline-flex items-center bg-gray-200 text-black m-2 ${TextAlign[alignText]} ${sizeClass} ${roundedClass} ${className}`}
            {...props}
        >
            {icon}
            <span
                className={`${
                    label === "" ? "d-none" : ""
                } truncate hover:text-clip`}
            >
                {label}
            </span>
        </div>
    );
};

export default Chip;
