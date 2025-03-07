import { NextResponse } from "next/server"

export async function GET() {
    try {
        var url = `${process.env.API_HOST}/hello`;
        console.log("URL: ", url);

        const response = await fetch(url, {
            method: "GET",
            headers: new Headers({ 'content-type': 'application/json' }),
            cache: "no-store",
        })

        console.log("Response: ", response);

        if (!response.ok) {
            throw new Error("External service response was not ok")
        }

        const data = await response.json()
        return NextResponse.json(data, {
            headers: {
                "Cache-Control": "no-store, max-age=0",
            },
        });
    } catch (error) {
        console.error("Error:", error)
        return NextResponse.json({ error: "Failed to fetch from external service" }, { status: 500 })
    }
}

