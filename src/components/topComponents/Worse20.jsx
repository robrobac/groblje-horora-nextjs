import styles from '@/components/topComponents/top.module.scss'
import { StandardBtn } from '../buttons/standardBtn/StandardBtn'
import topImage from '../../../public/images/groblje-horora-top20-smeca-image.jpg';
import Link from 'next/link';
import Image from 'next/image';

export default function Worse20() {
    return (
        <article className={`${styles.topContainer} ${styles.reverse}`}>
            <section className={styles.topInfo}>
                <Link href={`/top20smeca`}>
                    <h3 className={styles.topTitle}>Top 20 smeća</h3>
                </Link>
                <p className={styles.topDescription}>
                    Filmovi na ovoj top listi su najveće smeće ikada. Linkove na recenzije možete pronaći na Top 20 smeća popisu.
                </p>
                <StandardBtn path={`/top20smeca`} content='Pročitaj više' newTab={false}/>
            </section>
            <figure className={styles.topImage}>
                <Link href={`/top20smeca`}>
                    <Image src={topImage} alt='Groblje Horora Top 20 Smeća Naslovna Slika'></Image>
                </Link>
            </figure>
        </article>
    )
}
