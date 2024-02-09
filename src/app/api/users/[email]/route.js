import { dbConnect } from "@/lib/mongo/dbConnect"
import userModel from "@/lib/mongo/models/userModel"
import { NextResponse } from "next/server"

export async function DELETE(request, { params }) {
    dbConnect()
    const { email } = params

    try {
        const user = await userModel.findOneAndDelete({ email: email })

        if (!user) {
            return new NextResponse(JSON.stringify({ error: 'No such User' }), {
                status: 404
            })
        }

        return new NextResponse(JSON.stringify(user), {
            status: 200
        })
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 500
        })
    }
}


export async function GET(request, { params }) {
    dbConnect()
    const { email } = params
    try {
        const user = await userModel.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } })
        if (!user) {
            return new NextResponse(JSON.stringify({ error: 'No such user' }), {
                status: 404
            })
        }
        return new NextResponse(JSON.stringify(user), {
            status: 200
        })
    } catch (err) {
        return new NextResponse(JSON.stringify({ error: err.message }), {
            status: 500
        })
    }
}