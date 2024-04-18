import { dbConnect } from "@/lib/mongo/dbConnect";
import reviewModel from "@/lib/mongo/models/reviewModel";
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {

    dbConnect()
    const page = request.nextUrl.searchParams.get('page');
    const perPage = request.nextUrl.searchParams.get('perPage');
    const { tag } = params;

    const skip = page === "undefined" ? 0 : ((page - 1) * parseInt(perPage));
    const reviews = await reviewModel.aggregate([
        {
            $match: {
                "movies.tags.tagValue": tag
            }
        },
        {
            $skip: parseInt(skip)
        },
        {
            $limit: parseInt(perPage)
        },
        {
            $sort: {"createdAt": -1}
        }
    ])

    const reviewsCount = await reviewModel.countDocuments({
        "movies.tags.tagValue": tag // Direct query, no aggregation pipeline
    });

    if (!reviews) {
        return new NextResponse(JSON.stringify({ error: 'No reviews with that tag' }), {
            status: 404
        })
    }

    return new NextResponse(JSON.stringify({
        reviews,
        reviewsCount,
        totalPages: Math.ceil(reviewsCount / perPage)
    }), {
        status: 200
    })
}
