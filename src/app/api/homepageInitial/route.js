import { dbConnect } from "@/lib/mongo/dbConnect"
import reviewModel from "@/lib/mongo/models/reviewModel"
import { getRawContent } from "@/lib/utils";
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic';

// a function to shorten the description
const shortenDescription = async (description) => {
    // Remove HTML tags and images from the description
    const formattedDescription = getRawContent(description);
    const descriptionWithoutImages = formattedDescription.replace(/<img[^>]*>/g, '');
    const descriptionWithoutTags = descriptionWithoutImages.replace(/<\/?[a-z][a-z0-9]*[^<>]*>/ig, '');

    // Split the description into words and limit to the first 100 words
    const words = descriptionWithoutTags.split(' ');
    const shortenedDescription = words.slice(0, 100).join(' ');
    return shortenedDescription;
}

export const GET = async (request) => {
    try {
        dbConnect()
        const latestQuad = await reviewModel.find({ 'movies': { $size: 4 } }).sort({ createdAt: -1 }).limit(1)
        // console.log("LATEST QUAD: ", latestQuad)

        const latestSingle = await reviewModel.find({ 'movies': { $size: 1 } }).sort({ createdAt: -1 }).limit(1).lean()
        latestSingle[0].shortDescription = await shortenDescription(latestSingle[0].movies[0].reviewContent);
        // console.log("LATEST SINGLE: ", latestSingle)

        // Count the number of single reviews
        const singleReviews = await reviewModel.countDocuments({ reviewType: 'single' })

        // Count the number of quad reviews
        const quadReviews = await reviewModel.countDocuments({ reviewType: 'quad' })

        // Calculate the total number of reviews
        const numberOfReviews = singleReviews + quadReviews

        // Calculate the total number of movies (assuming each quad review represents 4 movies)
        const numberOfMovies = quadReviews * 4 + singleReviews

        const count = {singleReviews, quadReviews, numberOfReviews, numberOfMovies}
        // console.log(count)

        return NextResponse.json({
            latestQuad,
            latestSingle,
            count,
        })
    } catch (err) {
        throw new Error('Failed to fetch initial homepage data(latest single post, latest quad post, count reviews and user agent)', err)
    }
}