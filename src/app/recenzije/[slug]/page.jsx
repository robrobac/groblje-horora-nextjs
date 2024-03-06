

import styles from "@/app/recenzije/[slug]/page.module.scss";
import CommentsAndLikes from "@/components/commentsAndLikes/CommentsAndLikes";
import EditDeleteButtonsSingle from "@/components/editDeleteButton/EditDeleteButtonsSingle";
import ReadingProgress from "@/components/readingProgress/ReadingProgress";
import MoreLikeThis from "@/components/singleReview/moreLikeThis/MoreLikeThis";
import { Movie } from "@/components/singleReview/movie/Movie";
import { ReviewHeader } from "@/components/singleReview/reviewHeader/ReviewHeader";
import ScrollToSection from "@/components/singleReview/scrollToSection/ScrollToSection";
import { getRawContent } from "@/lib/utils";
import { format } from "date-fns";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

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
    // console.log(movie)

    if (data.movies.length === 1) {
        return {
            title: data?.reviewTitle,
            description: shortenStringTo30Words(getRawContent(data?.movies[0].reviewContent)),
            openGraph: {
                images: data?.movies[0].coverImage,
                title: data?.reviewTitle,
                description: shortenStringTo30Words(getRawContent(data?.movies[0].reviewContent)),
            },
            alternates: {
                canonical: `https://www.groblje-horora.com/recenzije/${data?.slug}`
            }
        }
    }

    if (data.movies.length === 4) {
        if (movie) {
            return {
                title: data?.movies[movieNumber].title,
                description: shortenStringTo30Words(getRawContent(data?.movies[movieNumber].reviewContent)),
                openGraph: {
                    images: data?.movies[movieNumber].coverImage,
                    title: data?.movies[movieNumber].title,
                    description: shortenStringTo30Words(getRawContent(data?.movies[movieNumber].reviewContent)),
                },
                alternates: {
                    canonical: `https://www.groblje-horora.com/recenzije/${data?.slug}?movie=${movie}`
                }
            }
        } if (!movie) {
            return {
                title: data?.reviewTitle,
                description: `${data.movies[0].title}(${data.movies[0].year}), ${data.movies[1].title}(${data.movies[1].year}), ${data.movies[2].title}(${data.movies[2].year}), ${data.movies[3].title}(${data.movies[3].year})`,
                openGraph: {
                    images: 'https://firebasestorage.googleapis.com/v0/b/groblje-horora-89186.appspot.com/o/groblje-horora-og-image.webp?alt=media&amp;token=9505221c-7713-4907-8a95-78047f2cd1b7',
                    title: data?.reviewTitle,
                    description: `${data.movies[0].title}(${data.movies[0].year}), ${data.movies[1].title}(${data.movies[1].year}), ${data.movies[2].title}(${data.movies[2].year}), ${data.movies[3].title}(${data.movies[3].year})`,
                },
                alternates: {
                    canonical: `https://www.groblje-horora.com/recenzije/${data?.slug}`
                }
            }
        }
    }
}

const SinglePostPage = async ({params}) => {
    const {slug} = params;
    const data = await getData(slug);
    console.log(data.moreLikeThis)

    return (
        <main className={styles.singlePostContainer}>
            <ScrollToSection />
            <ReadingProgress />
            {data.reviewType === 'quad' && (
                <>
                <ReviewHeader data={data}/>
                <section className={styles.movieAndDate}>
                    <EditDeleteButtonsSingle post={data}/>
                    <p className={styles.reviewDate}>
                        {format(new Date(data?.createdAt), 'dd.MM.yyyy')}
                    </p>
                    <h1 className={`${styles.titleH1} ${styles.h1Margin}`}>{data.reviewTitle}</h1>
                </section>
                </>
            )}
            
            {data?.movies.map((movie, index) => (
                <Movie key={movie._id} data={data} movie={movie} id={`movie${index + 1}`} index={index}/>
            ))}
            <CommentsAndLikes post={data} slug={slug}/>
            <MoreLikeThis data={data.moreLikeThis} />
        </main>
    );
};

export default SinglePostPage;

