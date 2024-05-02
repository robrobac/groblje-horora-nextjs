import styles from './page.module.scss'
import Link from "next/link";
import TitleSubtitle from "@/components/reviewsGallery/titleSubtitle/TitleSubtitle";
import Footer from '@/components/footer/footer';

export const dynamic = 'force-dynamic';

const getData = async () => {
    const res = await fetch(`${process.env.DOMAIN_URL}/api/tags`);
    // console.log(`Tags counted`) // Keep in Development
    
    if (!res.ok) {
        throw new Error(`Failed to count tags`);
    }
    return res.json();
}

export const generateMetadata = async () => {
    const tags = await getData();

    // console.log(`Oznake: ${tags.map(singleTag => singleTag.tagLabel).join(', ')}`) // Keep in Development

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
    const tags = await getData();

    return (
        <>
        <main className={styles.tagsPageContainer}>
            <TitleSubtitle
                title={"Oznake"}
                subtitle={"Ovdje možeš pogledati sve oznake koje koristim. Klikni na bilo koju oznaku da vidiš sve recenzije označene tom oznakom"}
            />
            <div className={styles.tagsList}>
                {tags.map(tag =>
                    <Link prefetch={true} href={`${process.env.DOMAIN_URL}/tags/${tag.tagValue}?page=1`} key={tag.tagValue}>
                        <p className={`${styles.tag}`}>{tag.tagLabel} <span>({tag.tagCount})</span></p>
                    </Link>
                )}
            </div>          
        </main>
        <Footer />
        </>
    );
};

export default TagsPage;
