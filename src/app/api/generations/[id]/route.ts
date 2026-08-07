import { AxiosError } from "axios";

import { NextRequest } from "next/server";
import { generationService } from "@/server/services/generation.service";

type Params = {
    params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Params) {
    try {
        let { id } = await params;

        const generationDetail = await generationService.getDetailById(id);

        return Response.json(generationDetail, {
            status: 200,
        });
    } catch (e) {
        if (e instanceof AxiosError) {
            return Response.json(
                {
                    message: e.message,
                },
                {
                    status: e.response?.status ?? 500,
                },
            );
        }
        if (e instanceof Error) {
            return Response.json(
                {
                    message: e.message,
                },
                {
                    status: 500,
                },
            );
        }
    }
}
