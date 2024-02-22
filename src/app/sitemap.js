export const dynamic = 'force-dynamic';

export default async function sitemap() {
    const baseUrl = "https://www.groblje-horora.com"

    const res = await fetch(`${baseUrl}/api/reviews`);
    const posts = await res.json()

    const postsUrls = posts.reviews?.map((review) => {
        return {
            url: `${baseUrl}/recenzije/${review.slug}`,
            lastModified: new Date(review.updatedAt)
        };
    }) ?? [];

    return [
        {
            url: baseUrl,
            lastModified: new Date()
        },
        {
            url: `${baseUrl}/top25`,
            lastModified: new Date()
        },
        {
            url: `${baseUrl}/recenzije`,
            lastModified: new Date()
        },
        {
            url: `${baseUrl}/top20smeca`,
            lastModified: new Date()
        },
        {
            url: `${baseUrl}/0-blogu`,
            lastModified: new Date()
        },
        ...postsUrls,
    ]
}