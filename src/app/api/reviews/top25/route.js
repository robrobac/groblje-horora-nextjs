
import { dbConnect } from "@/lib/mongo/dbConnect"
import reviewModel from "@/lib/mongo/models/reviewModel"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic';

export const GET = async (request) => {
    try {
        dbConnect()
        const data = await reviewModel.find({ 'movies.0.top25': true }).sort({ createdAt: -1 })
        // console.log('Top 25 Reviews successfully fetched') // Keep in Development
        return NextResponse.json(data)
    } catch (err) {
        throw new Error('Failed to fetch Top25 Reviews', err)
    }
}

