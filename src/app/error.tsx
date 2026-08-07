"use client";

import { ArrowPathIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Container from "@/components/layout/Container";

export default function GlobalError({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <Container className="flex flex-1 items-center justify-center relative">
            <div className="flex flex-col items-center max-w-150 w-full gap-8">
                <div className="flex flex-col items-center gap-4 text-center">
                    <ExclamationTriangleIcon className="w-10" />
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                        Something went wrong
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-relaxed max-w-120">
                        An unexpected error occurred. Try again, or return home.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-2">
                    <button
                        onClick={reset}
                        className="flex min-w-40 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl h-12 px-6 border border-border/60 bg-surface/50 hover:bg-surface text-primary text-base font-bold leading-normal tracking-[0.015em] transition-all"
                    >
                        <ArrowPathIcon className="w-8" />
                        <span className="truncate">Try again</span>
                    </button>
                    <Link
                        href="/"
                        className="flex min-w-40 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl h-12 px-6 border border-border/60 bg-surface/50 hover:bg-surface text-primary text-base font-bold leading-normal tracking-[0.015em] transition-all"
                    >
                        <span className="truncate">Return to Home</span>
                    </Link>
                </div>
            </div>
        </Container>
    );
}
