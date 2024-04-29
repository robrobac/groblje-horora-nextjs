import Link from 'next/link';
import styles from './not-found.module.scss'
import Footer from '@/components/footer/footer';

const NotFound = () => {
    return (
        <>
        <div className={styles.glitchContainer}>
            <div title="404" className={styles.glitch} style={{fontSize: '100px'}}>404</div>
            <div title="404" className={styles.glitch} style={{fontSize: '20px'}}>Stranica nije pronađena</div>
            <Link href={'/'}>
            <div title="404" className={`${styles.glitch} ${styles.clickable}`} style={{fontSize: '20px'}}>Povratak na Naslovnu</div>
            </Link>
        </div>
        <Footer />
        </>
    )
}

export default NotFound;