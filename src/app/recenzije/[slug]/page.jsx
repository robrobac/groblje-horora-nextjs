
import styles from "@/app/recenzije/[slug]/page.module.scss";
import { Movie } from "@/components/singleReview/movie/Movie";
import { ReviewHeader } from "@/components/singleReview/reviewHeader/ReviewHeader";
import { getRawContent } from "@/lib/utils";
import { format } from "date-fns";

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
        throw new Error('Failed to fetch Single Post data');
    }
    return res.json();
}



export const generateMetadata = async ({params}) => {
    const {slug} = params;
    const data = await getData(slug);

    return {
        title: data.reviewTitle,
        description: shortenStringTo30Words(getRawContent(data.movies[0].reviewContent)),
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
            
        </main>
    );
};

export default SinglePostPage;

