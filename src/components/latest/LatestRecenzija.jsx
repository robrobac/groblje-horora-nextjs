import Link from "next/link";
import styles from '@/components/latest/latest.module.scss';
import { Rating } from "../rating/Rating";
import { StandardBtn } from "../buttons/standardBtn/StandardBtn";
import { formatMongoDate } from "@/lib/utils";
import Image from "next/image";

export const LatestRecenzija = async ({data}) => {
    return (
        <>
            {/* DESKTOP VERSION */}
            <article className={`${styles.latestRecenzijaContainer} ${styles.desktopRecenzija}`}>
                <div className={styles.latestSingleInfo}>
                    <p className={styles.recenzijaSubTitle}>
                        Najnovija Recenzija <span>{formatMongoDate(data[0].createdAt)}</span>
                    </p>
                    <section className={styles.titleAndRating}>
                        <Link href={`/recenzije/${data[0].slug}`}>
                            <h3 className={styles.recenzijaTitle}>
                                {data[0].movies[0].title} <span>({data[0].movies[0].year})</span>
                            </h3>
                        </Link>
                        <Rating rating={data[0].movies[0].rating} detailed={true} />
                        <p className={styles.recenzijaDescription}>{data[0].shortDescription}</p>
                    </section>
                    <StandardBtn path={`/recenzije/${data[0].slug}`} content='Pročitaj više' newTab={false}/>
                </div>
                <Link href={`/recenzije/${data[0].slug}`}>
                    <figure className={styles.latestSingleImage}>
                        <Image width={300} height={440} src={data[0].movies[0].coverImage} alt={`Naslovna slika horor filma ${data[0].movies[0].title}(${data[0].movies[0].year}), najnovija recenzija`}></Image>
                    </figure>
                </Link>
            </article>
            

            {/* MOBILE VERSION, component reordered only. */}
            <article className={`${styles.latestRecenzijaContainer} ${styles.mobileRecenzija}`}>
                <p className={styles.recenzijaSubTitle}>
                    Najnovija Recenzija <span>{formatMongoDate(data[0].createdAt)}</span>
                </p>
                <div className={styles.latestSingleInfo}>
                    <Link href={`/recenzije/${data[0].slug}`} className={styles.latestRecenzijaLink}>
                        <figure className={styles.latestSingleImage}>
                            <Image width={425} height={623} src={data[0].movies[0].coverImage} alt={`Naslovna slika horor filma ${data[0].movies[0].title}(${data[0].movies[0].year}), najnovija recenzija`} ></Image>
                        </figure>
                    </Link>
                    <section className={styles.titleAndRating}>
                        <Link href={`/recenzije/${data[0].slug}`}>
                            <h3 className={styles.recenzijaTitle}>
                                {data[0].movies[0].title} <span>({data[0].movies[0].year})</span>
                            </h3>
                        </Link>
                        <Rating rating={data[0].movies[0].rating} detailed={true} />
                        <p className={styles.recenzijaDescription}>{data[0].shortDescription}</p>
                    </section>
                    <div className={styles.buttonContainer}>
                        <StandardBtn path={`/recenzije/${data[0].slug}`} content='Pročitaj više' newTab={false}/>
                    </div>
                </div>
            </article>
        </>
    )
}