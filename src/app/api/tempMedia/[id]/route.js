import { dbConnect } from "@/lib/mongo/dbConnect"
import tempMediaModel from "@/lib/mongo/models/tempMediaModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

// Delete Temp Media
export async function DELETE(request, { params }) {
    dbConnect()
    const { id } = params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return new NextResponse(JSON.stringify({ error: 'No such Media' }), {
            status: 404
        })
    }

    const tempMedia = await tempMediaModel.findOneAndDelete({ _id: id })

    if (!tempMedia) {
        return new NextResponse(JSON.stringify({ error: 'No such Media' }), {
            status: 404
        })
    }
    return new NextResponse(JSON.stringify(tempMedia), {
        status: 200
    })
}