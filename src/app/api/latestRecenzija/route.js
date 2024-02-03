import { dbConnect } from "@/lib/mongo/dbConnect"
import reviewModel from "@/lib/mongo/models/reviewModel"
import { getRawContent } from "@/lib/utils";
import { NextResponse } from "next/server"

const shortenDescription = async (description) => {
    const formattedDescription = getRawContent(description);
    const descriptionWithoutImages = formattedDescription.replace(/<img[^>]*>/g, '');
    const descriptionWithoutTags = descriptionWithoutImages.replace(/<\/?[a-z][a-z0-9]*[^<>]*>/ig, '');
    const words = descriptionWithoutTags.split(' ');
    const shortenedDescription = words.slice(0, 100).join(' ');
    return shortenedDescription;
}

export const GET = async (request) => {
    try {
        dbConnect()
        const data = await reviewModel.find({ 'movies': { $size: 1 } }).sort({ createdAt: -1 }).limit(1).lean()
        console.log('Latest single post successfully fetched', data[0].reviewTitle)

        data[0].shortDescription = await shortenDescription(data[0].movies[0].reviewContent);
        console.log(data)
        return NextResponse.json(data)
    } catch (err) {
        throw new Error('Failed to fetch latest quad post', err)
    }
}