export default async function sitemap() {
    const res = await fetch(`${process.env.DOMAIN_URL}/api/generateSitemap`, { next: { revalidate: 3600 } });

    const posts = await res.json()

    const postsUrls = posts.map((review) => {
        return {
            url: `${process.env.DOMAIN_URL}/recenzije/${review.slug}`,
            lastModified: new Date(review.updatedAt)
        };
    }) ?? [];

    return [
        {
            url: process.env.DOMAIN_URL,
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