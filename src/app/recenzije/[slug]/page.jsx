
import styles from "@/app/recenzije/[slug]/page.module.scss";
import CommentsAndLikes from "@/components/commentsAndLikes/CommentsAndLikes";
import EditDeleteButtonsSingle from "@/components/editDeleteButton/EditDeleteButtonsSingle";
import { Movie } from "@/components/singleReview/movie/Movie";
import { ReviewHeader } from "@/components/singleReview/reviewHeader/ReviewHeader";
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
    console.log(slug)
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

    if (movie) {
        return {
            title: data?.movies[movieNumber].title,
            description: shortenStringTo30Words(getRawContent(data?.movies[movieNumber].reviewContent)),
            openGraph: {
                images: data?.movies[movieNumber].coverImage,
            },
        }
    }
   
    return {
        title: data?.reviewTitle,
        description: shortenStringTo30Words(getRawContent(data?.movies[0].reviewContent)),
        openGraph: {
            images: data?.movies[0].coverImage,
        },
    }
}

const SinglePostPage = async ({params}) => {
    const {slug} = params;
    const data = await getData(slug);

    return (
        <main className={styles.singlePostContainer}>
            {data.reviewType === 'quad' && (
                <>
                <ReviewHeader data={data}/>
                <div className={styles.movieAndDate}>
                    <EditDeleteButtonsSingle post={data}/>
                    <p className={styles.reviewDate}>
                        {format(new Date(data?.createdAt), 'dd.MM.yyyy')}
                    </p>
                    <h1 className={styles.titleH1}>{data.reviewTitle}</h1>
                </div>
                </>
            )}
            
            {data?.movies.map((movie, index) => (
                <Movie key={movie._id} data={data} movie={movie} id={`movie${index}`}/>
            ))}
            <CommentsAndLikes post={data}/>
            
        </main>
    );
};

export default SinglePostPage;

