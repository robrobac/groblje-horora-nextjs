import styles from '@/components/singleReview/moreLikeThis/moreLikeThis.module.scss'
import PostImage from '@/components/reviewsGallery/postsFlex/postCard/PostImage';
import { Rating } from '@/components/rating/Rating';
import { StandardBtn } from '@/components/buttons/standardBtn/StandardBtn';
import Link from 'next/link';

export default async function MoreLikeThis({data, postType}) {
    return (
        <section className={styles.moreLikeThis}>
            <hr className={styles.divider}></hr>
            <p className={styles.moreLikeThisTitle}>Moglo bi vas zanimati...</p>
            <div className={styles.moreLikeThisFlexRow}>
                    {data && data.map((post) => (
                        <article key={post._id} className={styles.moreLikeThisPost}>
                            <div className={styles.moreLikeThisPostInfo}>
                                <PostImage post={post} newTab={false}/>
                                <Link href={`/recenzije/${post?.slug}`}>
                                    {postType === 'single' ? (
                                        <h2>{post.reviewTitle} {post.movies.length === 1 && (<span>({post?.movies[0].year})</span>)}</h2>
                                    ) : (
                                        <h3>{post.reviewTitle} {post.movies.length === 1 && (<span>({post?.movies[0].year})</span>)}</h3>
                                    )}
                                </Link>
                                {post.movies.length === 1 && (<Rating rating={post.movies[0].rating}/>)}
                                {post.movies.length === 4 && (
                                    <p className={styles.moreLikeThisDescription}>
                                        {post.movies[0].title} <span>({post?.movies[0].year})</span>, {post?.movies[1].title} <span>({post?.movies[1].year})</span>, {post?.movies[2].title} <span>({post?.movies[2].year})</span>, {post?.movies[3].title} <span>({post?.movies[3].year})</span>
                                    </p>
                                )}
                            </div>
                            <StandardBtn path={`/recenzije/${post?.slug}`} content='Pročitaj više →' type='textOnly' newTab={false}/>
                            
                        </article>
                    ))}
            </div>

        </section>
    )
}
