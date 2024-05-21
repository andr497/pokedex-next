"use client";

const CardTypography = ({
    title,
    subtitle,
    subtitleClass = "",
}: {
    title: string;
    subtitle: string;
    subtitleClass?: React.HTMLAttributes<"span">["className"];
}) => {
    return (
        <>
            <h4 className="table-row w-full">
                <span className="font-bold w-1/2 pr-4 text-right table-cell">
                    {title}
                </span>
                <span
                    className={`font-thin w-1/2 text-left table-cell ${subtitleClass}`}
                >
                    {subtitle}
                </span>
            </h4>
        </>
    );
};

export default CardTypography;