import styles from '@/components/topComponents/top.module.scss'
import { StandardBtn } from '../buttons/standardBtn/StandardBtn'
import topImage from '../../../public/images/groblje-horora-top25-image.jpg';
import Link from 'next/link';
import Image from 'next/image';

export default async function Top25() {
    

    return (
        <article className={styles.topContainer}>
            <figure className={styles.topImage}>
                <Link href={`/top25`} target='_blank'>
                    <Image src={topImage} alt='top 25 preporuka, izrezbarena bundeva u mraku'></Image>
                </Link>
            </figure>
            <section className={styles.topInfo}>
                <Link href={`/top25`} target='_blank'>
                    <h2 className={styles.topTitle}>Top 25 preporuka</h2>
                </Link>
                <p className={styles.topDescription}>
                    Filmovi na ovoj top listi mijenjaju se kako dođe neki novi naslov na blogu koji zaslužuje jednaku pažnju ili ocjenu. Linkove na recenzije možete pronaći na Top 25 popisu.
                </p>
                <StandardBtn path={`/top25`} content='Pročitaj više' newTab={true}/>
            </section>
        </article>
    )
}
