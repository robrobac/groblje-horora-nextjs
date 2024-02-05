import styles from '@/components/topComponents/top.module.scss'
import { StandardBtn } from '../buttons/standardBtn/StandardBtn'
import topImage from '../../../public/images/groblje-horora-top25-image.webp';
import Link from 'next/link';


export default function Top25() {
    console.log(topImage.src)
    return (
        <div className={styles.topContainer}>
            <div className={styles.topImage}>
                <Link href={`/top25`} target='_blank'>
                    <img src={topImage.src} alt='top 25 preporuka image'></img>
                </Link>
            </div>
            <div className={styles.topInfo}>
                <Link href={`/top25`} target='_blank'>
                    <h2 className={styles.topTitle}>Top 25 preporuka</h2>
                </Link>
                <p className={styles.topDescription}>
                    Filmovi na ovoj top listi mijenjaju se kako dođe neki novi naslov na blogu koji zaslužuje jednaku pažnju ili ocjenu. Linkove na recenzije možete pronaći na Top 25 popisu.
                </p>
                <StandardBtn path={`/top25`} content='Pročitaj više' newTab={true}/>
            </div>
        </div>
    )
}
