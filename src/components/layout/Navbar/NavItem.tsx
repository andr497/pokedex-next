import clsx from "clsx";

import Link from "next/link";

import { MenuItem } from "./Navbar";

type NavItemProps = {
    item: MenuItem;
};

export const NavItem = ({ item }: NavItemProps) => {
    const className = clsx(
        "block px-3 py-2 md:p-0 text-heading text-sm font-medium transition-colors",
        item.disabled ? "text-muted cursor-not-allowed" : "hover:text-primary"
    );

    if (item.disabled) {
        return (
            <span className={className} aria-disabled="true">
                {item.title}
            </span>
        );
    }

    return (
        <li>
            <Link href={item.url} className={className}>
                {item.title}
            </Link>
        </li>
    );
};
