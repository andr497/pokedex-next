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
            <div className="space-y-1">
                <p className="text-foreground/60 text-xs font-medium uppercase tracking-wider">
                    {title}
                </p>
                <p
                    className={`text-foreground text-lg font-medium ${subtitleClass}`}
                >
                    {subtitle}
                </p>
            </div>
        </>
    );
};

export default CardTypography;
