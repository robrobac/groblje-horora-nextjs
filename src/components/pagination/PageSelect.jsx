
"use client"
import React, { useEffect, useState } from 'react'
import styles from '@/components/pagination/pagination.module.scss'
import { useRouter, useSearchParams } from 'next/navigation'

export default function PageSelect({tag, page, totalPages}) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const currentPage = parseInt(searchParams.get('page'))
    const [inputPage, setInputPage] = useState(currentPage || page || 1)
    // console.log("inputpage:", inputPage) // Keep in Development
    // console.log("currentpage:", currentPage) // Keep in Development
    // console.log("page:", page) // Keep in Development
    
    
    // console.log(currentPage, page) // Keep in Development

    const handleSubmit = (e) => {
        e.preventDefault()
        router.push(`/tags/${tag}?page=${inputPage}`)
    }

    useEffect(() => {
        setInputPage(page)
    }, [page])

    return (
        <form className={styles.pageForm} onSubmit={handleSubmit}>
            <input className={styles.pageInput} type='number' min={1} max={totalPages} value={inputPage} onChange={(e) => setInputPage(parseInt(e.target.value))}/>
            <p>/</p>
            <p>{totalPages !== 0 ? totalPages : 1}</p>
        </form>
    )
}
