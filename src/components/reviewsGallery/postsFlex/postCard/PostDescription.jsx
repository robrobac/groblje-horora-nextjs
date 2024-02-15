'use client'

import { Rating } from '@/components/rating/Rating';
import styles from '@/components/reviewsGallery/postsFlex/postCard/postCard.module.scss';
import CommentIcon from '@/components/svgComponents/CommentIcon';
import LikeIcon from '@/components/svgComponents/LikeIcon';
import useAuth from '@/hooks/useAuth';
import { format } from 'date-fns';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function PostDescription({post, mongoUser}) {
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        // Check if the current user has liked the post
        const hasLiked = post?.likes?.some(like => like.likeName === mongoUser?.username || like.likeEmail === mongoUser?.email);
        setLiked(hasLiked);
    }, [mongoUser, post]);
    return (
        <div className={styles.previewDetails}>
            {post.movies.length === 1 ? (
                <>
                    <div className={styles.commentsAndLikesWrap}>
                        <div className={`${styles.commentIconContainer} ${styles.likeIconContainer}`}>
                            <p>{post?.likes.length}</p> <LikeIcon className={`${liked ? styles.liked : ''}`}/>
                        </div>
                        <div className={styles.commentIconContainer}>
                            <p>{post?.comments.length}</p> <CommentIcon />
                        </div>
                    </div>
                    <p className={styles.postDate}>{format(new Date(post?.createdAt), 'dd.MM.yyyy')}</p>
                    <Link href={`/recenzije/${post?.slug}`} target='_blank'>
                        <h2 className={styles.postTitle}>{post?.movies[0].title} <span>({post?.movies[0].year})</span></h2>
                    </Link>
                    <Rating rating={post?.movies[0].rating} detailed={false}/>
                </>
            ) : (
                <>
                    <div className={styles.commentsAndLikesWrap}>
                        <div className={`${styles.commentIconContainer} ${styles.likeIconContainer} ${liked ? styles.liked : ''}`}>
                            <p>{post?.likes.length}</p> <LikeIcon />
                        </div>
                        <div className={styles.commentIconContainer}>
                            <p>{post?.comments.length}</p> <CommentIcon />
                        </div>
                    </div>
                    <p className={styles.postDate}>{format(new Date(post.createdAt), 'dd.MM.yyyy')}</p>
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
