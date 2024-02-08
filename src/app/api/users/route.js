import { dbConnect } from "@/lib/mongo/dbConnect"
import userModel from "@/lib/mongo/models/userModel"
import { NextResponse } from "next/server"

export async function POST(request) {
    dbConnect()
    const data = await request.json()
    const { username, email, role } = data

    try {
        const user = await userModel.create({ username, email, role })
        return new NextResponse(JSON.stringify(user), {
            status: 200
        })
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 400
        })
    }
}




