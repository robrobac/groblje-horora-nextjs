"use server"
import styles from "@/app/recenzije/[slug]/page.module.scss";
import { Movie } from "@/components/singleReview/movie/Movie";
import { ReviewHeader } from "@/components/singleReview/reviewHeader/ReviewHeader";
import { getReview } from "@/lib/data";
import { format } from "date-fns";

function shortenStringTo30Words(str) {
    const words = str.split(' ');
    const shortenedWords = words.slice(0, 30);
    const shortenedString = shortenedWords.join(' ');
    console.log(shortenedString)
    return shortenedString + '</p>';
}





const SinglePostPage = async ({params}) => {
    const {slug} = params;
    const data = await getReview(slug);
    console.log(data)
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

            {data?.movies.map((movie) => (
                <Movie key={movie._id} data={data} movie={movie}/>
            ))}
            
        </main>
    );
};

export default SinglePostPage;

