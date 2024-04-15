import { sortedTags } from "@/lib/tags";

export const dynamic = 'force-dynamic';


export default async function sitemap() {
    const res = await fetch(`${process.env.DOMAIN_URL}/api/generateSitemap`, {next: {revalidate: 20}});
    const tags = sortedTags;
    const posts = await res.json()

    const postsUrls = posts.map((review) => {
        return {
            url: `${process.env.DOMAIN_URL}/recenzije/${review.slug}`,
            lastModified: new Date(review.updatedAt)
        };
    }) ?? [];

    const tagUrls = tags.map((tag) => {
        return {
            url: `${process.env.DOMAIN_URL}/tags/${tag.tagValue}`,
            lastModified: new Date(),
        }
    }) ?? [];

    return [
        {
            url: process.env.DOMAIN_URL,
            lastModified: new Date()
        },
        {
            url: `${process.env.DOMAIN_URL}/top25`,
            lastModified: new Date()
        },
        {
            url: `${process.env.DOMAIN_URL}/recenzije`,
            lastModified: new Date()
        },
        {
            url: `${process.env.DOMAIN_URL}/top20smeca`,
            lastModified: new Date()
        },
        {
            url: `${process.env.DOMAIN_URL}/o-blogu`,
            lastModified: new Date()
        },
        ...postsUrls,
        {
            url: `${process.env.DOMAIN_URL}/tags`,
            lastModified: new Date()
        },
        ...tagUrls,
    ]
}