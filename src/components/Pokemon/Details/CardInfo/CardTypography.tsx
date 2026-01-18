"use client";

import { ReactNode } from "react";

const CardTypography = ({
    title,
    subtitle,
    icon,
    subtitleClass = "",
}: {
    title: string;
    subtitle: string;
    icon?: ReactNode;
    subtitleClass?: React.HTMLAttributes<"span">["className"];
}) => {
    return (
        <>
            <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                    {icon && <span className="text-foreground/60">{icon}</span>}
                    <p className="text-foreground/60 text-xs font-medium uppercase tracking-wider">
                        {title}
                    </p>
                </div>
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
