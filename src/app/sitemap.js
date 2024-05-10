import { sortedTags } from "@/lib/tags";

export const dynamic = 'force-dynamic';

// TODO : either remove dynamir or revalidate


export default async function sitemap() {
    const res = await fetch(`${process.env.DOMAIN_URL}/api/generateSitemap`, {next: {revalidate: 20}});
    const tags = sortedTags;
    const posts = await res.json()

    const postsUrls = posts.flatMap((review) => {
        if (review.reviewType === "quad") {
            return [
                {
                    url: `${process.env.DOMAIN_URL}/recenzije/${review.slug}`,
                    lastModified: review.updatedAt.substring(0, 10)
                },
                {
                    url: `${process.env.DOMAIN_URL}/recenzije/${review.slug}?movie=1`,
                    lastModified: review.updatedAt.substring(0, 10)
                },
                {
                    url: `${process.env.DOMAIN_URL}/recenzije/${review.slug}?movie=2`,
                    lastModified: review.updatedAt.substring(0, 10)
                },
                {
                    url: `${process.env.DOMAIN_URL}/recenzije/${review.slug}?movie=3`,
                    lastModified: review.updatedAt.substring(0, 10)
                },
                {
                    url: `${process.env.DOMAIN_URL}/recenzije/${review.slug}?movie=4`,
                    lastModified: review.updatedAt.substring(0, 10)
                }
            ];
        } else {
            return {
                url: `${process.env.DOMAIN_URL}/recenzije/${review.slug}`,
                lastModified: review.updatedAt.substring(0, 10)
            };
        }
    }) ?? [];

    const tagUrls = tags.map((tag) => {
        return {
            url: `${process.env.DOMAIN_URL}/tags/${tag.tagValue}`,
            lastModified: posts[0].createdAt.substring(0, 10)
        }
    }) ?? [];

    return [
        {
            url: process.env.DOMAIN_URL,
            lastModified: posts[0].createdAt.substring(0, 10)
        },
        {
            url: `${process.env.DOMAIN_URL}/top25`,
            lastModified: posts[0].createdAt.substring(0, 10)
        },
        {
            url: `${process.env.DOMAIN_URL}/recenzije`,
            lastModified: posts[0].createdAt.substring(0, 10)
        },
        {
            url: `${process.env.DOMAIN_URL}/top20smeca`,
            lastModified: posts[0].createdAt.substring(0, 10)
        },
        {
            url: `${process.env.DOMAIN_URL}/o-blogu`,
            lastModified: posts[0].createdAt.substring(0, 10)
        },
        ...postsUrls,
        {
            url: `${process.env.DOMAIN_URL}/tags`,
            lastModified: posts[0].createdAt.substring(0, 10)
        },
        ...tagUrls,
    ]
}