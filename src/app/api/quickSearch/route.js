
import { dbConnect } from "@/lib/mongo/dbConnect"
import reviewModel from "@/lib/mongo/models/reviewModel"
import { NextResponse } from "next/server"

export const GET = async (request) => {
    const search = request.nextUrl.searchParams.get('search');

    try {
        dbConnect()
            
            // handling edge case for search term "vhs" because it does not find a movies named "v/h/s"
            const normalized = search.toLowerCase();
            const searchTerm = normalized === "vhs" ? "v/h/s" : search;

            // TODO: Merge these settings with settings in the "api/reviews" route!
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

            const results = await reviewModel.aggregate([
                searchQuery,
                { $limit: 20 }
            ])

            return NextResponse.json({
                reviews: results,
            })
        
    } catch (err) {
        console.error('Failed to fetch Reviews:', err);
        throw new Error('Failed to fetch Reviews:', err)
    }
}