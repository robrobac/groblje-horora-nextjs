export default async function sitemap() {
    const res = await fetch(`${process.env.DOMAIN_URL}/api/generateSitemap`);

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
            url: `${process.env.DOMAIN_URL}/0-blogu`,
            lastModified: new Date()
        },
        ...postsUrls,
    ]
}