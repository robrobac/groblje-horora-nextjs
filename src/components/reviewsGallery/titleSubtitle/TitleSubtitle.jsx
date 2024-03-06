import styles from '@/components/reviewsGallery/titleSubtitle/titleSubtitle.module.scss';

export default function TitleSubtitle({title, subtitle}) {
    return (
        <section className={styles.reviewsTitleContainer}>
            <h1>{title}</h1>
            <p>{subtitle}</p>
        </section>
    )
}
