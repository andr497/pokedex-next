import Link from "next/link";
import ThemeSwitcher from "../ThemeSwitcher";
import Container from "./Container";
import clsx from "clsx";

type MenuItem = {
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

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur border-border">
            <Container className="h-16 flex items-center justify-between">
                <div className="w-full flex h-16 items-center justify-between">
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
                    {/* Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {menu.map((item, key) => (
                            <NavItem key={key} item={item} />
                        ))}
                    </nav>
                    <div className="flex items-center gap-4">
                        <ThemeSwitcher />
                    </div>
                </div>
            </Container>
        </header>
    );
}

type NavItemProps = {
    item: MenuItem;
};

const NavItem = ({ item }: NavItemProps) => {
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
