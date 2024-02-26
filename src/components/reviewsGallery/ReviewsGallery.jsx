"use client"
import React, { createContext } from 'react'
import useFetchReviewsWithParams from '@/hooks/useFetchReviewsWithParams'
import PostsFlex from './postsFlex/PostsFlex';
import Pagination from '../pagination/Pagination';
import Search from '../searchBar/Search';
import GhostSpinner from '../ghostSpinner/GhostSpinner';
import useAuth from '@/hooks/useAuth';
import { SORTING_OPTIONS } from '@/lib/sortOptions';

export const ReviewsGalleryContext = createContext()

export default function ReviewsGallery() {
    const { user, mongoUser } = useAuth()

    const {
        reviews,
        page,
        totalPages,
        handlePageChange,
        search,
        handleSearch,
        selectedFilterKey,
        selectedFilterVal,
        handleFilter,
        sort,
        order,
        handleSortAndOrder,
        loading,
        handleRefresh,
        totalItems,
    } = useFetchReviewsWithParams(SORTING_OPTIONS.CREATED.dbKey, 'desc', 30)


    return (
        <ReviewsGalleryContext.Provider value={{
            handleSearch,
            search,
            handleFilter,
            selectedFilterKey,
            selectedFilterVal,
            handleSortAndOrder,
            sort,
            order,
            totalItems,
            loading,
        }}>
            <Search controls={true}/>
            {loading ? (<GhostSpinner />) : (
                <>
                    <PostsFlex posts={reviews} loading={loading} handleRefresh={handleRefresh} user={user} mongoUser={mongoUser}/>
                    {reviews.length !== 0 ? 
                        <Pagination currentPage={page} totalPages={totalPages} handlePageChange={handlePageChange}/>
                    : ""} 
                </>
            )}
        </ReviewsGalleryContext.Provider>
    )
}
