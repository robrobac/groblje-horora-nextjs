
import { dbConnect } from "@/lib/mongo/dbConnect"
import reviewModel from "@/lib/mongo/models/reviewModel"
import mongoose from "mongoose";
import { NextResponse } from "next/server"

export const GET = async (request) => {
    const ids = request.nextUrl.searchParams.getAll('ids');

    try {
        dbConnect()
        
        const objectIds = ids.map(id => new mongoose.Types.ObjectId(id));
    
        const reviews = await reviewModel.find({ _id: { $in: objectIds } });
    
        const reviewMap = new Map(reviews.map(review => [String(review._id), review]));
        const orderedReviews = ids.map(id => reviewMap.get(String(id))).filter(Boolean);

        return NextResponse.json({ reviews: orderedReviews });
        
    } catch (err) {
        console.error('Failed to fetch Reviews:', err);
        throw new Error('Failed to fetch Reviews:', err)
    }
}