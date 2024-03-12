'use client'

import styles from '@/components/newPostButtons/newPostButtons.module.scss';
import buttonStyles from '@/components/buttons/buttons.module.scss';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';

export default function NewPostButtons() {
    const { user, mongoUser } = useAuth()

    if (user && mongoUser?.role === 'admin') {
        return (
            <div className={styles.newPostButtonsContainer}>
            <div className={styles.buttonsWrap}>
                <Link href={'/nova-recenzija'} target='_blank'>
                    <button className={`${buttonStyles.button} ${buttonStyles.smallButton}`}>Nova Recenzija</button>
                </Link>
                <Link href={'/novi-kratki-pregled'} target='_blank'>
                    <button className={`${buttonStyles.button} ${buttonStyles.smallButton}`}>Novi Kratki Pregled</button>
                </Link>
            </div>
            </div>
        )
    } else return null
}

