
import React from 'react'
import Link from "next/link";
import styles from '@/components/pagination/pagination.module.scss'
import PageSelect from './PageSelect';

export default function PaginationSSR({tag, page, totalPages}) {

    return (
        <div className={styles.styledPagination}>
            <Link className={page === 1 ? styles.linkDisabled : undefined} href={`${process.env.DOMAIN_URL}/tags/${tag}?page=${page - 1}`}>
                <button className={`${styles.paginationButton} ${page === 1 ? styles.disabled : ''}`}>{`<`}</button>
            </Link>
            <PageSelect page={page} totalPages={totalPages} tag={tag}/>    
            <Link className={page === totalPages ? styles.linkDisabled : undefined} href={`${process.env.DOMAIN_URL}/tags/${tag}?page=${page + 1}`}>
                <button className={`${styles.paginationButton} ${page === totalPages || totalPages === 0 ? styles.disabled : ''}`} disabled={page === totalPages}>{`>`}</button>
            </Link>
        </div>
    )
}
