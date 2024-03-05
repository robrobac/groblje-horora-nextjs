import styles from '@/components/reviewsGallery/postsFlex/postCard/postCard.module.scss';
import Link from 'next/link'
import bloodyBorder from '../../../../../public/images/bloody-border.png'


export default function postImage({post, newTab}) {
    return (
        <Link href={`/recenzije/${post?.slug}`} target={newTab ? '_blank' : '_self'}>
            {post?.movies.length === 4 ? (
                <div className={styles.quadImageContainer}>
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
                <div className={`${styles.previewImage} ${post.movies[0].top25 && styles.top25}`}>
                    <img className={styles.singleMovieImage} src={post.movies[0].coverImage} alt='movie-cover'></img>
                    {post.movies[0].top25 && (<img className={styles.bloodyBorder} src={bloodyBorder.src} alt='bloody border representing top 25'></img>)}
                </div>
            )}
        </Link>
    )
}
