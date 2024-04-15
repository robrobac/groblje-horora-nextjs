import { dbConnect } from "@/lib/mongo/dbConnect"
import reviewModel from "@/lib/mongo/models/reviewModel"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic';

export const GET = async (request) => {
    try {
        dbConnect()

        // Count the number of single reviews
        const singleReviews = await reviewModel.countDocuments({ reviewType: 'single' })

        // Count the number of quad reviews
        const quadReviews = await reviewModel.countDocuments({ reviewType: 'quad' })

        // Calculate the total number of reviews
        const numberOfReviews = singleReviews + quadReviews

        // Calculate the total number of movies (assuming each quad review represents 4 movies)
        const numberOfMovies = quadReviews * 4 + singleReviews

        // console.log('Reviews successfully counted') // Keep in Development
        
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