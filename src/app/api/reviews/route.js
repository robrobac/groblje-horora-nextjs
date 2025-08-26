
import { dbConnect } from "@/lib/mongo/dbConnect"
import reviewModel from "@/lib/mongo/models/reviewModel"
import { getSlugsFromIds, slugify, toObjectIds } from "@/lib/utils";
import { revalidatePath, revalidateTag } from "next/cache";
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
            
            // TODO: Merge these settings with settings in the "api/quickSearch" route!
            // handling edge case for search term "vhs" because it does not find a movies named "v/h/s"
            const normalized = search.toLowerCase();
            const searchTerm = normalized === "vhs" ? "v/h/s" : normalized;

            const searchQuery = {
                $search: {
                    index: 'reviews_index',
                    compound: {
                    must: [{
                        text: {
                            query: searchTerm,
                            path: ['movies.title', 'movies.tags.tagLabel'],
                            fuzzy: { maxEdits: 2, prefixLength: 2, maxExpansions: 20 },
                        }
                    }],
                    should: [
                        {
                            phrase: {
                                query: searchTerm,
                                path: 'movies.title',
                                slop: 0,
                                score: { boost: { value: 20 } }
                            }
                        },
                        {
                            text: {
                                query: searchTerm,
                                path: 'movies.title',
                                score: { boost: { value: 6 } }
                            }
                        },
                    ],
                    }
                }
            };

            let results = [];

            // handling edge case for search term "it" because it does not find movies named "It" (2017) and "It" (1990) because MongoDB atlas search have minimum token length of 3 characters
            if (searchTerm === "it") {

                results = await reviewModel.find({
                    slug: { $in: ["it-2017", "it-1990"] }
                }).sort({ createdAt: -1 })

            } else {
                results = await reviewModel.aggregate([
                    searchQuery,
                    { $limit: Number(perPage) }
                ])

            }


            // totalItems and totalPages is hardcoded to max 1 page or 20 results
            return NextResponse.json({
                reviews: results,
                totalItems: 20,
                totalPages: 1
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
        console.error('Failed to fetch Reviews:', err);
        throw new Error('Failed to fetch Reviews:', err)
    }
}

export async function POST(request) {
    dbConnect()
    const data = await request.json()
    const { reviewTitle, movies, comments, likes, contentImages, selectedcategory, quadOgImage, quadOgImagePath, moreLikeThis } = data
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
                moreLikeThis: toObjectIds(moreLikeThis)
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
                moreLikeThis: toObjectIds(moreLikeThis)
            })
        }

        // For each moreLikeThis document add current document ID to their moreLikeThis array
        if (moreLikeThis && moreLikeThis.length > 0) {
            await reviewModel.updateMany(
                { _id: { $in: moreLikeThis } },
                { $addToSet: { moreLikeThis: review._id } }
            )

            // get the slugs of each moreLikeThis document and revalidate it
            const moreLikeThisSlugs = await getSlugsFromIds(moreLikeThis)
            moreLikeThisSlugs.forEach((slug) =>{
                revalidateTag(`review:${slug}`);
                revalidatePath(`/recenzije/${slug}`);
            })

        }

        revalidateTag('sitemap-cache');
        revalidatePath('/sitemap.xml')

        return new NextResponse(JSON.stringify(review), {
            status: 200
        })
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 400
        })
    }
}
