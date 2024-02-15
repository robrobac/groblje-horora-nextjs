'use client'
import styles from '@/components/commentsAndLikes/CommentsAndLikes.module.scss'
import buttonStyles from '@/components/buttons/buttons.module.scss'
import LikeIcon from '../svgComponents/LikeIcon'
import { LoadingBtn } from '../buttons/loadingBtn'
import { useEffect, useState } from 'react'
import useAuth from '@/hooks/useAuth'
import { format } from 'date-fns'


export default function Comments({post}) {
    const [commentValue, setCommentValue] = useState('')
    const { user, mongoUser } = useAuth()

    const [liked, setLiked] = useState(false)
    const [numberOfLikes, setNumberOfLikes] = useState(0)
    const [postingComment, setPostingComment] = useState(false)

    useEffect(() => {
        // Check if the current user has liked the post
        const hasLiked = post?.likes?.some(like => like.likeName === user?.username || like.likeEmail === mongoUser?.email);
        setLiked(hasLiked);
    }, [mongoUser, post]);

    useEffect(() => {
        const likes = post?.likes.length
        setNumberOfLikes(likes)
    }, [post])
    
    // Handle comment form submission
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        console.log('Comment Form Submitted')
        setPostingComment(true)
        try {
            // Prepare comment data for MongoDB
            const commentData = {
                authorName: mongoUser.username,
                authorEmail: mongoUser.email,
                message: commentValue,
            };
            console.log('Comment Data prepared for storing to MongoDB')
    
            // Add comment data to MongoDB
            const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/comments?id=${post._id}`, {
                method: 'POST',
                body: JSON.stringify(commentData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            console.log('server response', json)
            if (!response.ok) {
                console.log(json);
                setPostingComment(false)
                return;
            }
            console.log('comment data stored to MongoDB', json);
            setCommentValue('')
            setPostingComment(false)
            
        } catch (err) {
            console.log(err);
        }
    };


    // Handle liked submit
    const handleSubmitLike = async () => {
        console.log('Like Submitted')
        setLiked(!liked)
        try {
            if (liked) {
                setNumberOfLikes(numberOfLikes - 1)
                // Remove like data to MongoDB
                const response = await fetch(`http://localhost:4000/api/reviews/${post._id}/likes/${mongoUser?.email}`, {
                    method: 'DELETE',
                });
                const json = await response.json();
                console.log('server response', json)
                if (!response.ok) {
                    console.log(json);
                    return;
                }
                console.log('like removed from MongoDB', json);
            }

            if (!liked) {
                setNumberOfLikes(numberOfLikes + 1)
                // Prepare like data for MongoDB
                const likeData = {
                    likeName: mongoUser.username,
                    likeEmail: mongoUser.email,
                };
                console.log('like Data prepared for storing to MongoDB', likeData)
        
                // Add like data to MongoDB
                const response = await fetch(`http://localhost:4000/api/likes/${post._id}`, {
                    method: 'POST',
                    body: JSON.stringify(likeData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const json = await response.json();
                console.log('server response', json)
                if (!response.ok) {
                    console.log(json);
                    return;
                }
                console.log('like data stored to MongoDB', json);
            }
        } catch (err) {
            console.log(err);
        }
    };

    // Handle comment removal
    const handleDeleteComment = async (commentId) => {
        try {
            const deleteResponse = await fetch(`http://localhost:4000/api/reviews/${post._id}/comments/${commentId}`, {
                method: 'DELETE'
            })
            const json = await deleteResponse.json()

            if (deleteResponse.ok) {
                console.log("comment deleted", json)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={styles.commentsContainer}>
            <div className={styles.commentsHeader}>
                <div className={styles.likeHead}>
                    <LikeIcon onClick={mongoUser && user?.emailVerified ? handleSubmitLike : null} className={liked ? 'liked' : ''}/>
                    <p>{numberOfLikes}</p>
                </div>
                <button className={`${buttonStyles.button} ${buttonStyles.commentsTabButton} ${buttonStyles.active}`}>Komentari <span>{`(${post?.comments.length})`}</span></button>
            </div>
            <div className={`${styles.commentsHeader} ${styles.commentsContent}`}>
                <ul className={styles.commentsList}>
                    {post?.comments.length === 0 ? 
                        <p className={styles.noComments}><i>Nema komentara, budi prvi i ostavi svoj komentar</i></p>
                    :
                        ''
                    }
                    {post?.comments.map((comment, index) => (
                        <li className={styles.comment} key={`comment${index}`}>
                            <div className={styles.commentAuthor}>{comment?.authorName} @ <span>{format(new Date(comment?.createdAt), 'dd.MM.yyyy HH:mm:ss')}</span></div>
                            {mongoUser?.role === 'admin' || mongoUser?.username === comment.authorName || mongoUser?.email === comment.authorEmail ?
                                <button className={styles.removeComment} onClick={() => handleDeleteComment(comment._id)}>X</button>
                            :
                                ''
                            }
                            <p className={styles.commentMessage}>
                                {comment?.message}
                            </p>
                            <hr className={styles.divider}></hr>
                        </li>
                    ))}
                </ul>
                <form className={styles.commentForm} onSubmit={handleSubmitComment}>
                    <input className={styles.formInput}
                        disabled={mongoUser && user.emailVerified ? false : true}
                        type='text' placeholder={mongoUser ? 'Upiši komentar' : 'Prijavite se da ostavite komentar'}
                        value={commentValue}
                        onChange={(e) => {setCommentValue(e.target.value)}}
                    />
                    {/* <LoadingButton disabled={mongoUser ? false : true} customClass={mongoUser ? '' : 'disabled'} type={postingComment ? 'button' : 'submit'} title='Pošalji' loading={postingComment} minWidth='110px'/> */}
                    <LoadingBtn loading={postingComment} type={postingComment ? 'button' : 'submit'} content='Pošalji' disabled={mongoUser ? false : true} customClass={mongoUser ? '' : 'disabled'} size={20} width={100}/>
                </form>
            </div>
        </div>
    )
}
