import JsonLd from "@/components/JsonLd";
import { HomepageCover } from "@/components/homepageCover/HomepageCover";
import { Introduction } from "@/components/introduction/Introduction";
import { LatestPregled } from "@/components/latest/LatestPregled";
import { LatestRecenzija } from "@/components/latest/LatestRecenzija";
import { RecenzijeComponent } from "@/components/recenzijeComponent/RecenzijeComponent";
import Top25 from "@/components/topComponents/Top25";
import Worse20 from "@/components/topComponents/Worse20";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Groblje Horora | Recenzije Horor Filmova",
    description: 'Blog "Groblje horrora" napravljen je negdje u lipnju 2007. godine, a njegova namjena je prikaz dnevnika autora koji kako pogleda neki horror, tako baci omanji osvrt ili recenziju na određeni film. Moje ime je Bruno Koić i po struci sam magistar medijske kulture i kulturologije. Nadam se da će ti se svidjeti koncept onoga što radim i tebi prikazujem, hvala ti na posjeti!',
    openGraph: {
        title: "Groblje Horora | Recenzije Horor Filmova",
        description: 'Blog "Groblje horrora" napravljen je negdje u lipnju 2007. godine, a njegova namjena je prikaz dnevnika autora koji kako pogleda neki horror, tako baci omanji osvrt ili recenziju na određeni film. Moje ime je Bruno Koić i po struci sam magistar medijske kulture i kulturologije. Nadam se da će ti se svidjeti koncept onoga što radim i tebi prikazujem, hvala ti na posjeti!',
        images: "https://firebasestorage.googleapis.com/v0/b/groblje-horora-89186.appspot.com/o/openGraph%2Fnaslovna-open-graph-image.jpg?alt=media&token=f3353588-ef68-4322-9b07-81deece6b70d",
    },
    alternates: {
        canonical: `${process.env.DOMAIN_URL}`,
    }
};

const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "https://www.groblje-horora.com/",
    "sameAs": [
        "https://www.facebook.com/recenzijefilmova.blog.hr/",
    ],
    "logo": "https://firebasestorage.googleapis.com/v0/b/groblje-horora-89186.appspot.com/o/organisation-logo.jpg?alt=media&token=8d26d941-2799-4cc2-8db9-48bec1b9cb3d",
    "name": "Groblje Horora",
    "alternateName": "Groblje Horora",
    "description": 'Blog "Groblje horrora" napravljen je negdje u lipnju 2007. godine, a njegova namjena je prikaz dnevnika autora koji kako pogleda neki horror, tako baci omanji osvrt ili recenziju na određeni film.',
    "founder": "Bruno Koić",
    "foundingDate": "2007-08-20",
    "email": "bruno.koic1@gmail.com"
}

export default function Naslovna() {
    console.log(structuredData)
    return (
        <main>
            <HomepageCover />
            <Introduction />
            <LatestPregled />
            <LatestRecenzija />
            <Top25 />
            <RecenzijeComponent />
            <Worse20 />
            <JsonLd data={structuredData}/>
        </main>
    );
}
