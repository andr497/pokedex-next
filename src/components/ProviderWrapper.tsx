"use client";

import { ThemeProvider } from "@/providers/ThemeProvider";
import React from "react";

interface Props {
    children: React.ReactNode;
}

export default function ProviderWrapper({ children }: Props) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
    );
}
