"use client";
import React, { ComponentPropsWithoutRef, ReactElement } from "react";

interface TabProps extends ComponentPropsWithoutRef<"div"> {
    children: ReactElement | ReactElement[];
    title: string;
}

const Tab: React.FC<TabProps> = ({ children, ...props }) => {
    return <div {...props}>{children}</div>;
};

export default Tab;
