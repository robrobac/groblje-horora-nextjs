import Cors from 'cors'

import { dbConnect } from "@/lib/mongo/dbConnect"
import reviewModel from "@/lib/mongo/models/reviewModel"
import { NextResponse } from "next/server"

// Initialize the cors middleware
const cors = Cors({
    methods: ['GET', 'HEAD'],
});


// Helper function to handle the API request
const handler = async (req, res) => {
    try {
        // Connect to the database
        await dbConnect();

        // Add cors middleware to handle CORS headers
        await cors(req, res);

        // Fetch data from the database
        const data = await reviewModel.find({ 'movies': { $size: 1 } }).sort({ createdAt: -1 }).limit(1)
        console.log('Latest single post successfully fetched', data[0].reviewTitle)

        // Return the data as JSON
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default handler;

export const GET = async (request) => {
    try {
        dbConnect()
        const data = await reviewModel.find({ 'movies': { $size: 1 } }).sort({ createdAt: -1 }).limit(1)
        console.log('Latest single post successfully fetched', data[0].reviewTitle)
        return NextResponse.json(data)
    } catch (err) {
        throw new Error('Failed to fetch latest quad post', err)
    }
}