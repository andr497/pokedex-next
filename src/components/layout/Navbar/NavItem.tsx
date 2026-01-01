import clsx from "clsx";

import Link from "next/link";

import { MenuItem } from "./Navbar";

type NavItemProps = {
    item: MenuItem;
};

export const NavItem = ({ item }: NavItemProps) => {
    const className = clsx(
        "text-sm font-medium transition-colors",
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
        <Link href={item.url} className={className}>
            {item.title}
        </Link>
    );
};
