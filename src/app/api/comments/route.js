import { dbConnect } from "@/lib/mongo/dbConnect";
import reviewModel from "@/lib/mongo/models/reviewModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    dbConnect()
    const data = await request.json()
    const { authorName, authorEmail, message } = data
    const id = request.nextUrl.searchParams.get('id');

    if (!message || message.trim() === '') {
        return new NextResponse(JSON.stringify({ error: 'Please insert a non-empty message.' }), {
            status: 400
        })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return new NextResponse(JSON.stringify({ error: 'No such review' }), {
            status: 404
        })
    }

    const newComment = {
        authorName,
        authorEmail,
        message,
    };

    try {
        const updatedReview = await reviewModel.findOneAndUpdate(
            { _id: id },
            { $push: { comments: newComment } },
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
    const commentId = request.nextUrl.searchParams.get('commentId');

    if (!mongoose.Types.ObjectId.isValid(reviewId) || !mongoose.Types.ObjectId.isValid(commentId)) {
        return new NextResponse(JSON.stringify({ error: 'Invalid review or comment ID' }), {
            status: 404
        })
    }

    try {
        const updatedReview = await reviewModel.findOneAndUpdate(
            { _id: reviewId },
            { $pull: { comments: { _id: commentId } } },
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

    } catch (err) {
        return new NextResponse(JSON.stringify({ error: err.message }), {
            status: 400
        })
    }
}

