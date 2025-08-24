import { dbConnect } from "@/lib/mongo/dbConnect"
import reviewModel from "@/lib/mongo/models/reviewModel"
import { getSlugsFromIds, slugify, toObjectIds } from "@/lib/utils"
import mongoose, { Mongoose } from "mongoose"
import { revalidatePath, revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
    dbConnect()
    const { slug } = params;

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return new NextResponse(JSON.stringify({ error: 'No such review' }), {
    //         status: 404
    //     })
    // }

    const review = await reviewModel.findOne({ slug: slug })

    if (!review) {
        return new NextResponse(JSON.stringify({ error: 'No such review' }), {
            status: 404
        })
    }

    // Extract tags from movies in the review
    // var tagArray = []
    // review.movies.forEach((movie) => {
    //     movie.tags.forEach((tag) => {
    //         tagArray.push(tag.tagValue)
    //     })
    // })

    // var pipeline = [ // sorted by number of matched tags
    //     {
    //         "$match": {
    //             slug: { $ne: slug }, // Exclude the current review
    //             "movies.tags.tagValue": {
    //                 "$in": tagArray
    //             }
    //         }
    //     }, 
    //     {
    //         "$addFields": {
    //             "tagsMatched": {
    //                 "$map": {
    //                     "input": "$movies",
    //                     "as": "movie",
    //                     "in": {
    //                         "$reduce": {
    //                             "input": "$$movie.tags",
    //                             "initialValue": [],
    //                             "in": {
    //                                 "$cond": {
    //                                     "if": {
    //                                         "$in": [
    //                                             "$$this.tagValue",
    //                                             tagArray
    //                                         ]
    //                                     },
    //                                     "then": {
    //                                         "$concatArrays": [
    //                                             "$$value",
    //                                             [
    //                                                 "$$this.tagValue"
    //                                             ]
    //                                         ]
    //                                     },
    //                                     "else": "$$value"
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }, 
    //     {
    //         "$unwind": {
    //             "path": "$tagsMatched",
    //             "preserveNullAndEmptyArrays": false
    //         }
    //     }, 
    //     {
    //         "$addFields": {
    //             "countTagsMatched": {
    //                 "$size": "$tagsMatched"
    //             }
    //         }
    //     }, 
    //     {
    //         "$group": {
    //             "_id": "$_id",
    //             "reviewTitle": {"$first": "$reviewTitle"},
    //             "slug": {"$first": "$slug"},
    //             "contentImages": {"$first": "$contentImages"},
    //             "movies": {"$first": "$movies"},
    //             "reviewType": {"$first": "$reviewType"},
    //             "likes": {"$first": "$likes"},
    //             "comments": {"$first": "$comments"},
    //             "createdAt": {"$first": "$createdAt"},
    //             "updatedAt": {"$first": "$updatedAt"},
    //             "category": {"$first": "$category"},
    //             "quadOgImage": {"$first": "$quadOgImage"},
    //             "quadOgImagePath": {"$first": "$quadOgImagePath"},
    //             "tagsMatched": { "$first": "$tagsMatched" },
    //             "countTagsMatched" : {"$sum": "$countTagsMatched"}
    //         }
    //     },
    //     {
    //         "$sort": {
    //             "countTagsMatched": -1
    //         }
    //     },
    //     {
    //         "$limit": 8 - (tagArray.length < 8 ? tagArray.length : 0)
    //     }
    // ];

    // // Trenutno povuce 4 random objava koje imaju barem jedan jednaki tag
    // var moreLikeThis = await reviewModel.aggregate(pipeline)

    // if (moreLikeThis.length < 8) {
    //     for (const tag of tagArray) {
    //         var moreLikeThis2 = await reviewModel.aggregate([
    //             {
    //                 "$match": {
    //                     slug: { $ne: slug, $nin: moreLikeThis.map(doc => doc.slug) },
    //                     "movies.tags.tagValue": tag
    //                 }
    //             },
    //             { "$sample": { "size": 1 } },
    //         ])

    //         moreLikeThis = [...moreLikeThis, ...moreLikeThis2];
    //     }
    // }

    // if (moreLikeThis.length < 8) {
    //     const additionalDocuments = await reviewModel.aggregate([
    //         { $match: { slug: { $ne: slug, $nin: moreLikeThis.map(doc => doc.slug) } } },
    //         { $sample: { size: 8 - moreLikeThis.length } }
    //     ]);

    //     moreLikeThis = [...moreLikeThis, ...additionalDocuments];
    // }

    // review.moreLikeThis = moreLikeThis;

    return new NextResponse(JSON.stringify(review), {
        status: 200
    })
}

export const PATCH = async (request, { params }) => {
    dbConnect()
    const { slug: oldSlug } = params;
    const id = request.nextUrl.searchParams.get('id');


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return new NextResponse(JSON.stringify({ error: 'No such review' }), {
            status: 404
        })
    }

    const data = await request.json()
    const { reviewTitle, movies, comments, likes, contentImages, selectedcategory, quadOgImage, quadOgImagePath, moreLikeThis, prevMoreLikeThis } = data

    let newSlug = ''

    if (movies.length === 4) {
        newSlug = slugify(reviewTitle)
    }
    if (movies.length === 1) {
        newSlug = slugify(reviewTitle, movies[0].year)
    }
    // console.log(newSlug) // Keep in Development

    let emptyFields = []

    if (!reviewTitle) {
        emptyFields.push('reviewTitle')
    }

    if (!selectedcategory) {
        emptyFields.push('category')
    }

    const existingSlug = await reviewModel.findOne({ slug: newSlug, _id: { $ne: id } })
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

    try {
        let review = {}
        if (movies.length === 1) {
            review = await reviewModel.findOneAndUpdate({ _id: id }, {
                reviewTitle: movies[0].title,
                slug: newSlug,
                movies,
                comments,
                likes,
                contentImages,
                reviewType: 'single',
                category: selectedcategory,
                moreLikeThis: toObjectIds(moreLikeThis),
            }, { new: true })
        }
        if (movies.length === 4) {
            review = await reviewModel.findOneAndUpdate({ _id: id }, {
                reviewTitle,
                slug: newSlug,
                movies,
                comments,
                likes,
                contentImages,
                reviewType: 'quad',
                category: selectedcategory,
                quadOgImage: quadOgImage,
                quadOgImagePath: quadOgImagePath,
                moreLikeThis: toObjectIds(moreLikeThis)
            }, { new: true })
        }


        // updating moreLikeThis arrays for the current document and the documents in moreLikeThis, those removed and those added
        const prevMoreLikeThisSet = new Set(prevMoreLikeThis || [])
        const newMoreLikeThisSet  = new Set(moreLikeThis || [])

        const toAdd    = [...newMoreLikeThisSet].filter(x => !prevMoreLikeThisSet.has(x))   // newly added ids
        const toRemove = [...prevMoreLikeThisSet].filter(x => !newMoreLikeThisSet.has(x))   // removed ids

        if (toAdd.length) {
            await reviewModel.updateMany(
                { _id: { $in: toAdd } },
                { $addToSet: { moreLikeThis: review._id } }
            )
        }
        if (toRemove.length) {
            await reviewModel.updateMany(
                { _id: { $in: toRemove } },
                { $pull: { moreLikeThis: review._id } }
            )
        }

        // 1) Bust the Data Cache for both old and (potential) new tag
        revalidateTag(`review:${oldSlug}`);
        if (newSlug && newSlug !== oldSlug) revalidateTag(`review:${newSlug}`);

        // 2) Bust the Full Route Cache (HTML/RSC) for the page path(s)
        revalidatePath(`/recenzije/${oldSlug}`, 'page');
        if (newSlug && newSlug !== oldSlug) revalidatePath(`/recenzije/${newSlug}`, 'page');

        if (!review) {
            return new NextResponse(JSON.stringify({ error: 'No such review' }), {
                status: 404
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

export async function DELETE(request, { params }) {
    dbConnect()
    // This is named "slug" but it is actually the ID of the review because of the way the route is set up
    // The slug is used to generate the URL, but the ID is used to delete the review
    const { slug } = params
    // console.log(slug) // Keep in Development
    const url = new URL(request.url);
    const moreLikeThisParam = url.searchParams.get('moreLikeThis');
    const moreLikeThis = moreLikeThisParam ? moreLikeThisParam.split(',') : [];

    const id = new mongoose.Types.ObjectId(slug)

    if (!mongoose.Types.ObjectId.isValid(slug)) {
        return new NextResponse(JSON.stringify({ error: 'No such review' }), {
            status: 404
        })
    }

    const review = await reviewModel.findOneAndDelete({ _id: id })

    if (!review) {
        return new NextResponse(JSON.stringify({ error: 'No such review' }), {
            status: 404
        })
    }

    // Remove the current document ID from the moreLikeThis array of all documents that have it
    await reviewModel.updateMany(
        { moreLikeThis: id },
        { $pull: { moreLikeThis: id } }
    )

    // get the slugs of each moreLikeThis document and revalidate it
    const moreLikeThisSlugs = await getSlugsFromIds(moreLikeThis)
    moreLikeThisSlugs.forEach((slug) =>{
        revalidateTag(`review:${slug}`);
        revalidatePath(`review:${slug}`);
    })

    return new NextResponse(JSON.stringify(review), {
        status: 200
    })
}