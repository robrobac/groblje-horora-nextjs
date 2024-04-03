import { dbConnect } from "@/lib/mongo/dbConnect"
import reviewModel from "@/lib/mongo/models/reviewModel"
import { NextResponse } from "next/server"

export const revalidate = 20;

export const GET = async () => {
    try {
        dbConnect()
        const data = await reviewModel.find({}).sort({ createdAt: -1 })
        console.log('all post for creating sitemap fetched')
        return NextResponse.json(data)
    } catch (err) {
        throw new Error('Failed to fetch latest quad post', err)
    }
}