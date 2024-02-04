
import { dbConnect } from "@/lib/mongo/dbConnect"
import reviewModel from "@/lib/mongo/models/reviewModel"
import { NextResponse } from "next/server"

export const GET = async (request) => {
    try {
        dbConnect()
        const data = await reviewModel.find({ 'movies.0.worse20': true }).sort({ createdAt: -1 })
        console.log('Worse 20 Reviews successfully fetched')
        return NextResponse.json(data)
    } catch (err) {
        throw new Error('Failed to fetch Worse 20 Reviews', err)
    }
}

