"use client";

import { ThemeProvider } from "providers/ThemeProvider";
import React from "react";
import { RecoilRoot } from "recoil";

interface Props {
    children: React.ReactNode;
}

export default function ProviderWrapper({ children }: Props) {
    return (
        <RecoilRoot>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>
        </RecoilRoot>
    );
}
