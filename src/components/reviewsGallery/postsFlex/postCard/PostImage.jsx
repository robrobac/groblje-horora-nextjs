import styles from '@/components/reviewsGallery/postsFlex/postCard/postCard.module.scss';
import Link from 'next/link'


export default function postImage({post}) {
    return (
        <Link href={`/recenzije/${post?.slug}`} target='_blank'>
            {post?.movies.length === 4 ? (
                <div className={styles.QuadImageContainer}>
                    <div className={styles.quadImage}>
                        <img className={styles.image01} src={post.movies[0].coverImage} alt='movie1-cover'></img>
                    </div>
                    <div className={styles.quadImage}>
                        <img className={styles.image02} src={post.movies[1].coverImage} alt='movie2-cover'></img>
                    </div>
                    <div className={styles.quadImage}>
                        <img className={styles.image03} src={post.movies[2].coverImage} alt='movie3-cover'></img>
                    </div>
                    <div className={styles.quadImage}>
                        <img className={styles.image04} src={post.movies[3].coverImage} alt='movie4-cover'></img>
                    </div>
                </div>
            ) : (
                <div className={styles.previewImage}>
                    <img className={styles.singleMovieImage} src={post.movies[0].coverImage} alt='movie-cover'></img>
                </div>
            )}
        </Link>
    )
}
