import Container from "./Container";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="border-t border-border py-12 mt-10">
            <Container className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <p className={"text-sm text-muted"}>
                        © {year} Pokédex Explorer
                    </p>
                    <p className="text-sm text-muted mt-1">
                        Data provided by{" "}
                        <a
                            href="https://pokeapi.co/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline transition-colors hover:text-primary"
                        >
                            PokeAPI
                        </a>
                    </p>
                </div>
                <a
                    href="https://github.com/andr497/pokedex-next"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        flex items-center gap-2
                        rounded-full border border-border
                        px-5 py-2.5
                        text-sm font-medium
                        transition-all duration-200
                        hover:border-primary
                        hover:text-primary
                        hover:shadow-md
                        hover:-translate-y-1
                    "
                >
                    <div className="flex flex-col leading-tight">
                        <span>View Repository</span>
                        <span className="text-xs text-muted">
                            Open Source on GitHub
                        </span>
                    </div>
                </a>
            </Container>
        </footer>
    );
}
