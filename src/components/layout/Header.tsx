import Link from "next/link";
import ThemeSwitcher from "../ThemeSwitcher";
import Container from "./Container";
import { Navbar } from "./Navbar";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur border-border">
            <Container className="relative">
                <Navbar />
            </Container>
        </header>
    );
}
