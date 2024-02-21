import { dbConnect } from "@/lib/mongo/dbConnect"
import reviewModel from "@/lib/mongo/models/reviewModel"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic';

export const GET = async (request) => {
    try {
        dbConnect()
        const singleReviews = await reviewModel.countDocuments({ reviewType: 'single' })
        const quadReviews = await reviewModel.countDocuments({ reviewType: 'quad' })
        const numberOfReviews = singleReviews + quadReviews
        const numberOfMovies = quadReviews * 4 + singleReviews
        console.log('Reviews successfully counted')
        return NextResponse.json({
            singleReviews,
            quadReviews,
            numberOfReviews,
            numberOfMovies
        })
    } catch (err) {
        throw new Error('Failed to count Reviews', err)
    }
}