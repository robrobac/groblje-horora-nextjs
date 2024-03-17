import styles from '@/components/reviewsGallery/postsFlex/postCard/postCard.module.scss';
import Link from 'next/link'
import bloodyBorder from '../../../../../public/images/bloody-border.png'
import Image from 'next/image';


export default function postImage({post, newTab}) {
    return (
        <Link className={styles.postImageLink} href={`/recenzije/${post?.slug}`} target={newTab ? '_blank' : '_self'}>
            {post?.movies.length === 4 ? (
                <div className={styles.quadImageContainer}>
                    <figure className={styles.quadImage}>
                        <Image width={196.5} height={288.2} sizes="(max-width: 425px) 100px, (max-width: 768px) 100px, (max-width: 1024px) 100px, 75px" className={styles.image01} src={post.movies[0].coverImage} alt={`${post.movies[0].title} cover image`}></Image>
                    </figure>
                    <figure className={styles.quadImage}>
                        <Image width={196.5} height={288.2} sizes="(max-width: 425px) 100px, (max-width: 768px) 100px, (max-width: 1024px) 100px, 75px"  className={styles.image02} src={post.movies[1].coverImage} alt={`${post.movies[1].title} cover image`}></Image>
                    </figure>
                    <figure className={styles.quadImage}>
                        <Image width={196.5} height={288.2} sizes="(max-width: 425px) 100px, (max-width: 768px) 100px, (max-width: 1024px) 100px, 75px"  className={styles.image03} src={post.movies[2].coverImage} alt={`${post.movies[2].title} cover image`}></Image>
                    </figure>
                    <figure className={styles.quadImage}>
                        <Image width={196.5} height={288.2} sizes="(max-width: 425px) 100px, (max-width: 768px) 100px, (max-width: 1024px) 100px, 75px"  className={styles.image04} src={post.movies[3].coverImage} alt={`${post.movies[3].title} cover image`}></Image>
                    </figure>
                </div>
            ) : (
                <figure className={`${styles.previewImage} ${post.movies[0].top25 && styles.top25}`}>
                    <Image placeholder='blur' blurDataURL={post.movies[0].coverImage} width={393} height={576.5} className={styles.singleMovieImage} sizes="(max-width: 425px) 300px, (max-width: 768px) 200px, (max-width: 1024px) 160px, 150px" src={post.movies[0].coverImage} alt={`${post.movies[0].title} cover image`}></Image>
                    {post.movies[0].top25 && (<Image className={styles.bloodyBorder} src={bloodyBorder} alt='bloody border representing top 25'></Image>)}
                </figure>
            )}
        </Link>
    )
}
