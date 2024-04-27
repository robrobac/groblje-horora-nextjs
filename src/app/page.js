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

export default function Naslovna() {
    const post = {
        title: 'How to Add JSON-LD Structured Data to a Next.js Website',
        description: 'Learn how to improve your Next.js website\'s SEO by adding JSON-LD structured data.',
        datePublished: '2024-03-23',
        author: {
          "@type": "Person",
          "name": "John Doe"
        },
        image: "https://via.placeholder.com/800x400",
        publisher: {
          "@type": "Organization",
          "name": "My Blog",
          "logo": {
            "@type": "ImageObject",
            "url": "https://via.placeholder.com/200x100"
          }
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://www.example.com/blog/how-to-add-json-ld-to-next-js"
        }
      };
    return (
        <main>
            <HomepageCover />
            <Introduction />
            <LatestPregled />
            <LatestRecenzija />
            <Top25 />
            <RecenzijeComponent />
            <Worse20 />
            <JsonLd data={post}/>
        </main>
    );
}
