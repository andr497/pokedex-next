import React from "react";

interface DividerProps {
    label: string;
    separatorClasses?: {
        both?: string;
        left?: string;
        right?: string;
    };
    labelClasses?: string;
}

const Divider: React.FC<DividerProps> = ({
    label,
    separatorClasses = {
        both: "",
        left: "mr-2",
        right: "ml-2",
    },
    labelClasses = "mx-2",
}) => {

    return (
        <div className="flex items-center">
            <span
                className={`flex-1 border-b border-black dark:border-white opacity-25 ${separatorClasses.left} ${separatorClasses.both}`}
                
            ></span>
            <h5 className={`font-bold text-md ${labelClasses}`}>{label}</h5>
            <span
                className={`flex-1 border-b border-black dark:border-white opacity-25 ${separatorClasses.right} ${separatorClasses.both}`}
            ></span>
        </div>
    );
};

export default Divider;
