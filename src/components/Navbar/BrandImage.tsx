"use client";
import React from "react";

import Link from "next/link";
import Image from "next/image";

const BrandImage = () => {
    return (
        <Link href={`/`} className="flex items-center space-x-3">
            <Image
                className="h-8 w-auto"
                width={50}
                height={50}
                alt="logo"
                src="/logo.png"
            />
            <span
                className={
                    "self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
                }
            >
                Pokédex
            </span>
        </Link>
    );
};

export default BrandImage;
