import { sortedTags } from "@/lib/tags";
import styles from '../../components/singleReview/tagDisplay/tagDisplay.module.scss'
import Link from "next/link";
import TitleSubtitle from "@/components/reviewsGallery/titleSubtitle/TitleSubtitle";

const tags = sortedTags;

export const metadata = {
    title: "Oznake",
    description: tags.map(singleTag => singleTag.tagLabel).join(', '),
};

const TagsPage = async () => {
    const tags = sortedTags;

    return (
        <main style={{minHeight: "80vh"}}>
            <TitleSubtitle
                title={metadata.title}
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
