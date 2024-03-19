import { HomepageCover } from "@/components/homepageCover/HomepageCover";
import { Introduction } from "@/components/introduction/Introduction";
import { LatestPregled } from "@/components/latest/LatestPregled";
import { LatestRecenzija } from "@/components/latest/LatestRecenzija";
import { RecenzijeComponent } from "@/components/recenzijeComponent/RecenzijeComponent";
import Top25 from "@/components/topComponents/Top25";
import Worse20 from "@/components/topComponents/Worse20";

export const dynamic = 'force-dynamic';

export default function Naslovna() {

    const jsonLd = {
        "@context": "http://schema.org",
        "@type": "WebPage",
        image: {
            "@type": "ImageObject",
            url: "https://firebasestorage.googleapis.com/v0/b/groblje-horora-89186.appspot.com/o/groblje-horora-og-image.webp?alt=media&token=9505221c-7713-4907-8a95-78047f2cd1b7"
        }
    }

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <HomepageCover />
            <Introduction />
            <LatestPregled />
            <LatestRecenzija />
            <Top25 />
            <RecenzijeComponent />
            <Worse20 />
        </main>
    );
}
