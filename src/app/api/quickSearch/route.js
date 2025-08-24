
import { dbConnect } from "@/lib/mongo/dbConnect"
import reviewModel from "@/lib/mongo/models/reviewModel"
import mongoose from "mongoose";
import { NextResponse } from "next/server"

export const GET = async (request) => {
    const search = request.nextUrl.searchParams.get('search');
    const exclude = request.nextUrl.searchParams.getAll('exclude');

    const idsToExclude = exclude
        .filter(Boolean)
        .map(id => (mongoose.isValidObjectId(id) ? new mongoose.Types.ObjectId(id) : null))
        .filter(Boolean);

    try {
        dbConnect()
            

            // TODO: Merge these settings with settings in the "api/reviews" route! - The only difference is in the $match line after the searchQuery
            
            // handling edge case for search term "vhs" because it does not find a movies named "v/h/s"
            const normalized = search.toLowerCase();
            const searchTerm = normalized === "vhs" ? "v/h/s" : normalized;

            const searchQuery = {
                $search: {
                    index: 'reviews_index',
                    compound: {
                    must: [{
                        text: {
                            query: searchTerm,
                            path: ['movies.title', 'movies.tags.tagLabel'],
                            fuzzy: { maxEdits: 2, prefixLength: 2, maxExpansions: 20 },
                        }
                    }],
                    should: [
                        {
                            phrase: {
                                query: searchTerm,
                                path: 'movies.title',
                                slop: 0,
                                score: { boost: { value: 20 } }
                            }
                        },
                        {
                            text: {
                                query: searchTerm,
                                path: 'movies.title',
                                score: { boost: { value: 6 } }
                            }
                        },
                    ],
                    }
                }
            };

            let results = [];
            
            // handling edge case for search term "it" because it does not find movies named "It" (2017) and "It" (1990) because MongoDB atlas search have minimum token length of 3 characters
            if (searchTerm === "it") {

                results = await reviewModel.find({
                    slug: { $in: ["it-2017", "it-1990"] }
                }).sort({ createdAt: -1 })

            } else {
                results = await reviewModel.aggregate([
                    searchQuery,
                    { $match: { _id: { $nin: idsToExclude } } },
                    { $limit: 20 }
                ])

            }

            return NextResponse.json({
                reviews: results,
            })
        
    } catch (err) {
        console.error('Failed to fetch Reviews:', err);
        throw new Error('Failed to fetch Reviews:', err)
    }
}