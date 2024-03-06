import styles from '@/components/latest/latest.module.scss';
import { formatMongoDate } from '@/lib/utils';
import Link from 'next/link';
import { StandardBtn } from '../buttons/standardBtn/StandardBtn';

const getData = async () => {
    const res = await fetch(`${process.env.DOMAIN_URL}/api/latestPregled`, { next: { revalidate: 5 } });
    if (!res.ok) {
        throw new Error('Failed to fetch LatestQuad data');
    }
    return res.json();
}

export const LatestPregled = async () => {
    const data = await getData();

    return (
        <>
            {/* DESKTOP VERSION */}
            <article className={`${styles.latestPregledContainer} ${styles.desktopPregled}`}>
                <section className={styles.latestPregledInfo}>
                    <p className={styles.pregledSubTitle}>
                        Najnoviji Kratki Pregled <span>{formatMongoDate(data[0].createdAt)}</span>
                    </p>
                    <Link href={`/recenzije/${data[0].slug}`} target='_blank'>
                        <h2 className={styles.pregledTitle}>
                            {data[0].reviewTitle}
                        </h2>
                    </Link>
                    <p className={styles.pregledDescription}>
                        {data[0].movies[0].title} <span>({data[0].movies[0].year})</span>, {data[0].movies[1].title} <span>({data[0].movies[1].year})</span>, {data[0].movies[2].title} <span>({data[0].movies[2].year})</span>, {data[0].movies[3].title} <span>({data[0].movies[3].year})</span>
                    </p>
                </section>
                <Link href={`/recenzije/${data[0].slug}`} target='_blank'>
                    <section className={styles.quadCoverContainer}>
                        {data[0].movies.map((movie, index) => (
                            <figure className={styles.quadCoverImageContainer} key={movie._id}>
                                <img className={styles[`image${index}`]} src={movie.coverImage} alt={`${movie.title} cover image`}></img>
                            </figure>
                        ))}
                    </section>
                </Link>
                <StandardBtn path={`/recenzije/${data[0].slug}`} content='Pročitaj više' newTab={true}/>
            </article>


            {/* MOBILE VERSION, component reordered only. */}
            <article className={`${styles.latestPregledContainer} ${styles.mobilePregled}`}>
                <div className={styles.subtitleContainer}>
                    <p className={styles.pregledSubTitle}>
                        Najnoviji Kratki Pregled <span>{formatMongoDate(data[0].createdAt)}</span>
                    </p>
                </div>
                <Link href={`/recenzije/${data[0].slug}`} target='_blank'>
                    <section className={styles.quadCoverContainer}>
                        {data[0].movies.map((movie, index) => (
                            <figure className={styles.quadCoverImageContainer} key={movie._id}>
                                <img className={styles[`image${index}`]} src={movie.coverImage} alt={`${movie.title} cover image`}></img>
                            </figure>
                        ))}
                    </section>
                </Link>
                <section className={styles.latestPregledInfo}>
                    <Link href={`/recenzije/${data[0].slug}`} target='_blank'>
                        <h2 className={styles.pregledTitle}>
                            {data[0].reviewTitle}
                        </h2>
                    </Link>
                    <p className={styles.pregledDescription}>
                        {data[0].movies[0].title} <span>({data[0].movies[0].year})</span>, {data[0].movies[1].title} <span>({data[0].movies[1].year})</span>, {data[0].movies[2].title} <span>({data[0].movies[2].year})</span>, {data[0].movies[3].title} <span>({data[0].movies[3].year})</span>
                    </p>
                </section>
                <div className={styles.buttonContainer}>
                    <StandardBtn path={`/recenzije/${data[0].slug}`} content='Pročitaj više' newTab={true}/>
                </div>
            </article>
        </>
    )
}