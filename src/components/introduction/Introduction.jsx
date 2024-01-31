import styles from '@/components/introduction/introduction.module.scss';

export const Introduction = () => {

    return (
        <div className={styles.introductionContainer}>
            <h1 >Groblje Horora</h1>
            <p>Blog <strong>&quot;Groblje horrora&quot;</strong> napravljen je negdje u lipnju 2007. godine, a njegova namjena je prikaz dnevnika autora koji kako pogleda neki horror, tako baci omanji osvrt ili recenziju na određeni film. Moje ime je <strong>Bruno Koić</strong> i po struci sam magistar medijske kulture i kulturologije. Nadam se da će ti se svidjeti koncept onoga što radim i tebi prikazujem, hvala ti na posjeti!</p>
        </div>
    )
}