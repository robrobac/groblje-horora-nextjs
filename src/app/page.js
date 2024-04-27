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
        "@context": "https://schema.org/",
        "@type": "Review",
        "itemReviewed": {
          "@type": "Restaurant",
          "image": "https://www.example.com/seafood-restaurant.jpg",
          "name": "Legal Seafood",
          "servesCuisine": "Seafood",
          "priceRange": "$$$",
          "telephone": "1234567",
          "address" :{
            "@type": "PostalAddress",
            "streetAddress": "123 William St",
            "addressLocality": "New York",
            "addressRegion": "NY",
            "postalCode": "10038",
            "addressCountry": "US"
          }
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "4"
        },
        "author": {
          "@type": "Person",
          "name": "Bob Smith"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Washington Times"
        }
      }
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
