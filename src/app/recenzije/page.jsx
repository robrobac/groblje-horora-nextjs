import styles from "@/app/recenzije/page.module.scss";
import NewPostButtons from "@/components/newPostButtons/NewPostButtons";
import ReviewsGallery from "@/components/reviewsGallery/ReviewsGallery";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Recenzije | Groblje Horora",
    description: "Na ovoj stranici pronađite sve recenzije i kratke preglede od 2007. godine do danas. Koristeći pretraživač filtrirajte, sortirajte, pretražite i pronađite željeni horor film. Ne zamjerite na svim recenzijama za filmove koje su napisane u ranoj fazi bloga, tamo od 2007. do 2010., tada sam bio klinjo od svega 14-15 godina.",
    openGraph: {
        title: "Recenzije | Groblje Horora",
        description: "Na ovoj stranici pronađite sve recenzije i kratke preglede od 2007. godine do danas. Koristeći pretraživač filtrirajte, sortirajte, pretražite i pronađite željeni horor film. Ne zamjerite na svim recenzijama za filmove koje su napisane u ranoj fazi bloga, tamo od 2007. do 2010., tada sam bio klinjo od svega 14-15 godina.",
        images: "https://firebasestorage.googleapis.com/v0/b/groblje-horora-89186.appspot.com/o/openGraph%2Frecenzije-open-graph-image.jpg?alt=media&token=dbc97be8-c43a-4fc2-b8a8-61681c1762fe",
    },
    alternates: {
        canonical: `${process.env.DOMAIN_URL}/recenzije`,
    }
};

const RecenzijePage = () => {
    return (
        <main className="reviewsContainer">
            <section className={styles.reviewsTitleContainer}>
                <h1>{metadata.title}</h1>
                <p>{metadata.description}</p>
            </section>
            <NewPostButtons />
            <ReviewsGallery />
        </main>
    );
};

export default RecenzijePage;
