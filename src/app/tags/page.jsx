import { sortedTags } from "@/lib/tags";
import styles from './page.module.scss'
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
        <main className={styles.tagsPageContainer}>
            <TitleSubtitle
                title={"Oznake"}
                subtitle={"Ovdje možeš pogledati sve oznake koje koristim. Klikni na bilo koju oznaku da vidiš sve recenzije označene tom oznakom"}
            />
            <div className={styles.tagsList}>
                {tags.map(tag =>
                    <Link href={`${process.env.DOMAIN_URL}/tags/${tag.tagValue}`} key={tag.tagValue}>
                        <p className={`${styles.tag}`}>{tag.tagLabel}</p>
                    </Link>
                )}
            </div>          
        </main>
    );
};

export default TagsPage;
