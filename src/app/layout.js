import { Lexend } from "next/font/google";
// Pocetni font je bio Inter
import "./globals.css";
import Header from "../components/header/Header";
import Footer from "../components/footer/footer";
import BackToTopButton from "@/components/backToTopButton/BackToTopButton";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import Head from "next/head";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata = {
    title: {
        default: "Groblje Horora - Recenzije Horor Filmova",
        template: "%s | Groblje Horora",
    },
    description: 'Blog "Groblje horrora" napravljen je negdje u lipnju 2007. godine, a njegova namjena je prikaz dnevnika autora koji kako pogleda neki horror, tako baci omanji osvrt ili recenziju na određeni film. Moje ime je Bruno Koić i po struci sam magistar medijske kulture i kulturologije. Nadam se da će ti se svidjeti koncept onoga što radim i tebi prikazujem, hvala ti na posjeti!',
    openGraph: {
        title: {
            default: "Groblje Horora - Recenzije Horor Filmova",
            template: "%s | Groblje Horora",
        },
        description: 'Blog "Groblje horrora" napravljen je negdje u lipnju 2007. godine, a njegova namjena je prikaz dnevnika autora koji kako pogleda neki horror, tako baci omanji osvrt ili recenziju na određeni film. Moje ime je Bruno Koić i po struci sam magistar medijske kulture i kulturologije. Nadam se da će ti se svidjeti koncept onoga što radim i tebi prikazujem, hvala ti na posjeti!',
        images: 'https://firebasestorage.googleapis.com/v0/b/groblje-horora-89186.appspot.com/o/groblje-horora-og-image.webp?alt=media&token=9505221c-7713-4907-8a95-78047f2cd1b7',
    },
    alternates: {
        canonical: 'https://www.groblje-horora.com'
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="hr">
            <body suppressHydrationWarning={true} className={lexend.className}>
                <SpeedInsights />
                <Analytics />

                <Header />
                {children}
                <Footer />
                <BackToTopButton />
            </body>
        </html>
    );
}
