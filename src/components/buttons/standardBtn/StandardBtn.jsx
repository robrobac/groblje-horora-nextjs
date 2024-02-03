import styles from '@/components/buttons/buttons.module.scss';
import Link from "next/link"

export const StandardBtn = ({path, content, type, span, newTab}) => {

    if (type === 'textOnly') {
        return (
            <Link href={path} target={newTab ? '_blank' : '_self'} style={{textAlign: 'right'}}>
                <button className={`${styles.button} ${styles.textButton}`}>{content}</button>
            </Link>
        )
    }

    if (type === 'right') {
        return (
            <Link href={path} target={newTab ? '_blank' : '_self'}>
                <button className={styles.button}>{content} <span>{span}</span></button>
            </Link>
        )
    }

    else {
        return (
            <Link style={{width: '100%'}} href={path} target={newTab ? '_blank' : '_self'}>
                <button className={styles.button}>{content} <span>{span}</span></button>
            </Link>
        )
    }
}