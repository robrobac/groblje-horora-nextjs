import styles from '@/components/topComponents/top.module.scss'
import { StandardBtn } from '../buttons/standardBtn/StandardBtn'
import topImage from '../../../public/images/groblje-horora-top20-smeca-image.webp';
import Link from 'next/link';

export default function Worse20() {
    return (
        <div className={`${styles.topContainer} ${styles.reverse}`}>
            <div className={styles.topInfo}>
                <Link href={`/top20smeca`} target='_blank'>
                    <h2 className={styles.topTitle}>Top 20 smeća</h2>
                </Link>
                <p className={styles.topDescription}>
                    Filmovi na ovoj top listi su najveće smeće ikada. Linkove na recenzije možete pronaći na Top 20 smeća popisu.
                </p>
                <StandardBtn path={`/top20smeca`} content='Pročitaj više' newTab={true}/>
            </div>
            <div className={styles.topImage}>
                <Link href={`/top20smeca`} target='_blank'>
                    <img src={topImage.src} alt='movie-cover'></img>
                </Link>
            </div>
        </div>
    )
}
