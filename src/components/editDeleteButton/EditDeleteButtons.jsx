'use client'
import React, { useState } from 'react'
import styles from './editDeleteButtons.module.scss'
import Link from 'next/link'
import DeleteIcon from './svg/DeleteIcon'
import EditIcon from './svg/EditIcon'
import { deleteImageFromFirebaseStorage } from '@/lib/firebase/firebaseUtils'
import GhostSpinner from '../ghostSpinner/GhostSpinner'


export default function EditDeleteButtons({post, targetBlank, handleRefresh, user, mongoUser}) {
    const [loading, setLoading] = useState(false)

    const handleDelete = async (review) => {
        setLoading(true);

        if (window.confirm("Koja BRT ako ovo prihvatis objava odlazi na vjecna lovista, bez mogucnosti povratka MF.") === true) {
            let imagesToDelete = []

            if (review.contentImages) {
                review.contentImages.forEach((image) => {
                    imagesToDelete.push(image.path)
                })
            }
            if (review.movies) {
                review.movies.forEach((movie) => {
                    imagesToDelete.push(movie.coverImagePath)
                    imagesToDelete.push(movie.singleOgImagePath)
                })
            }

            if (review.quadOgImagePath) {
                imagesToDelete.push(review.quadOgImagePath)
            }

            // console.log('images to delete: ', imagesToDelete) // Keep in Development

            try {
                const deleteResponse = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/reviews/${review._id}`, {
                    method: 'DELETE',
                });
                const deleteJson = await deleteResponse.json();
                if (deleteResponse.ok) {
                    // console.log('Review Deleted', deleteJson); // Keep in Development

                    // console.log('images to delete: ', imagesToDelete) // Keep in Development

                    imagesToDelete.forEach(async (image) => {
                        await deleteImageFromFirebaseStorage(image)
                        // console.log("image deleted from firebase") // Keep in Development
                    })
                    // console.log("all images removed from firebase") // Keep in Development
                }
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false);
                handleRefresh()
            }
        } else {
            setLoading(false)
        }
    }

    if (mongoUser?.role === 'admin' && user) {
        return (
            <div className={styles.editDeleteButtonsContainer}>
                <div className={styles.adminBtn} onClick={() => handleDelete(post)}>
                    {loading ? <GhostSpinner size={'24px'}/> : <DeleteIcon/>}
                </div>
                <Link href={`/recenzije/${post.slug}/edit`} target={targetBlank ? '_blank' : ''}>
                    <div className={styles.adminBtn}>
                        <EditIcon/>                       
                    </div>
                </Link>
            </div>
        )
    } else {
        return null
    }

    
}
