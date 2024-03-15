'use client'

import Link from 'next/link'
import styles from './ogImageLink.module.scss'
import useAuth from '@/hooks/useAuth'

export default function OgImageLink({link, title, additionalPadding}) {
    const { user, mongoUser } = useAuth()

    if (user && mongoUser?.role === 'admin') {
        return (
            <div className={`${styles.ogImageLinkContainer} ${additionalPadding && styles.additionalPadding}`}>
                <div className={styles.ogImageLinkWrap}>
                    <Link className={styles.ogImageLink} href={link || '#'} target="_blank">
                        <img src={link} alt={`${title} Open Graph Image`} />
                    </Link>
                </div>
            </div>
        )
    } else return null
}
