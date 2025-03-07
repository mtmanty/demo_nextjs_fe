import { NextResponse } from "next/server"

export async function GET() {
    try {
        const response = await fetch(`${process.env.API_HOST}/exception`, {
            method: "GET",
            headers: new Headers({ 'content-type': 'application/json' }),
            cache: "no-store",
        })

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

