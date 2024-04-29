import dynamic from "next/dynamic";
import styles from "@/app/recenzije/[slug]/page.module.scss";
import JsonLd from "@/components/JsonLd";
import ViewCounter from "@/components/ViewCounter";
import EditDeleteButtonsSingle from "@/components/editDeleteButton/EditDeleteButtonsSingle";
import { Movie } from "@/components/singleReview/movie/Movie";
import OgImageLink from "@/components/singleReview/ogImageLink/OgImageLink";
import { ReviewHeader } from "@/components/singleReview/reviewHeader/ReviewHeader";
import { getRawContent } from "@/lib/utils";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import Footer from "@/components/footer/footer";


// TODO Read more about dynamic imports and see if it's even needed in this case because webvitals are not changing at all
const ScrollToSection = dynamic(() => import("@/components/singleReview/scrollToSection/ScrollToSection"), { ssr: false })
const ReadingProgress = dynamic(() => import("@/components/readingProgress/ReadingProgress"), { ssr: false })
const SocialShare = dynamic(() => import("@/components/singleReview/socialShare/SocialShare"), { ssr: false })
const MoreLikeThis = dynamic(() => import("@/components/singleReview/moreLikeThis/MoreLikeThis"), { ssr: false })
const CommentsAndLikes = dynamic(() => import("@/components/commentsAndLikes/CommentsAndLikes"), { ssr: false })

// export const dynamic = 'force-dynamic';
export const revalidate = 60

function shortenStringTo30Words(str) {
    const cleanedString = str.replace(/<\/?[^>]+(>|$)/g, "");
    const cleanedStringWithoutTags = cleanedString.replace(/<\/?(p|b|strong|em|i|u|strike)>/g, "");
    const words = cleanedStringWithoutTags.split(' ');
    const shortenedWords = words.slice(0, 30);
    const shortenedString = shortenedWords.join(' ');
    return shortenedString;
}

const getData = async (slug) => {
    // console.log(slug)
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/reviews/${slug}`);
    if (!res.ok) {
        notFound()
        // throw new Error('Failed to fetch Single Post data');
    }
    return res.json();
}


export const generateMetadata = async ({params, searchParams}) => {
    const {slug} = params;
    const {movie} = searchParams;
    const data = await getData(slug);
    const movieNumber = movie - 1

    if (data.movies.length === 1) {
        return {
            title: data?.reviewTitle,
            description: shortenStringTo30Words(getRawContent(data?.movies[0].reviewContent)),
            openGraph: {
                images: data.movies[0].singleOgImage,
                type: 'article',
                title: data?.reviewTitle,
                description: shortenStringTo30Words(getRawContent(data?.movies[0].reviewContent)),
            },
            alternates: {
                canonical: `${process.env.DOMAIN_URL}/recenzije/${data?.slug}`
            }
        }
    }

    if (data.movies.length === 4) {
        if (movie) {
            return {
                title: data?.movies[movieNumber].title,
                description: shortenStringTo30Words(getRawContent(data?.movies[movieNumber].reviewContent)),
                openGraph: {
                    images: data.movies[movieNumber].singleOgImage,
                    title: data?.movies[movieNumber].title,
                    description: shortenStringTo30Words(getRawContent(data?.movies[movieNumber].reviewContent)),
                },
                alternates: {
                    canonical: `${process.env.DOMAIN_URL}/recenzije/${data?.slug}?movie=${movie}`
                }
            }
        } if (!movie) {
            return {
                title: data?.reviewTitle,
                description: `${data.movies[0].title}(${data.movies[0].year}), ${data.movies[1].title}(${data.movies[1].year}), ${data.movies[2].title}(${data.movies[2].year}), ${data.movies[3].title}(${data.movies[3].year})`,
                openGraph: {
                    images: data.quadOgImage,
                    title: data?.reviewTitle,
                    description: `${data.movies[0].title}(${data.movies[0].year}), ${data.movies[1].title}(${data.movies[1].year}), ${data.movies[2].title}(${data.movies[2].year}), ${data.movies[3].title}(${data.movies[3].year})`,
                },
                alternates: {
                    canonical: `${process.env.DOMAIN_URL}/recenzije/${data?.slug}`
                }
            }
        }
    }
}

const SinglePostPage = async ({params}) => {
    const {slug} = params;
    const data = await getData(slug);
    // console.log(data.moreLikeThis)

    const structuredData = {
        "@context": "https://schema.org/",
        "@type": "Review",
        "itemReviewed": {
            "@type": "Movie",
            "name": `${data.reviewTitle}`,
            "image": `${data.movies[0].coverImage}`
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": `${data.movies[0].rating}`,
            "bestRating": "5",
            "reviewCount": "1"
        },
        "author": {
            "@type": "Person",
            "name": "Bruno Koić"
        },
        "datePublished": `${data.createdAt}`,
    }

    return (
        <>
        <main className={styles.singlePostContainer}>
            <ScrollToSection />
            <ReadingProgress />
            {data.reviewType === 'quad' && (
                <>
                <ReviewHeader data={data}/>
                <section className={styles.movieAndDate}>
                
                    <EditDeleteButtonsSingle post={data}/>
                    <p className={styles.reviewDate}>
                        <ViewCounter slug={slug} /> - objavljeno {format(new Date(data?.createdAt), 'dd.MM.yyyy')}
                    </p>
                    
                    <h1 className={`${styles.titleH1} ${styles.h1Margin}`}>
                        {data.reviewTitle}
                    </h1>
                </section>
                </>
            )}
            
            {data?.movies.map((movie, index) => (
                <Movie key={movie._id} data={data} movie={movie} id={`movie${index + 1}`} index={index} slug={slug}/>
            ))}
            <CommentsAndLikes post={data} slug={slug}/>
            {data.reviewType === 'quad' && <SocialShare slug={slug} reviewType='single' title={data.reviewTitle} additionalPadding={true}/>}
            {data.reviewType === 'quad' && <OgImageLink link={data.quadOgImage} title={data.reviewTitle} additionalPadding={true}/>}
            <MoreLikeThis data={data.moreLikeThis} postType={data.reviewType}/>

            <JsonLd data={structuredData} />
        </main>
        <Footer />
        </>
    );
};

export default SinglePostPage;

