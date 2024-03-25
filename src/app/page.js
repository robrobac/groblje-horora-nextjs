import { HomepageCover } from "@/components/homepageCover/HomepageCover";
import { Introduction } from "@/components/introduction/Introduction";
import { LatestPregled } from "@/components/latest/LatestPregled";
import { LatestRecenzija } from "@/components/latest/LatestRecenzija";
import { RecenzijeComponent } from "@/components/recenzijeComponent/RecenzijeComponent";
import Top25 from "@/components/topComponents/Top25";
import Worse20 from "@/components/topComponents/Worse20";
import Script from "next/script";

export const dynamic = 'force-dynamic';



export default function Naslovna() {
    return (
        <main>
            
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
