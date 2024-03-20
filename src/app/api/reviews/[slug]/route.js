import { dbConnect } from "@/lib/mongo/dbConnect"
import reviewModel from "@/lib/mongo/models/reviewModel"
import revalidatePathAction from "@/lib/revalidatePathAction"
import { slugify } from "@/lib/utils"
import mongoose, { Mongoose } from "mongoose"
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

    let moreLikeThis = await reviewModel.find({ slug: { $ne: slug }, $text: { $search: review.reviewTitle } })
        .sort({ score: { $meta: "textScore" } })
        .limit(8) // Limit the number of results
        .skip(0)   // Optionally skip some documents


    if (moreLikeThis.length !== 8) {
        const count = await reviewModel.countDocuments()
        var random = Math.floor(Math.random() * count)

        const additionalDocuments = await reviewModel.aggregate([
            { $match: { slug: { $ne: slug, $nin: moreLikeThis.map(doc => doc.slug) } } },
            { $sample: { size: 8 - moreLikeThis.length } }
        ]);

        moreLikeThis = [...moreLikeThis, ...additionalDocuments];
    }

    // console.log(moreLikeThis)

    review.moreLikeThis = [...moreLikeThis]

    return new NextResponse(JSON.stringify(review), {
        status: 200
    })
}

export const PATCH = async (request, { params }) => {
    dbConnect()
    const { slug } = params;
    const id = request.nextUrl.searchParams.get('id');


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return new NextResponse(JSON.stringify({ error: 'No such review' }), {
            status: 404
        })
    }

    const data = await request.json()
    const { reviewTitle, movies, comments, likes, contentImages, selectedcategory, quadOgImage, quadOgImagePath } = data

    let newSlug = ''

    if (movies.length === 4) {
        newSlug = slugify(reviewTitle)
    }
    if (movies.length === 1) {
        newSlug = slugify(reviewTitle, movies[0].year)
    }
    console.log(newSlug)

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
            }, { new: true })
        }

        // const review = await Review.findOneAndUpdate({ _id: id }, {
        //     reviewTitle, movies, comments, likes, contentImages
        // }, { new: true })

        if (!review) {
            return new NextResponse(JSON.stringify({ error: 'No such review' }), {
                status: 404
            })
        }

        await revalidatePathAction('/')

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
    const { slug } = params
    console.log(slug)

    if (!mongoose.Types.ObjectId.isValid(slug)) {
        return new NextResponse(JSON.stringify({ error: 'No such review' }), {
            status: 404
        })
    }

    const review = await reviewModel.findOneAndDelete({ _id: slug })

    if (!review) {
        return new NextResponse(JSON.stringify({ error: 'No such review' }), {
            status: 404
        })
    }

    return new NextResponse(JSON.stringify(review), {
        status: 200
    })
}