import { dbConnect } from "@/lib/mongo/dbConnect";
import reviewModel from "@/lib/mongo/models/reviewModel";
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
    dbConnect()
    const page = request.nextUrl.searchParams.get('page');
    const perPage = request.nextUrl.searchParams.get('perPage');
    const { tag } = params;

    const skip = page === "undefined" ? 0 : ((page - 1) * parseInt(perPage));

    const query = {
        "movies.tags.tagValue": tag
    };

    const reviews = await reviewModel.find(query)
                                     .skip(parseInt(skip))
                                     .limit(parseInt(perPage))
                                     .sort({ "createdAt": -1 })
                                     .exec();

    const reviewsCount = await reviewModel.countDocuments(query);

    const totalPages = Math.ceil(reviewsCount / perPage);

    if (!reviews || reviews.length === 0) {
        return new NextResponse(JSON.stringify({ error: 'No reviews with that tag' }), {
            status: 404
        })
    }

    return new NextResponse(JSON.stringify({
        reviews,
        reviewsCount,
        totalPages,
    }), {
        status: 200
    })
}
