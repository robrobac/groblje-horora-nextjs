import React, { useEffect, useState } from 'react'
import styles from './newForm.module.scss'
import pageStyles from "@/app/recenzije/[slug]/page.module.scss";
import buttonStyles from '@/components/buttons/buttons.module.scss';
import movieStyles from "@/components/singleReview/movie/movie.module.scss";
import reviewHeaderStyles from '@/components/singleReview/reviewHeader/reviewHeader.module.scss';
import { XIcon } from '../header/svg/XIcon'
import { LoadingBtn } from '../buttons/loadingBtn'
import { Rating } from '../rating/Rating';
import { getRawContent } from '@/lib/utils';
import draftToHtml from 'draftjs-to-html';




export default function PreviewDialog({postPreview, formFailed, loading}) {
    const [post, setPost] = useState(null)
    const [reviewType, setReviewType] = useState('quad')

    useEffect(() => {
        const modal = document.getElementById('previewDialog')
        modal.close()
    }, [formFailed])

    useEffect(() => {
        const openButton = document.getElementById('previewDialogOpenButton')
        const closeButton = document.getElementById('previewDialogCloseButton')
        const modal = document.getElementById('previewDialog')

        const handleOpen = () => {
            modal.showModal()
            modal.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }

        const handleClose = () => {
            modal.close()
        }

        openButton.addEventListener('click', handleOpen)
        closeButton.addEventListener('click', handleClose)

        return () => {
            openButton.removeEventListener('click', handleOpen)
            closeButton.removeEventListener('click', handleClose)
        }
    }, [])

    useEffect(() => {
        setPost(postPreview)
        if (postPreview.movies.length === 4) {
            setReviewType('quad')
        }
        if (postPreview.movies.length === 1) {
            setReviewType('single')
        }
    }, [postPreview])

    return (
        <>
        <dialog className={styles.previewDialogBox} id='previewDialog'>
            <div className={styles.closeIcon} id='previewDialogCloseButton'>
                <XIcon />
            </div>
            <div className={pageStyles.singlePostContainer}>
                {reviewType === 'quad' ? (
                    <div className={reviewHeaderStyles.reviewHeader}>
                        <div className={reviewHeaderStyles.reviewHeaderContainer}>
                            {post?.movies.map((movie, index) => (
                                <div key={`movieImage${index + 1}`} className={reviewHeaderStyles.quadImageContainer}>
                                    {movie.coverImage ? (
                                        <img className={reviewHeaderStyles[`image${index}`]} src={movie.coverImage} alt='movie-cover'></img>
                                    ) : (
                                        <img className={reviewHeaderStyles[`image${index}`]} src={movie.compressedCoverImage ? URL.createObjectURL(movie.compressedCoverImage) : ''} alt='movie-cover'></img>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : ('')}

                {post?.movies.map((movie, index) => (
                    <>
                        <div className={movieStyles.movieContainer} id={`movie${index}`}>
                            {post.reviewType === 'single' ? (
                                <div className={movieStyles.movieInfo}>
                                    <div className={movieStyles.movieImage}>
                                        {movie.coverImage ? (
                                            <img src={movie.coverImage} alt='movie-cover'></img>
                                        ) : (
                                            <img src={movie.compressedCoverImage ? URL.createObjectURL(movie.compressedCoverImage) : ''} alt='movie-cover'></img>
                                        )}
                                    </div>
                                    <h1 className={pageStyles.titleH1}>{movie.title} <span>({movie.year})</span></h1>
                                    <Rating rating={movie.rating} detailed={true}/>
                                </div>
                            ) : (
                                <div className={movieStyles.movieInfo}>
                                    <div className={movieStyles.movieImage}>
                                        {movie.coverImage ? (
                                            <img src={movie.coverImage} alt='movie-cover'></img>
                                        ) : (
                                            <img src={movie.compressedCoverImage ? URL.createObjectURL(movie.compressedCoverImage) : ''} alt='movie-cover'></img>
                                        )}
                                    </div>
                                    <div className={pageStyles.titleH2}>{movie.title} <span>({movie.year})</span></div>
                                    <Rating rating={movie.rating} detailed={true}/>
                                </div>
                            )}
                            <div className={movieStyles.readingSection}>
                                <section className={movieStyles.readingContent} dangerouslySetInnerHTML={{__html: draftToHtml(movie.reviewContent)}}/>
                            </div>
                        </div>
                    </>
                ))}

            </div>
        
            
            <div className={styles.submitBtnContainer}>
                <LoadingBtn loading={loading} content="Objavi" type={loading ? 'button' : 'submit'} size={'20px'}/>
            </div>
        </dialog>
        <button className={`${buttonStyles.button} ${buttonStyles.smallButton}`} type='button' id='previewDialogOpenButton'>Pregledaj prije objave</button>
        </>
    )
}

