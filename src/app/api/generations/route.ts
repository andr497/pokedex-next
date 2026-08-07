import { generationService } from "@/server/services/generation.service";
import { AxiosError } from "axios";

export async function GET() {
    try {
        const generations = await generationService.getList();

        return Response.json(generations, {
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
