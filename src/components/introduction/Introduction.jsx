import styles from '@/components/introduction/introduction.module.scss';
import { Creepster } from "next/font/google";

const creepster = Creepster({ subsets: ["latin"], weight: '400' });

export const Introduction = () => {

    return (
        <section className={styles.introductionContainer}>
            <h1 className={`${creepster.className} ${styles.coverTitleMobile}`}>Groblje Horora</h1>
            <h2 className={styles.coverSubtitleMobile}>Recenzije Horor Filmova i Serija</h2>
            <p className={styles.subTitleParagraph}>Blog <strong>&quot;Groblje horrora&quot;</strong> napravljen je negdje u lipnju 2007. godine, a njegova namjena je prikaz dnevnika autora koji kako pogleda neki horror, tako baci omanji osvrt ili recenziju na određeni film. Moje ime je <strong>Bruno Koić</strong> i po struci sam magistar medijske kulture i kulturologije. Nadam se da će ti se svidjeti koncept onoga što radim i tebi prikazujem, hvala ti na posjeti!</p>
        </section>
    )
}