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
        ...postsUrls,
    ]
}