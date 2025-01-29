import { dbConnect } from "@/lib/mongo/dbConnect"
import tempMediaModel from "@/lib/mongo/models/tempMediaModel"
import { NextResponse } from "next/server"

// Create a new Temp Media
export async function POST(request) {
    dbConnect()
    const data = await request.json()
    const { url, path } = data

    // add doc to db
    try {
        const tempMedia = await tempMediaModel.create({ url, path })
        return new NextResponse(JSON.stringify(tempMedia), {
            status: 200
        })
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message, status: "failed, might be timeout, will see, this is for testing" }), {
            status: 400
        })
    }
}
