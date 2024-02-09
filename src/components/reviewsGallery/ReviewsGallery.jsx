"use client"
import useFetchReviewsWithParams from '@/hooks/useFetchReviewsWithParams'
import { SORT_OPTIONS } from '@/lib/sortOptions'

import React from 'react'

import PostsFlex from './postsFlex/PostsFlex';
import Pagination from '../pagination/Pagination';
import Search from '../searchBar/Search';
import GhostSpinner from '../ghostSpinner/GhostSpinner';

export default function ReviewsGallery() {

    const {
        reviews,
        page,
        totalPages,
        handlePageChange,
        search,
        handleSearch,
        filter,
        handleFilter,
        sort,
        order,
        handleSortAndOrder,
        loading
    } = useFetchReviewsWithParams('recenzije', SORT_OPTIONS.CREATED, 'desc', 30)

    return (
        <>
            <Search controls={true} handleSearch={handleSearch} search={search} handleFilter={handleFilter} filter={filter} handleSortAndOrder={handleSortAndOrder} sort={sort} order={order}/>
            {loading ? (<GhostSpinner />) : (
                <>
                    <PostsFlex posts={reviews} loading={loading}/>
                    {reviews.length !== 0 ? 
                        <Pagination currentPage={page} totalPages={totalPages} handlePageChange={handlePageChange}/>
                    : ""} 
                </>
            )}
        </>
    )
}
