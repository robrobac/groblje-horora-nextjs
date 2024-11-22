import styles from '@/components/latest/latest.module.scss';
import { formatMongoDate } from '@/lib/utils';
import Link from 'next/link';
import { StandardBtn } from '../buttons/standardBtn/StandardBtn';
import Image from 'next/image';

export const LatestPregled = async ({data}) => {
    return (
        <>
            {/* DESKTOP VERSION */}
            <article className={`${styles.latestPregledContainer} ${styles.desktopPregled}`}>
                <section className={styles.latestPregledInfo}>
                    <p className={styles.pregledSubTitle}>
                        Najnoviji Kratki Pregled <span>{formatMongoDate(data[0].createdAt)}</span>
                    </p>
                    <Link href={`/recenzije/${data[0].slug}`}>
                        <h3 className={styles.pregledTitle}>
                            {data[0].reviewTitle}
                        </h3>
                    </Link>
                    <p className={styles.pregledDescription}>
                        {data[0].movies[0].title} <span>({data[0].movies[0].year})</span>, {data[0].movies[1].title} <span>({data[0].movies[1].year})</span>, {data[0].movies[2].title} <span>({data[0].movies[2].year})</span>, {data[0].movies[3].title} <span>({data[0].movies[3].year})</span>
                    </p>
                </section>
                <Link href={`/recenzije/${data[0].slug}`}>
                    <section className={styles.quadCoverContainer}>
                        {data[0].movies.map((movie, index) => (
                            <figure className={styles.quadCoverImageContainer} key={movie._id}>
                                <Image width={300} height={472.5} className={styles[`image${index}`]} src={movie.coverImage} alt={`Naslovna slika horor filma ${movie.title}(${movie.year}), najnoviji kratki pregled pogledanog`}></Image>
                            </figure>
                            
                        ))}
                    </section>
                </Link>
                <StandardBtn path={`/recenzije/${data[0].slug}`} content='Pročitaj više' newTab={false}/>
            </article>


            {/* MOBILE VERSION, component reordered only. */}
            <article className={`${styles.latestPregledContainer} ${styles.mobilePregled}`}>
                <div className={styles.subtitleContainer}>
                    <p className={styles.pregledSubTitle}>
                        Najnoviji Kratki Pregled <span>{formatMongoDate(data[0].createdAt)}</span>
                    </p>
                </div>
                <Link href={`/recenzije/${data[0].slug}`}>
                    <section className={styles.quadCoverContainer}>
                        {data[0].movies.map((movie, index) => (
                            <figure className={styles.quadCoverImageContainer} key={movie._id}>
                                <Image width={212.5} height={324.3} className={styles[`image${index}`]} src={movie.coverImage} alt={`Naslovna slika horor filma ${movie.title}(${movie.year}), najnoviji kratki pregled pogledanog`}></Image>
                            </figure>
                        ))}
                    </section>
                </Link>
                <section className={styles.latestPregledInfo}>
                    <Link href={`/recenzije/${data[0].slug}`}>
                        <h3 className={styles.pregledTitle}>
                            {data[0].reviewTitle}
                        </h3>
                    </Link>
                    <p className={styles.pregledDescription}>
                        {data[0].movies[0].title} <span>({data[0].movies[0].year})</span>, {data[0].movies[1].title} <span>({data[0].movies[1].year})</span>, {data[0].movies[2].title} <span>({data[0].movies[2].year})</span>, {data[0].movies[3].title} <span>({data[0].movies[3].year})</span>
                    </p>
                </section>
                <div className={styles.buttonContainer}>
                    <StandardBtn path={`/recenzije/${data[0].slug}`} content='Pročitaj više' newTab={false}/>
                </div>
            </article>
        </>
    )
}