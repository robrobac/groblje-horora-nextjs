import styles from "@/app/recenzije/page.module.scss";
import NewPostButtons from "@/components/newPostButtons/NewPostButtons";
import ReviewsGallery from "@/components/reviewsGallery/ReviewsGallery";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Recenzije",
    description: "Na ovoj stranici pronađite sve recenzije i kratke preglede od 2007. godine do danas. Koristeći pretraživač filtrirajte, sortirajte, pretražite i pronađite željeni horor film. Ne zamjerite na svim recenzijama za filmove koje su napisane u ranoj fazi bloga, tamo od 2007. do 2010., tada sam bio klinjo od svega 14-15 godina.",
};

const RecenzijePage = () => {
    return (
        <main className="reviewsContainer">
            <div className={styles.reviewsTitleContainer}>
                <h1>{metadata.title}</h1>
                <p>{metadata.description}</p>
            </div>
            <NewPostButtons />
            <ReviewsGallery />
            
        </main>
    );
};

export default RecenzijePage;
