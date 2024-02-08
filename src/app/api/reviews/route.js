
import { dbConnect } from "@/lib/mongo/dbConnect"
import reviewModel from "@/lib/mongo/models/reviewModel"
import { NextResponse } from "next/server"

export const GET = async (request) => {
    const sort = request.nextUrl.searchParams.get('sort');
    const order = request.nextUrl.searchParams.get('order');
    const search = request.nextUrl.searchParams.get('search');
    const page = request.nextUrl.searchParams.get('page');
    const perPage = request.nextUrl.searchParams.get('perPage');
    const filter = request.nextUrl.searchParams.get('filter');
    console.log(sort, order, search, page, perPage, filter)
    console.log(request.nextUrl)

    const getOrder = (orderBy) => {
        if (orderBy === 'desc') {
            return -1
        }
        if (orderBy === 'asc') {
            return 1
        }
    }

    const skip = (page - 1) * perPage

    try {
        dbConnect()

        if (search) {
            const reviewsQuery = {
                $or: [
                    { $text: { $search: search } },
                    // { "reviewTitle": { $regex: new RegExp(`.*${search}.*`, 'i') } }
                ],
            }
            //  If SEARCH is in query, do the search.
            const reviews = await reviewModel.find(reviewsQuery)
                .skip(skip)
                .limit(perPage)
                // .sort([['createdAt', -1]])
                .sort({ score: { $meta: "textScore" } })  // Sort by relevance
            const totalReviewsCount = await reviewModel.countDocuments(reviewsQuery)

            return NextResponse.json({
                reviews,
                totalItems: totalReviewsCount,
                totalPages: Math.ceil(totalReviewsCount / perPage)
            })
        } else {
            // Else if there's no Search in the query, continue with sorting and ordering

            if (sort === 'movies.0.rating') {
                const typeFilter = filter ? { 'reviewType': filter } : {}
                // sory by rating
                const reviews = await reviewModel.find(typeFilter)
                    .skip(skip)
                    .limit(perPage)
                    .sort([
                        ['reviewType', getOrder(order)],
                        [sort, getOrder(order)],
                    ]);
                const totalReviewsCount = await reviewModel.countDocuments(typeFilter)

                return NextResponse.json({
                    reviews,
                    totalItems: totalReviewsCount,
                    totalPages: Math.ceil(totalReviewsCount / perPage)
                })
            }

            if (sort === 'reviewTitle') {
                const typeFilter = filter ? { 'reviewType': filter } : {}
                // sort by title
                const reviews = await reviewModel.find(typeFilter)
                    .skip(skip)
                    .limit(perPage)
                    .sort([
                        ['reviewTitle', getOrder(order)],
                        [sort, getOrder(order)],
                    ]);
                const totalReviewsCount = await reviewModel.countDocuments(typeFilter)

                return NextResponse.json({
                    reviews,
                    totalItems: totalReviewsCount,
                    totalPages: Math.ceil(totalReviewsCount / perPage)
                })
            }

            // if (sort === 'reviewType') {
            //     // sort by type
            //     const reviews = await reviewModel.find({})
            //         .skip(skip)
            //         .limit(perPage)
            //         .sort([
            //             ['reviewType', getOrder(order)],
            //             [sort, getOrder(order)],
            //         ]);
            //     const totalReviewsCount = await reviewModel.countDocuments()

            //     return NextResponse.json({
            //         reviews,
            //         totalItems: totalReviewsCount,
            //         totalPages: Math.ceil(totalReviewsCount / perPage)
            //     })
            // }

            if (sort === 'createdAt') {
                const typeFilter = filter ? { 'reviewType': filter } : {}
                // sort by date created
                const reviews = await reviewModel.find(typeFilter)
                    .skip(skip)
                    .limit(perPage)
                    .sort([
                        ['createdAt', getOrder(order)],
                        [sort, getOrder(order)],
                    ]);
                const totalReviewsCount = await reviewModel.countDocuments(typeFilter)

                return NextResponse.json({
                    reviews,
                    totalItems: totalReviewsCount,
                    totalPages: Math.ceil(totalReviewsCount / perPage)
                })
            }

            // if (sort === 'updatedAt') {
            //     // sort by date updated
            //     const reviews = await reviewModel.find({})
            //         .skip(skip)
            //         .limit(perPage)
            //         .sort([
            //             ['updatedAt', getOrder(order)],
            //             [sort, getOrder(order)],
            //         ]);
            //     const totalReviewsCount = await reviewModel.countDocuments()

            //     return NextResponse.json({
            //         reviews,
            //         totalItems: totalReviewsCount,
            //         totalPages: Math.ceil(totalReviewsCount / perPage)
            //     })
            // }

            if (!sort) {
                // if there's no sort, fetch by date created
                const reviews = await reviewModel.find({})
                    .skip(skip)
                    .limit(perPage)
                    .sort({ createdAt: -1 })
                const totalReviewsCount = await reviewModel.countDocuments()

                return NextResponse.json({
                    reviews,
                    totalItems: totalReviewsCount,
                    totalPages: Math.ceil(totalReviewsCount / perPage)
                })
            }

        }
    } catch (err) {
        throw new Error('Failed to fetch Reviews', err)
    }
}

