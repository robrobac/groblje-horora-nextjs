import { dbConnect } from "./dbConnect"
import reviewModel from "./models/reviewModel"


export const getReviews = async () => {
    try {
        dbConnect()
        const data = await reviewModel.find()
        console.log('All posts successfully fetched')
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
        console.log('Single post successfully fetched: ', data.reviewTitle)
        return data
    } catch (err) {
        console.log(err)
        throw new Error('Error getting post', err);
    }
}