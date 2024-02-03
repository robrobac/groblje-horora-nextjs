import { dbConnect } from "@/lib/mongo/dbConnect"
import reviewModel from "@/lib/mongo/models/reviewModel"
import { NextResponse } from "next/server"

export const GET = async (request) => {
    try {
        dbConnect()
        const data = await reviewModel.find({ 'movies': { $size: 4 } }).sort({ createdAt: -1 }).limit(1)
        console.log('Latest quad post successfully fetched', data[0].reviewTitle)
        return NextResponse.json(data)
    } catch (err) {
        throw new Error('Failed to fetch latest quad post', err)
    }
}