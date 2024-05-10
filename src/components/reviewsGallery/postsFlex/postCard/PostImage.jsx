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
                        <Image width={196.5} height={288.2} sizes="(max-width: 425px) 100px, (max-width: 768px) 100px, (max-width: 1024px) 100px, 75px" className={styles.image01} src={post.movies[0].coverImage} alt={`Naslovna slika horor filma ${post.movies[0].title}(${post.movies[0].year})`}></Image>
                    </figure>
                    <figure className={styles.quadImage}>
                        <Image width={196.5} height={288.2} sizes="(max-width: 425px) 100px, (max-width: 768px) 100px, (max-width: 1024px) 100px, 75px"  className={styles.image02} src={post.movies[1].coverImage} alt={`Naslovna slika horor filma ${post.movies[1].title}(${post.movies[1].year})`}></Image>
                    </figure>
                    <figure className={styles.quadImage}>
                        <Image width={196.5} height={288.2} sizes="(max-width: 425px) 100px, (max-width: 768px) 100px, (max-width: 1024px) 100px, 75px"  className={styles.image03} src={post.movies[2].coverImage} alt={`Naslovna slika horor filma ${post.movies[2].title}(${post.movies[2].year})`}></Image>
                    </figure>
                    <figure className={styles.quadImage}>
                        <Image width={196.5} height={288.2} sizes="(max-width: 425px) 100px, (max-width: 768px) 100px, (max-width: 1024px) 100px, 75px"  className={styles.image04} src={post.movies[3].coverImage} alt={`Naslovna slika horor filma ${post.movies[3].title}(${post.movies[3].year})`}></Image>
                    </figure>
                </div>
            ) : (
                <figure className={`${styles.previewImage} ${post.movies[0].top25 && styles.top25}`}>
                    <Image placeholder='blur' blurDataURL={post.movies[0].coverImage} width={393} height={576.5} className={styles.singleMovieImage} sizes="(max-width: 425px) 300px, (max-width: 768px) 200px, (max-width: 1024px) 160px, 150px" src={post.movies[0].coverImage} alt={`Naslovna slika horor filma ${post.movies[0].title}(${post.movies[0].year})`}></Image>
                    {post.movies[0].top25 && (<Image className={styles.bloodyBorder} src={bloodyBorder} alt='Top 25 Preporuka okvir'></Image>)}
                </figure>
            )}
        </Link>
    )
}
