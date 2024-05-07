import { NextResponse } from "next/server";

import { Redis } from "@upstash/redis"
import reviewModel from "@/lib/mongo/models/reviewModel";
import { dbConnect } from "@/lib/mongo/dbConnect";

export const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
})


// This API route is handling views count. Single IP address can increase the views count for each post once in 12h.
// Redis is here for caching the IP(hashed) for each Slug with lifetime of 12 hours, then when new IP visits the page, IP and page Slug is stored in the cache and mongoDB document's views field is updated. https://upstash.com/blog/nextjs13-approuter-view-counter

export async function POST(req) {

    const body = await req.json();
    const slug = body.slug;

    dbConnect()

    if (!slug) {
        return new NextResponse("Slug not found for Redis counter", {status: 400})
    }

    const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.ip;

    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));

    const hash = Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

    const isNew = await redis.set(["deduplicate", hash, slug].join(":"), true, {
        nx: true,
        ex: 12 * 60 * 60,
    });

    if (!isNew) {
        console.log("Current IP already visited this page in last 12 hours")
        const updatedViews = await reviewModel.findOneAndUpdate(
            { slug: slug },
            { $inc: { views: 0 } },
            { new: true }
        );

        const views = await redis.get(["pageviews", "projects", slug].join(":")) ?? 0
        return new NextResponse(updatedViews.views, {status: 202 })
    }

    console.log("Current IP did not visit this page in last 12 hours, connecting.")
    const updatedViews = await reviewModel.findOneAndUpdate(
        { slug: slug },
        { $inc: { views: 1 } },
        { new: true }
    );

    console.log(updatedViews)

    if (!updatedViews) {
        return new NextResponse(JSON.stringify({ error: 'No such review' }), {
            status: 404
        })
    }

    return new NextResponse(updatedViews.views, { status: 202 });
}