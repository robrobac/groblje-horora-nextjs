import { NextResponse } from "next/server";
import connect from "../../../../db";
import ReviewModel from "../../../../dbModels/ReviewModel";

export const GET = async (request) => {
    try {
        await connect()
        const review = await ReviewModel.findOne({ slug: 'the-midnight-meat-train-2008' })
        return new NextResponse(JSON.stringify(review), { status: 200 });
    } catch (err) {
        return new NextResponse('Error connecting to database', err, { status: 500 })
    }
} 