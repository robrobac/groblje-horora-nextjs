import { NextRequest, NextResponse } from "next/server";

import { Redis } from "@upstash/redis"

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })

export const runtime = "edge";

export async function POST(req) {
    console.log("Redis started.........................")

    const body = await req.json();
    const slug = body.slug;

    if (!slug) {
        return new NextResponse("Slug not found for Redis counter", {status: 400})
    }

    const ip = req.ip;
    console.log(req)

    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));

    const hash = Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");


    const isNew = await redis.set(["deduplicate", hash, slug].join(":"), true, {
        nx: true,
        ex: 24 * 60 * 60,
    });

    if (!isNew) {
        new NextResponse(null, {status: 202 })
    }

    await redis.incr(["pageviews", "projects", slug].join(":"));
    return new NextResponse(null, { status: 202 });
}