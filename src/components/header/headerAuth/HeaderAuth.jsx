import { handleLastVisitedURL } from '@/lib/utils';
import styles from '@/components/header/header.module.scss';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

export default function HeaderAuth() {
    const currentPath = usePathname();
    const searchParams = useSearchParams()
    const router = useRouter();

    const isLoggedIn = false;

    const handleAuthButton = () => {
        if (isLoggedIn) {
            // Logout functionality
        }

        if (!isLoggedIn) {
            handleLastVisitedURL(currentPath, searchParams);
            router.push('/prijava');
        }
    }


    return (

        <p className={styles.navAuth}>
            {isLoggedIn ? "Robac" : "Imaš komentar?"}
            <button className={styles.authButton} onClick={handleAuthButton}>
                {isLoggedIn ? "Odjavi se" : "Prijavi se"}
            </button>
        </p>

    )


}
