
import { dbConnect } from "@/lib/mongo/dbConnect"
import reviewModel from "@/lib/mongo/models/reviewModel"
import { slugify } from "@/lib/utils";
import { NextResponse } from "next/server"

export const GET = async (request) => {
    // query parameters from the request URL
    const sort = request.nextUrl.searchParams.get('sort');
    const order = request.nextUrl.searchParams.get('order');
    const search = request.nextUrl.searchParams.get('search');
    const page = request.nextUrl.searchParams.get('page');
    const perPage = request.nextUrl.searchParams.get('perPage');
    const selectedFilterKey = request.nextUrl.searchParams.get('selectedFilterKey')
    const selectedFilterVal = request.nextUrl.searchParams.get('selectedFilterVal')

    // Define a function to determine the order of sorting
    const getOrder = (orderBy) => {
        if (orderBy === 'desc') {
            return -1
        }
        if (orderBy === 'asc') {
            return 1
        }
    }

    // Calculate the number of documents to skip based on pagination
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
                const typeFilter = selectedFilterKey && selectedFilterVal ? { [selectedFilterKey]: selectedFilterVal } : {}
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
                const typeFilter = selectedFilterKey && selectedFilterVal ? { [selectedFilterKey]: selectedFilterVal } : {}
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

            if (sort === 'createdAt') {
                const typeFilter = selectedFilterKey && selectedFilterVal ? { [selectedFilterKey]: selectedFilterVal } : {}
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

export async function POST(request) {
    dbConnect()
    const data = await request.json()
    const { reviewTitle, movies, comments, likes, contentImages, selectedcategory, quadOgImage, quadOgImagePath } = data
    // console.log(movies) // Keep in Development
    // console.log('links: ', [quadOgImage, quadOgImagePath]) // Keep in Development

    // Generate slug based on the number of movies
    let slug = ''
    if (movies.length === 4) {
        slug = slugify(reviewTitle)
    }
    if (movies.length === 1) {
        slug = slugify(reviewTitle, movies[0].year)
    }
    // console.log(slug) // Keep in Development

    // Validate required fields
    let emptyFields = []
    if (!reviewTitle) {
        emptyFields.push('reviewTitle')
    }

    if (!selectedcategory) {
        emptyFields.push('category')
    }

    const existingSlug = await reviewModel.findOne({ slug: slug })
    if (existingSlug) {
        emptyFields.push('titleExists')
    }

    movies.forEach((movie, index) => {
        if (!movie.title) {
            emptyFields.push(`movie${index}title`)
        }
        if (!movie.year) {
            emptyFields.push(`movie${index}year`)
        }
        if (!movie.rating) {
            emptyFields.push(`movie${index}rating`)
        }
        if (!movie.reviewContent) {
            emptyFields.push(`movie${index}reviewContent`)
        }
        if (!movie.coverImage) {
            emptyFields.push(`movie${index}coverImage`)
        }
    })

    if (emptyFields.length > 0) {
        return new NextResponse(JSON.stringify({ error: 'Please fill all the fields.', emptyFields }), {
            status: 400
        })
    }

    // add doc to db
    try {
        let review = {}
        if (movies.length === 1) {
            review = await reviewModel.create({
                reviewTitle,
                slug: slug,
                movies,
                comments,
                likes,
                contentImages,
                reviewType: 'single',
                category: selectedcategory,
            })
        }
        if (movies.length === 4) {
            review = await reviewModel.create({
                reviewTitle,
                slug: slug,
                movies,
                comments,
                likes,
                contentImages,
                reviewType: 'quad',
                category: selectedcategory,
                quadOgImage: quadOgImage,
                quadOgImagePath: quadOgImagePath,
            })
        }
        return new NextResponse(JSON.stringify(review), {
            status: 200
        })
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 400
        })
    }
}