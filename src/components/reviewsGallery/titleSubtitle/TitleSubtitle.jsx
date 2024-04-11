import styles from '@/components/reviewsGallery/titleSubtitle/titleSubtitle.module.scss';
import Link from "next/link";

export default function TitleSubtitle({title, subtitle, link, linkText}) {
    return (
        <section className={styles.reviewsTitleContainer}>
            <h1>{title}</h1>
            <p>{subtitle}</p>
            {link && 
                <Link className={styles.backLink} href={link}>{linkText}</Link>
            }
        </section>
    )
}
