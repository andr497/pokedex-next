import React from "react";
import { cn } from "@/helpers/twLib";

interface IProps {
    className?: string;
    children: React.ReactNode;
}

export default function Container({ className, children }: IProps) {
    return (
        <div
            className={cn("max-w-300 mx-auto px-4 sm:px-6 lg:px-8", className)}
        >
            {children}
        </div>
    );
}
