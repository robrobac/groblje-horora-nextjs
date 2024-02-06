"use client"

import React, { useEffect, useState } from 'react'
import styles from '@/components/pagination/pagination.module.scss'

export default function Pagination({currentPage, totalPages, handlePageChange}) {
    const [page, setPage] = useState(1)
    const [inputPage, setInputPage] = useState(1)


    useEffect(() => {
        setPage(currentPage)
        setInputPage(currentPage)
    }, [currentPage])

    const changePage = (value) => {
        const pageNumber = parseInt(value, 10);
        handlePageChange(pageNumber)
    }

    const handlePageInput = (e) => {
        e.preventDefault()
        changePage(inputPage)

    }

    return (
        <div className={styles.styledPagination}>
            <button className={`${styles.paginationButton} ${page === 1 ? styles.disabled : ''}`} onClick={() => changePage(page - 1)} disabled={page === 1}>{`<`}</button>
            <form className={styles.pageForm} onSubmit={handlePageInput}>
                <input className={styles.pageInput} type='number' value={inputPage} onChange={(e) => setInputPage(e.target.value)} min={1} max={totalPages?.length}/>
                <p>/</p>
                <p>{totalPages?.length || 1}</p>
            </form>
            <button className={`${styles.paginationButton} ${page === totalPages?.length || totalPages?.length === 0 ? styles.disabled : ''}`} onClick={() => changePage(page + 1)} disabled={page === totalPages?.length}>{`>`}</button>
        </div>
    )
}
