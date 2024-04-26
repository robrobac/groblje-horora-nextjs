'use server'
import pageStyles from "@/app/recenzije/[slug]/page.module.scss"
import styles from "@/components/singleReview/movie/movie.module.scss";
import { format } from "date-fns";
import { Rating } from "@/components/rating/Rating";
import { getRawContent } from "@/lib/utils";
import EditDeleteButtonsSingle from "@/components/editDeleteButton/EditDeleteButtonsSingle";
import SocialShare from "../socialShare/SocialShare";
import TagDisplay from "../tagDisplay/TagDisplay";
import imdbLogo from '../../../../public/images/imdblogo.png';
import Link from "next/link";
import OgImageLink from "../ogImageLink/OgImageLink";
import Image from "next/image";
import ViewCounter from "@/components/ViewCounter";

export const Movie = ({data, movie, id, index, slug}) => {

    return (
        <article className={styles.movieContainer} id={id}>
            {data.reviewType === 'single' ? (
                <div className={styles.movieInfo}>
                    <figure className={styles.movieImage}>
                        <Image priority={true} width={400} height={579.5} src={movie.coverImage} alt={`${movie.title} cover image`}></Image>
                    </figure>
                    <EditDeleteButtonsSingle post={data}/>
                    <p className={pageStyles.reviewDate}>
                    <ViewCounter slug={slug} /> - objavljeno {format(new Date(data?.createdAt), 'dd.MM.yyyy')}
                    </p>
                    <h1 className={pageStyles.titleH1}>{movie.title} <span>({movie.year})</span></h1>
                    <Rating rating={movie.rating} detailed={true}/>
                </div>
            ) : (
                <div className={styles.movieInfo}>
                    <figure className={styles.movieImage}>
                        <Image width={400} height={579.5} src={movie.coverImage} alt={`${movie.title} cover image`}></Image>
                    </figure>
                    <h2 className={pageStyles.titleH2}>{movie.title} <span>({movie.year})</span></h2>
                    <Rating rating={movie.rating} detailed={true}/>
                </div>
            )}
            <div className={styles.readingSection}>
                <section className={styles.readingContent} dangerouslySetInnerHTML={{__html: getRawContent(movie.reviewContent)}}/>
            </div>
            <Link className={styles.imdbLink} href={movie.imdbLink} target="_blank">
                <Image width={59} height={30} src={imdbLogo.src} alt="imdb logo"></Image>
            </Link>
            {movie.tags.length > 0 && <TagDisplay tags={movie.tags}/>}
            <SocialShare slug={data?.slug} reviewType={data?.reviewType} index={index} title={movie.title}/>
            <OgImageLink link={movie.singleOgImage} title={movie.title} />
            <hr className={styles.movieDivider}></hr>
        </article>
    )
}