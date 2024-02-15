import { dbConnect } from "@/lib/mongo/dbConnect";
import reviewModel from "@/lib/mongo/models/reviewModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    dbConnect()
    const data = await request.json()
    const { likeName, likeEmail } = data
    const id = request.nextUrl.searchParams.get('id');

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return new NextResponse(JSON.stringify({ error: 'No such review' }), {
            status: 404
        })
    }

    const newLike = {
        likeName,
        likeEmail,
    };

    try {
        const updatedReview = await reviewModel.findOneAndUpdate(
            { _id: id },
            { $push: { likes: newLike } },
            { new: true }
        );

        if (!updatedReview) {
            return new NextResponse(JSON.stringify({ error: 'No such review' }), {
                status: 404
            })
        }

        return new NextResponse(JSON.stringify(updatedReview), {
            status: 200
        })
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 400
        })
    }
}


export async function DELETE(request) {
    const reviewId = request.nextUrl.searchParams.get('reviewId');
    const likeEmail = request.nextUrl.searchParams.get('likeEmail');

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        return new NextResponse(JSON.stringify({ error: 'No such review' }), {
            status: 404
        })
    }

    try {
        const updatedReview = await reviewModel.findOneAndUpdate(
            { _id: reviewId },
            { $pull: { likes: { likeEmail: likeEmail } } },
            { new: true }
        );

        if (!updatedReview) {
            return new NextResponse(JSON.stringify({ error: 'No such review' }), {
                status: 404
            })
        }

        return new NextResponse(JSON.stringify(updatedReview), {
            status: 200
        })
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 400
        })
    }
}