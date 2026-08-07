import { axiosInstance } from "@/api/config";
import ServerError from "@/helpers/ServerError";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { data } = await axiosInstance.get("/version-group?limit=100");

        const result = await Promise.all(
            data.results.map(async (vg: { name: string; url: string }) => {
                const { data: detail } = await axiosInstance.get(vg.url);

                const label = detail.versions
                    .map(
                        (v: any) =>
                            v.name.charAt(0).toUpperCase() + v.name.slice(1),
                    )
                    .join(" / ");

                return {
                    value: detail.name.replaceAll(" ", "-"),
                    label,
                };
            }),
        );

        return Response.json(result, {
            status: 200,
        });
    } catch (error) {
        if (error instanceof ServerError) {
            return Response.json(
                {
                    error: true,
                    message: error.message,
                },
                {
                    status: error.statusCode,
                },
            );
        }

        if (error instanceof Error) {
            return Response.json(
                {
                    error: true,
                    message: error.message,
                },
                {
                    status: 500,
                },
            );
        }
    }
}
