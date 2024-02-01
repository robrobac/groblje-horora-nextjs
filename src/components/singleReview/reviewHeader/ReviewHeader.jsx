import styles from '@/components/singleReview/reviewHeader/reviewHeader.module.scss';

export const ReviewHeader = ({data}) => {


    return (
        <div className={styles.reviewHeader}>
            <div className={styles.reviewHeaderContainer}>
                {data.movies.map((movie, index) => (
                    <div key={`movieImage${index + 1}`} className={styles.quadImageContainer}>
                        {movie.coverImage ? (
                            <img className={styles[`image${index}`]} src={movie.coverImage} alt='movie-cover'></img>
                        ) : (
                            <img className={styles[`image${index}`]} src={movie.compressedCoverImage ? URL.createObjectURL(movie.compressedCoverImage) : ''} alt='movie-cover'></img>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}