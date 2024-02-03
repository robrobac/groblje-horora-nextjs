import { HomepageCover } from "@/components/homepageCover/HomepageCover";
import { Introduction } from "@/components/introduction/Introduction";
import { LatestPregled } from "@/components/latest/LatestPregled";
import { LatestRecenzija } from "@/components/latest/LatestRecenzija";

export const dynamic = 'force-dynamic';

export default function Naslovna() {
    return (
        <main>
            <HomepageCover />
            <Introduction />
            <LatestPregled />
            <LatestRecenzija />
        </main>
    );
}
