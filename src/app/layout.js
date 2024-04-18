import { Lexend } from "next/font/google";
// Pocetni font je bio Inter
import "./globals.scss";
import Header from "../components/header/Header";
import Footer from "../components/footer/footer";
import dynamic from "next/dynamic";
const BackToTopButton = dynamic(() => import("@/components/backToTopButton/BackToTopButton"), { ssr: false })
const GoogleAnalyticsComp = dynamic(() => import("@/components/googleAnalyticsComp/GoogleAnalyticsComp"), { ssr: false })

const lexend = Lexend({ subsets: ["latin"] });

// export const metadata = {
//     title: {
//         default: "Groblje Horora | Recenzije Horor Filmova",
//         template: "%s | Groblje Horora",
//     },
//     description: 'Blog "Groblje horrora" napravljen je negdje u lipnju 2007. godine, a njegova namjena je prikaz dnevnika autora koji kako pogleda neki horror, tako baci omanji osvrt ili recenziju na određeni film. Moje ime je Bruno Koić i po struci sam magistar medijske kulture i kulturologije. Nadam se da će ti se svidjeti koncept onoga što radim i tebi prikazujem, hvala ti na posjeti!',
//     openGraph: {
//         title: {
//             default: "Groblje Horora | Recenzije Horor Filmova",
//             template: "%s | Groblje Horora",
//         },
//         description: 'Blog "Groblje horrora" napravljen je negdje u lipnju 2007. godine, a njegova namjena je prikaz dnevnika autora koji kako pogleda neki horror, tako baci omanji osvrt ili recenziju na određeni film. Moje ime je Bruno Koić i po struci sam magistar medijske kulture i kulturologije. Nadam se da će ti se svidjeti koncept onoga što radim i tebi prikazujem, hvala ti na posjeti!',
//         images: "https://firebasestorage.googleapis.com/v0/b/groblje-horora-89186.appspot.com/o/openGraph%2Fnaslovna-open-graph-image.jpg?alt=media&token=f3353588-ef68-4322-9b07-81deece6b70d",
//     },
//     alternates: {
//         canonical: 'https://www.groblje-horora.com'
//     }
// };

export default function RootLayout({ children }) {
    return (
        <html lang="hr">
            <body suppressHydrationWarning={true} className={lexend.className}>
                <Header />
                {children}
                <Footer />
                <BackToTopButton />
                <GoogleAnalyticsComp />
            </body>
        </html>
    );
}
