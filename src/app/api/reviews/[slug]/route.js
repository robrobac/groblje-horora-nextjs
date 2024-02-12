import { dbConnect } from "@/lib/mongo/dbConnect"
import reviewModel from "@/lib/mongo/models/reviewModel"
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

    return new NextResponse(JSON.stringify(review), {
        status: 200
    })
}