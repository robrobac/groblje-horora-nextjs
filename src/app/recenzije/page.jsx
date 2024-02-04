import styles from "@/app/recenzije/page.module.scss";

export const metadata = {
    title: "Recenzije",
    description: "Recenzije Description",
};

const RecenzijePage = () => {
    return (
        <main className={styles.reviewsContainer}>
            <div className={styles.reviewsTitleContainer}>
                <h1>Recenzije</h1>
                <p>Na ovoj stranici pronađite sve recenzije i kratke preglede od 2007. godine do danas. Koristeći pretraživač filtrirajte, sortirajte, pretražite i pronađite željeni horor film. Ne zamjerite na svim recenzijama za filmove koje su napisane u ranoj fazi bloga, tamo od 2007. do 2010., tada sam bio klinjo od svega 14-15 godina.</p>
            </div>
        </main>
    );
};

export default RecenzijePage;
