import { dbConnect } from "../mongo/dbConnect"
import reviewModel from "../mongo/models/reviewModel"

export const getLatestRecenzija = async () => {
    try {
        dbConnect()
        const data = await reviewModel.find({ 'movies': { $size: 1 } }).sort({ createdAt: -1 }).limit(1)
        console.log('Latest Recenzija successfully fetched', data[0].reviewTitle)
        return data
    } catch (err) {
        console.log(err)
        throw new Error('Error getting Latest Recenzija', err);
    }
}

export const getLatestPregled = async () => {
    try {
        dbConnect()
        const data = await reviewModel.find({ 'movies': { $size: 4 } }).sort({ createdAt: -1 }).limit(1)
        console.log('Latest Pregled successfully fetched', data[0].reviewTitle)
        return data
    } catch (err) {
        console.log(err)
        throw new Error('Error getting Latest Pregled', err);
    }
}