import Link from "next/link";
import styles from '@/components/latest/latest.module.scss';
import { Rating } from "../rating/Rating";
import { StandardBtn } from "../buttons/standardBtn/StandardBtn";
import { formatMongoDate, getRawContent } from "@/lib/utils";
import { getLatestRecenzija } from "@/lib/data/latestData";

const getData = async () => {
    const res = await fetch(`${process.env.DOMAIN_URL}/api/latestRecenzija`);
    if (!res.ok) {
        throw new Error('Failed to fetch LatestSingle data');
    }
    return res.json();
}

// const shortenDescription = async (description) => {
//     const data = await getData()
//     const formattedDescription = getRawContent(description);
//     const descriptionWithoutImages = formattedDescription.replace(/<img[^>]*>/g, '');
//     const descriptionWithoutTags = descriptionWithoutImages.replace(/<\/?[a-z][a-z0-9]*[^<>]*>/ig, '');
//     const words = descriptionWithoutTags.split(' ');
//     const shortenedDescription = words.slice(0, 100).join(' ');
//     return shortenedDescription;
// }

export const LatestRecenzija = async () => {
    const data = await getData();
    const data2 = await getLatestRecenzija();
    // const shortDescription = await shortenDescription(data[0].movies[0].reviewContent)

    return (
        <>
            {/* DESKTOP VERSION */}
            <div className={`${styles.latestRecenzijaContainer} ${styles.desktopRecenzija}`}>
                <div className={styles.latestSingleInfo}>
                    <p className={styles.recenzijaSubTitle}>
                        Najnovija Recenzija <span>{formatMongoDate(data[0].createdAt)}</span>
                    </p>
                    <div className={styles.titleAndRating}>
                        <Link href={`/recenzije/${data[0].slug}`} target='_blank'>
                            <h2 className={styles.recenzijaTitle}>
                                {data[0].movies[0].title} <span>({data[0].movies[0].year})</span>
                            </h2>
                        </Link>
                        <Rating rating={data[0].movies[0].rating} detailed={true} />
                        <p className={styles.recenzijaDescription} dangerouslySetInnerHTML={{__html: 'shortDescription'}}/>
                    </div>
                    <StandardBtn path={`/recenzije/${data[0].slug}`} content='Pročitaj više' newTab={true}/>
                </div>
                <Link href={`/recenzije/${data[0].slug}`} target='_blank'>
                    <div className={styles.latestSingleImage}>
                        <img src={data[0].movies[0].coverImage} alt='movie-cover'></img>
                    </div>
                </Link>
            </div>


            {/* MOBILE VERSION, component reordered only. */}
            <div className={`${styles.latestRecenzijaContainer} ${styles.mobileRecenzija}`}>
                <p className={styles.recenzijaSubTitle}>
                    Najnovija Recenzija <span>{formatMongoDate(data[0].createdAt)}</span>
                </p>
                <div className={styles.latestSingleInfo}>
                    <Link href={`/recenzije/${data[0].slug}`} style={{display: 'flex'}} target='_blank'>
                        <div className={styles.latestSingleImage}>
                            <img src={data[0].movies[0].coverImage} alt='movie-cover' ></img>
                        </div>
                    </Link>
                    <div className={styles.titleAndRating}>
                        <Link href={`/recenzije/${data[0].slug}`} target='_blank'>
                            <h2 className={styles.recenzijaTitle}>
                                {data[0].movies[0].title} <span>({data[0].movies[0].year})</span>
                            </h2>
                        </Link>
                        <Rating rating={data[0].movies[0].rating} detailed={true} />
                        <p className={styles.recenzijaDescription} dangerouslySetInnerHTML={{__html: 'shortDescription'}}/>
                    </div>
                    <div className={styles.buttonContainer}>
                        <StandardBtn path={`/recenzije/${data[0].slug}`} content='Pročitaj više' newTab={true}/>
                    </div>
                </div>
            </div>
        </>
    )
}