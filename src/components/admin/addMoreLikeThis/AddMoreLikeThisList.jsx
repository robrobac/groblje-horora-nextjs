"use client"

import styles from '@/components/admin/addMoreLikeThis/addMoreLikeThis.module.scss';
import { getReviewsFromIds } from '@/lib/utils';
import { useEffect, useState } from 'react';
import PostImage from '@/components/reviewsGallery/postsFlex/postCard/PostImage';

export default function AddMoreLikeThisList({selectedIds, removeSelected}) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const data = await getReviewsFromIds(selectedIds);
            setReviews(data);
        };
            if (selectedIds.length) {
                fetchReviews();
        }
    }, [selectedIds]);

    return (
        <div className={styles.addMoreLikeThisFlexRow}>
            {reviews.map((review) => {
                return (

                    <div key={review._id} className={styles.addMoreLikeThisPostInfo}>
                        
                        <PostImage post={review} newTab={false} disableLink={true}/>
                        <h3>{review.reviewTitle} {review.movies.length === 1 && (<span>({review?.movies[0].year})</span>)}</h3>
                        {review.movies.length === 4 && (
                            <p className={styles.addMoreLikeThisDescription}>
                                {review.movies[0].title} <span>({review?.movies[0].year})</span>, {review?.movies[1].title} <span>({review?.movies[1].year})</span>, {review?.movies[2].title} <span>({review?.movies[2].year})</span>, {review?.movies[3].title} <span>({review?.movies[3].year})</span>
                            </p>
                        )}
                        <span className={styles.addMoreLikeThisDeleteButton} onClick={() => removeSelected(review._id)}>X</span>
                    </div>
                )
            })}
        </div>
    )
}
