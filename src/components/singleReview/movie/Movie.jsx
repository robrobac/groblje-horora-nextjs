import draftToHtml from "draftjs-to-html"
import pageStyles from "@/app/recenzije/[slug]/page.module.scss"
import styles from "@/components/singleReview/movie/movie.module.scss";
import { format } from "date-fns";

function getRawContent(content) {
    if (content) {
        const rawContent = JSON.parse(content)
        const markup = draftToHtml(rawContent)
        return markup
    }
}

export const Movie = ({data, movie}) => {
    console.log(movie)

    return (
        <div className={styles.movieContainer}>
            {data.reviewType === 'single' ? (
                <div className={styles.movieInfo}>
                    <div className={styles.movieImage}>
                        <img src={movie.coverImage} alt='movie-cover'></img>
                    </div>
                    <p className={pageStyles.reviewDate}>
                        {format(new Date(data.createdAt), 'dd.MM.yyyy')}
                    </p>
                    <h1 className={pageStyles.titleH1}>{movie.title} <span>({movie.year})</span></h1>
                    {/* <Rating rating={movie.rating} detailed={true}/> */}
                </div>
            ) : (
                <div className={styles.movieInfo}>
                    <div className={styles.movieImage}>
                        <img src={movie.coverImage} alt='movie-cover'></img>
                    </div>
                    <div className={pageStyles.titleH2}>{movie.title} <span>({movie.year})</span></div>
                    {/* <Rating rating={movie.rating} detailed={true}/> */}
                </div>
            )}
            <div className={styles.readingSection}>
                <section className={styles.readingContent} dangerouslySetInnerHTML={{__html: getRawContent(movie.reviewContent)}}/>
            </div>
        </div>
    )
}