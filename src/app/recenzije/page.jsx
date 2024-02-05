import styles from "@/app/recenzije/page.module.scss";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Recenzije",
    description: "Na ovoj stranici pronađite sve recenzije i kratke preglede od 2007. godine do danas. Koristeći pretraživač filtrirajte, sortirajte, pretražite i pronađite željeni horor film. Ne zamjerite na svim recenzijama za filmove koje su napisane u ranoj fazi bloga, tamo od 2007. do 2010., tada sam bio klinjo od svega 14-15 godina.",
};

const getData = async () => {
    const res = await fetch(`${process.env.DOMAIN_URL}/api/reviews?page=1&sort=createdAt&order=desc`);
    console.log("Reviews data fetched")
    if (!res.ok) {
        throw new Error('Failed to fetch Reviews data');
    }
    return res.json();
}

const RecenzijePage = async () => {
    const data = await getData();
    console.log(data)
    
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
