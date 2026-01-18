"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

import InputSearch from "./InputSearch";
import { usePokemonStore } from "@/store/pokemon.store";
import ThemeSwitcher from "../../ThemeSwitcher";
import Link from "next/link";
import { NavItem } from "./NavItem";
import { motion, AnimatePresence } from "framer-motion";

export type MenuItem = {
    title: string;
    url: string;
    disabled: boolean;
};

const menu: MenuItem[] = [
    {
        title: "Generations",
        url: "/generation",
        disabled: false,
    },
    {
        title: "Types",
        url: "#",
        disabled: true,
    },
    {
        title: "Moves",
        url: "#",
        disabled: true,
    },
    {
        title: "Items",
        url: "#",
        disabled: true,
    },
];

const Navbar = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const {
        searchTextPokemon: searchText,
        setSearchTextPokemon: setSearchText,
    } = usePokemonStore();

    const handleSearch = (text: string) => {
        const safeText = encodeURIComponent(text);
        router.replace(`/pokemon?q=${safeText}`);
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.currentTarget.value;
        setSearchText(text);
    };

    return (
        <>
            <div className="flex flex-wrap items-center justify-between">
                {/* LOGO */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-bold text-lg tracking-tight"
                    >
                        <span className="text-primary">Poké</span>
                        <span>Dex</span>
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center md:order-2 gap-2">
                    {/* Mobile search button */}
                    <button
                        className="md:hidden inline-flex items-center p-1 w-8 h-8 justify-center text-sm rounded cursor-pointer hover:bg-surface focus:outline-none"
                        aria-label="Search"
                    >
                        <MagnifyingGlassIcon className="h-5 w-5" />
                    </button>

                    <div className="relative hidden md:block">
                        <InputSearch
                            onSearch={(e) => {
                                e.preventDefault();
                                handleSearch(searchText);
                            }}
                            value={searchText}
                            onChange={handleOnChange}
                        />
                    </div>

                    <ThemeSwitcher />

                    <button
                        onClick={() => setOpen((v) => !v)}
                        className="md:hidden flex h-10 w-10 items-center justify-center rounded-base hover:bg-neutral-secondary-medium"
                        aria-expanded={open}
                        aria-label="Open menu"
                    >
                        <Bars3Icon className="h-6 w-6 text-body" />
                    </button>
                </div>

                <AnimatePresence initial={false}>
                    <motion.div
                        key={open ? "menu-open" : "menu-closed"}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className={`w-full md:flex md:w-auto md:order-1 overflow-hidden ${
                            open ? "block" : "hidden"
                        }`}
                    >
                        <div className="relative mt-3 md:hidden">
                            <InputSearch
                                onSearch={(e) => {
                                    e.preventDefault();
                                    handleSearch(searchText);
                                }}
                                value={searchText}
                                onChange={handleOnChange}
                            />
                        </div>

                        <ul className="mt-4 flex flex-col border-t border-border p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0">
                            {menu.map((item, key) => (
                                <NavItem key={key} item={item} />
                            ))}
                        </ul>
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    );
};

export default Navbar;
