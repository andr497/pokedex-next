import { typeService } from "@/server/services/types.service";
import { AxiosError } from "axios";

export async function GET() {
    try {
        const types = await typeService.getList();

        return Response.json(types, {
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
