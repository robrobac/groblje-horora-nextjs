import { sortedTags } from "@/lib/tags";
import styles from '../../components/singleReview/tagDisplay/tagDisplay.module.scss'
import Link from "next/link";
import TitleSubtitle from "@/components/reviewsGallery/titleSubtitle/TitleSubtitle";

export const generateMetadata = async () => {
    const tags = sortedTags;

    return {
        title: "Oznake | Groblje Horora",
        description: `Oznake: ${tags.map(singleTag => singleTag.tagLabel).join(', ')}`,
        openGraph: {
            title: "Oznake | Groblje Horora",
            description: `Oznake: ${tags.map(singleTag => singleTag.tagLabel).join(', ')}`,
            images: "https://firebasestorage.googleapis.com/v0/b/groblje-horora-89186.appspot.com/o/openGraph%2Fnaslovna-open-graph-image.jpg?alt=media&token=f3353588-ef68-4322-9b07-81deece6b70d",
        },
        alternates: {
            canonical: `${process.env.DOMAIN_URL}/tags`
        }
    }
}

const TagsPage = async () => {
    const tags = sortedTags;

    return (
        <main style={{minHeight: "80vh"}}>
            <TitleSubtitle
                title={"Oznake"}
                // subtitle={metadata.description}
            />
            <div className={styles.tagDisplaySection}>
                <div className={styles.tags}>
                    {tags.map(tag =>
                        <Link href={`${process.env.DOMAIN_URL}/tags/${tag.tagValue}`} target="_blank" key={tag.tagValue}>
                            <p className={`${styles.tag} ${styles.selected}`}>{tag.tagLabel}</p>
                        </Link>
                    )}
                </div>
                    
            </div>
        </main>
    );
};

export default TagsPage;
