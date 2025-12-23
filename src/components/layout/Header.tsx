import Link from "next/link";
import ThemeSwitcher from "../ThemeSwitcher";

interface IMenu {
    title: string;
    url: string;
    disabled: boolean;
}

const menu: IMenu[] = [
    {
        title: "Generations",
        url: "#",
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
        <header className="sticky top-0 z-50 backdrop-blur-md">
            <div className="ui-card rounded-none border-b">
                <div className="flex h-16 items-center justify-between">
                    {/* LOGO */}
                    <div className="flex items-center gap-3">
                        <div className="size-8 text-primary">X</div>
                        <span className="text-xl font-bold tracking-tight">
                            POKÉDEX
                        </span>
                    </div>
                    {/* Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {menu.map((item, key) => (
                            <Link
                                key={key}
                                href={item.url}
                                className="text-sm font-medium hover:text-primary transition-colors"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                    <ThemeSwitcher />
                </div>
            </div>
        </header>
    );
}
