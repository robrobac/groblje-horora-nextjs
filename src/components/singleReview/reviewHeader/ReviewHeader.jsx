import styles from '@/components/singleReview/reviewHeader/reviewHeader.module.scss';
import Image from 'next/image';

export const ReviewHeader = ({data}) => {


    return (
        <div className={styles.reviewHeader}>
            <div className={styles.reviewHeaderContainer}>
                {data.movies.map((movie, index) => (
                    <div key={`movieImage${index + 1}`} className={styles.quadImageContainer}>
                        {movie.coverImage ? (
                            <Image priority={true} width={480} height={773} sizes="(max-width: 768px) 150px, (max-width: 1024px) 200px, 300px" style={{objectFit: 'cover'}} className={styles[`image${index}`]} src={movie.coverImage} alt={`Cover slika horor filma ${movie.title}(${movie.year})`}></Image>
                        ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img className={styles[`image${index}`]} src={movie.compressedCoverImage ? URL.createObjectURL(movie.compressedCoverImage) : ''} alt='movie-cover'></img>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}