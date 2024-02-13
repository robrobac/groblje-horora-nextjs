import { Rating } from '@/components/rating/Rating';
import styles from '@/components/reviewsGallery/postsFlex/postCard/postCard.module.scss';
import { format } from 'date-fns';
import Link from 'next/link';

export default function PostDescription({post}) {
    return (
        <div>
            {post.movies.length === 1 ? (
                <>
                    <p className={styles.postDate}>{format(new Date(post?.createdAt), 'dd.MM.yyyy')}</p>
                    {/* TU IDE COMMENTS I LIKES KOMPONENTA */}
                    <Link href={`/recenzije/${post?.slug}`} target='_blank'>
                        <h2 className={styles.postTitle}>{post?.movies[0].title} <span>({post?.movies[0].year})</span></h2>
                    </Link>
                    <Rating rating={post?.movies[0].rating} detailed={false}/>
                </>
            ) : (
                <>
                    <p className={styles.postDate}>
                        {format(new Date(post.createdAt), 'dd.MM.yyyy')}
                    </p>
                    {/* TU IDE COMMENTS I LIKES KOMPONENTA */}
                    <Link href={`/recenzije/${post?.slug}`} target='_blank'>
                        <h2 className={styles.postTitle}>{post?.reviewTitle}</h2>
                    </Link>
                    <p className={styles.postSubTitle}>
                        {post?.movies[0].title} <span>({post?.movies[0].year})</span>, {post?.movies[1].title} <span>({post?.movies[1].year})</span>, {post?.movies[2].title} <span>({post?.movies[2].year})</span>, {post?.movies[3].title} <span>({post?.movies[3].year})</span>
                    </p>
                </>
            )}
        </div>
    )
}
