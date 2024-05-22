"use client";
import { useRecoilState } from "recoil";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { searchTextPokemonState } from "recoil/atoms";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/react";
import {
    Bars3Icon as MenuIcon,
    MagnifyingGlassIcon as SearchIcon,
    XMarkIcon as XIcon,
} from "@heroicons/react/20/solid";

import ThemeSwitcher from "./ThemeSwitcher";
import { AnimatePresence, motion, easeInOut } from "framer-motion";

interface MenuOptions {
    name: string;
    url: string;
}

const options: MenuOptions[] = [
    {
        name: "Home",
        url: "/",
    },
];

export default function Navbar() {
    const router = useRouter();
    const [searchText, setSearchText] = useRecoilState<string>(
        searchTextPokemonState
    );

    const handleSearch = (text: string) => {
        router.replace(`/pokemon?q=${text}`);
    };

    return (
        <Disclosure
            as="nav"
            className="bg-white border-gray-200 dark:bg-gray-800"
        >
            {({ open }) => (
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href={"/"} className="flex items-center space-x-3">
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

                    <div className="flex md:order-2">
                        <DisclosureButton className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded text-sm p-2.5 me-1">
                            <SearchIcon className="w-5 h-5" />
                            <span className="sr-only">Search</span>
                        </DisclosureButton>
                        <search className="relative hidden md:block">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <SearchIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                <span className="sr-only">Search</span>
                            </div>
                            <input
                                type="text"
                                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </search>
                        <DisclosureButton className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
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
                                <div className="relative mt-3 md:hidden">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <SearchIcon />
                                    </div>
                                    <input
                                        type="text"
                                        id="search-navbar"
                                        className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <ul>
                                    <li>options</li>
                                </ul>
                            </DisclosurePanel>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </Disclosure>
    );
}

/*




<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
  </a>
  <div class="flex md:order-2">
    <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
      <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
      </svg>
      <span class="sr-only">Search</span>
    </button>
    <div class="relative hidden md:block">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span class="sr-only">Search icon</span>
      </div>
      <input type="text" id="search-navbar" class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search...">
    </div>
    <button data-collapse-toggle="navbar-search" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
    <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
      <div class="relative mt-3 md:hidden">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input type="text" id="search-navbar" class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search...">
      </div>
      <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
        </li>
      </ul>
    </div>
  </div>
</nav>







*/

// export default function Navbar() {
//     const [navbar, setNavbar] = useState(false);
//     return (
//         <nav className="w-full dark:bg-gray-800 bg-blue-300 shadow shadow-2x-l">
//             <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
//                 <div>
//                     <div className="flex items-center justify-between py-3 md:py-5 md:block">
//                         <Link href="/">
//                             <h2 className="text-2xl text-black font-bold dark:text-white">
//                                 Pokedex
//                             </h2>
//                         </Link>
//                         <div className="md:hidden">
//                             <button
//                                 className={`p-2 dark:text-white text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border`}
//                                 onClick={() => setNavbar(!navbar)}
//                             >
//                                 {!navbar ? (
//                                     <Bars3Icon
//                                         width={30}
//                                         className={`transition-opacity duration-300 ${
//                                             navbar ? "opacity-0" : "opacity-100"
//                                         }`}
//                                     />
//                                 ) : (
//                                     <XMarkIcon
//                                         width={30}
//                                         className={`transition-opacity duration-300 ${
//                                             navbar ? "opacity-100" : "opacity-0"
//                                         }`}
//                                     />
//                                 )}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 <div>
//                     <div
//                         className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
//                             navbar ? "block" : "hidden"
//                         }`}
//                     >
//                         <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
//                             {options.map((option, index) => (
//                                 <li className="dark:text-white text-black transition delay-150 duration-300 ease-in-out" key={`menu-${index}`}>
//                                     <Link href={option.url}>{option.name}</Link>
//                                 </li>
//                             ))}
//                             <li>
//                                 <ThemeSwitcher />
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// }
