import { useEffect } from "react";
import { useRouter } from "next/router";

export default function PageChangeListener({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url, { shallow }) => {
            console.log(
                `App is changing to ${url} ${
                    shallow ? "with" : "whitout"
                } shallow routing`
            );
            document.getElementById("spinner")?.style.display = "block";
            return;
        };

        const 
    }, []);
}
