import { handleLastVisitedURL } from '@/lib/utils';
import styles from '@/components/header/header.module.scss';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { auth } from '@/lib/firebase/config';
import useAuth from '@/hooks/useAuth';

export default function HeaderAuth() {
    const currentPath = usePathname();
    const searchParams = useSearchParams()
    const router = useRouter();

    const isLoggedIn = false;

    const { firebaseUser, mongoUser, isLoadingUser, logout} = useAuth()

    const handleAuthButton = () => {
        if (firebaseUser) {
            logout()
        }

        if (!firebaseUser) {
            handleLastVisitedURL(currentPath, searchParams);
            router.push('/prijava');
        }
    }


    return (

        <p className={styles.navAuth}>
            {firebaseUser ? mongoUser?.username : "Imaš komentar?"}
            <button className={styles.authButton} onClick={handleAuthButton}>
                {firebaseUser ? "Odjavi se" : "Prijavi se"}
            </button>
        </p>

    )


}
