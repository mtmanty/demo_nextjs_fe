import { NextResponse } from "next/server"

export async function GET() {
    try {
        const response = await fetch("http://localhost:8080/exception", {
            method: "GET",
            headers: new Headers({ 'content-type': 'application/json' }),
        })

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error:", error)
        return NextResponse.json({ error: "Failed to fetch from external service" }, { status: 500 })
    }
}

