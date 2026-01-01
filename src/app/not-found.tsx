import React from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { ExclamationCircleIcon, HomeIcon } from "@heroicons/react/20/solid";

export default function NotFound() {
    return (
        <Container className="flex flex-1 items-center justify-center relative">
            <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-10">
                <span className="font-extrabold text-[30vw] select-none text-foreground">
                    404
                </span>
            </div>
            <div className="flex flex-col items-center max-w-150 w-full relative z-10 gap-8">
                <div className="relative p-2">
                    <div
                        className="bg-center bg-no-repeat bg-contain w-50 h-50 md:w-80 md:h-80"
                        data-alt="Illustration of a sad Pikachu sitting with droopy ears"
                        style={{
                            backgroundImage: "url(/PikachuNotFound.png)",
                        }}
                    />
                </div>
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex items-center gap-2 justify-center">
                        <ExclamationCircleIcon className="material-symbols-outlined w-10" />
                        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
                            Wild Page Fled!
                        </h1>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-normal leading-relaxed max-w-120">
                        The page you are looking for doesn&apos;t exist or has
                        been moved. It looks like you&apos;ve encountered a
                        MissingNo. Let&apos;s get you back to safety.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-2">
                    <Link
                        href="/"
                        className="flex min-w-40 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl h-12 px-6 border border-border/60 bg-surface/50 hover:bg-surface text-primary text-base font-bold leading-normal tracking-[0.015em] transition-all"
                    >
                        <HomeIcon className="w-8" />
                        <span className="truncate">Return to Home</span>
                    </Link>
                </div>
            </div>
        </Container>
    );
}
