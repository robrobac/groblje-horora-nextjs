"use client"
import styles from '@/components/searchBar/search.module.scss';
import useFetchReviewsWithParams from '@/hooks/useFetchReviewsWithParams'
import { SORT_OPTIONS } from '@/lib/sortOptions'

import React from 'react'
import Search from '../searchBar/Search'
import PostsFlex from './postsFlex/PostsFlex';
import Pagination from '../pagination/Pagination';

export default function ReviewsGallery({searchParams}) {

    const {
        reviews,
        page,
        totalPages,
        handlePageChange
    } = useFetchReviewsWithParams('recenzije', SORT_OPTIONS.CREATED, 'desc', 30)

    console.log(reviews)
    return (
        <>
            <PostsFlex posts={reviews}/>
            <Pagination currentPage={page} totalPages={totalPages} handlePageChange={handlePageChange}/>
        </>
    )
}
