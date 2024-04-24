import React from "react";

type Props = {
    elements?: number;
    gap?: number;
    height?: number;
    className?: string;
    parentClassName?: string;
    unEqualWidth?: boolean;
};

const Rectangular: React.FC<Props> = ({
    gap = 4,
    elements = 1,
    height = 20,
    className = "",
    parentClassName = "",
    unEqualWidth,
}) => {
    const items = new Array(elements || 1).fill("x");
    return (
        <div className={["w-full", parentClassName].join(" ")} style={{ rowGap: gap, columnGap: gap }}>
            {items.map((_, index) => {
                const len = items.length;
                const isLast = index === len - 1;
                const moreThanOne = len > 1;

                const width =
                    isLast && unEqualWidth && moreThanOne ? "w-1/2" : "w-full";

                return (
                    <div
                        key={`skeleton-${index}`}
                        style={{ height }}
                        className={[width, className].join(" ")}
                    />
                );
            })}
        </div>
    );
};

export default Rectangular;
