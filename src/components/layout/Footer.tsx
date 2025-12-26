import Container from "./Container";

export default function Footer() {
    const date = new Date();
    return (
        <footer className="border-t border-border py-12 mt-10">
            <Container className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-sm text-muted text-center md:text-left">
                    © {date.getFullYear()} Pokédex Explorer <br />
                    Data provided by{" "}
                    <a
                        href="https://pokeapi.co/"
                        target="_blank"
                        className="underline hover:text-primary"
                    >
                        PokeAPI
                    </a>
                </div>
            </Container>
        </footer>
    );
}
