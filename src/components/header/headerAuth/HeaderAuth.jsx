import { handleLastVisitedURL } from '@/lib/utils';
import styles from '@/components/header/header.module.scss';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { auth } from '@/lib/firebase/config';
import useAuth, { logout } from '@/hooks/useAuth';

export default function HeaderAuth() {
    const currentPath = usePathname();
    const searchParams = useSearchParams()
    const router = useRouter();

    const isLoggedIn = false;

    const { user, mongoUser } = useAuth()
    console.log(user, mongoUser)

    const handleAuthButton = () => {
        if (user) {
            logout()
        }

        if (!user) {
            handleLastVisitedURL(currentPath, searchParams);
            router.push('/prijava');
        }
    }


    return (

        <p className={styles.navAuth}>
            {user ? user?.displayName : "Imaš komentar?"}
            <button className={`${styles.authButton} ${user ? styles.logoutButton : ""}`} onClick={handleAuthButton}>
                {user ? "Odjavi se" : "Prijavi se"}
            </button>
        </p>

    )


}
