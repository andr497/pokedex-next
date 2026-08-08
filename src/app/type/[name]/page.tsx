import Loading from "@/app/loading";
import Container from "@/components/layout/Container";
import { Suspense } from "react";
import axios from "axios";
import { notFound } from "next/navigation";
import TypeWrapper from "./components/TypeWrapper";
import { typeService } from "@/server/services/types.service";

interface Prop {
    params: {
        name: string;
    };
}

export default async function TypePage({ params }: Prop) {
    const { name } = await params;

    const data = await typeService.getDetailById(name).catch((e) => {
        if (axios.isAxiosError(e) && e.response?.status === 404) {
            notFound();
        }
        throw e;
    });

    return (
        <Suspense fallback={<Loading />}>
            <Container>
                <TypeWrapper type={data} />
            </Container>
        </Suspense>
    );
}
