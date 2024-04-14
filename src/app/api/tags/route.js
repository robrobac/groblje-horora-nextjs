import { dbConnect } from "@/lib/mongo/dbConnect";
import reviewModel from "@/lib/mongo/models/reviewModel";
import { sortedTags } from "@/lib/tags";
import { NextResponse } from "next/server";

export const GET = async (request) => {

    dbConnect()
    const tags = sortedTags
    console.log("taaags")
    var countedTags = []

    await Promise.all(tags.map(async(tag) => {
        const handleCountTag = await reviewModel.countDocuments({
            "movies.tags.tagValue": tag.tagValue // Direct query, no aggregation pipeline
        });
        countedTags.push({
            tagValue: tag.tagValue,
            tagLabel: tag.tagLabel,
            tagCount: handleCountTag,
        })
    }))

    if (countedTags === 0) {
        return new NextResponse(JSON.stringify({ error: 'No such tags' }), {
            status: 404
        })
    }

    const sortedCountedTags = countedTags.sort((a, b) => b.tagCount - a.tagCount);

    return new NextResponse(JSON.stringify(sortedCountedTags), {
        status: 200
    })
}
