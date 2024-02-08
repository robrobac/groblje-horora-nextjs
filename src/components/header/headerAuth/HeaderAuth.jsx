import { handleLastVisitedURL } from '@/lib/utils';
import styles from '@/components/header/header.module.scss';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react'

export default function HeaderAuth() {
    const currentPath = usePathname();
    const searchParams = useSearchParams()
    console.log(searchParams)

    return (
        <p className={styles.navAuth}>
                            Imaš komentar?
                            <Link href='/prijava' className={styles.authButton} onClick={(e) => handleLastVisitedURL(currentPath, searchParams)}>
                                Prijavi se
                            </Link>
                        </p>
    )
}
