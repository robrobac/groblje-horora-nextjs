import { dbConnect } from "./mongo/dbConnect";
import reviewModel from "./mongo/models/reviewModel";

export const getReviews = async () => {
    try {
        dbConnect()
        const data = await reviewModel.find()
        return data
    } catch (err) {
        console.log(err)
        throw new Error('Error getting posts', err);
    }
}

export const getReview = async (slug) => {
    try {
        dbConnect()
        const data = await reviewModel.findOne({ slug: slug })
        console.log(data)
        return data
    } catch (err) {
        console.log(err)
        throw new Error('Error getting post', err);
    }
}