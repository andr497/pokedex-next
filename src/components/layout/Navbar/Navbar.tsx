"use client";
import React, { useState } from "react";

import { AnimatePresence, easeInOut, motion } from "framer-motion";

import { useRouter } from "next/navigation";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

import BrandImage from "./BrandImage";
import InputSearch from "./InputSearch";
import { usePokemonStore } from "@/store/pokemon.store";
import ThemeSwitcher from "../../ThemeSwitcher";
import Link from "next/link";

export type MenuItem = {
    title: string;
    url: string;
    disabled: boolean;
};

const menu: MenuItem[] = [
    {
        title: "Generations",
        url: "/",
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
        router.replace(`/pokemon?q=${text}`);
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

                    {/* Desktop search */}
                    <div className="relative hidden md:block">
                        <InputSearch
                            onSearch={handleSearch}
                            onChange={handleOnChange}
                        />
                    </div>

                    <ThemeSwitcher />

                    {/* Mobile menu toggle */}
                    <button
                        onClick={() => setOpen((v) => !v)}
                        className="md:hidden flex h-10 w-10 items-center justify-center rounded-base hover:bg-neutral-secondary-medium"
                        aria-expanded={open}
                        aria-label="Open menu"
                    >
                        <Bars3Icon className="h-6 w-6 text-body" />
                    </button>
                </div>

                <div
                    className={`w-full md:flex md:w-auto md:order-1 ${
                        open ? "block" : "hidden"
                    }`}
                >
                    <div className="relative mt-3 md:hidden">
                        <InputSearch
                            onSearch={handleSearch}
                            onChange={handleOnChange}
                        />
                    </div>

                    {/* Menu items */}
                    <ul className="mt-4 flex flex-col border-t border-border p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0">
                        {menu.map((item, key) => (
                            <li key={`menu-item-${key}`}>
                                <a
                                    href={item.url}
                                    className={`block rounded px-3 py-2 md:p-0 text-heading hover:bg-neutral-tertiary md:hover:bg-transparent md:hover:text-fg-brand`}
                                >
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );

    return (
        <Disclosure
            as="nav"
            className="bg-white border-b-2 border-gray-300 dark:border-0 dark:bg-gray-800"
        >
            {({ open }) => (
                <div className="max-w-(--breakpoint-xl) flex flex-wrap items-center justify-between mx-auto p-4">
                    <BrandImage />

                    <div className="flex md:order-2">
                        <ThemeSwitcher />
                        <InputSearch
                            formClassName="relative hidden md:block"
                            placeholder="Search Pokémon..."
                            onSearch={(e) => {
                                e.preventDefault();
                                handleSearch(searchText);
                            }}
                            value={searchText}
                            onChange={handleOnChange}
                        />
                        <DisclosureButton className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700">
                            <span className="sr-only">Open main menu</span>
                            <MenuIcon className="w-5 h-5" />
                        </DisclosureButton>
                    </div>

                    <AnimatePresence>
                        {open && (
                            <DisclosurePanel
                                as={motion.div}
                                initial={{ opacity: 0, y: -24 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -24 }}
                                transition={{ duration: 0.2, ease: easeInOut }}
                                className="items-center justify-center w-full md:flex md:w-auto md:order-1"
                            >
                                <InputSearch
                                    formClassName="relative mt-3 md:hidden"
                                    placeholder="Search Pokémon..."
                                    onSearch={(e) => {
                                        e.preventDefault();
                                        handleSearch(searchText);
                                    }}
                                    value={searchText}
                                    onChange={handleOnChange}
                                />
                                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                    {options.map((option) => (
                                        <li
                                            key={`navigation-options-${option.name}`}
                                        >
                                            <DisclosureButton
                                                as={Link}
                                                href={option.url}
                                                className={`text-gray-800 hover:bg-blue-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium`}
                                            >
                                                {option.name}
                                            </DisclosureButton>
                                        </li>
                                    ))}
                                </ul>
                            </DisclosurePanel>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </Disclosure>
    );
};

export default Navbar;
