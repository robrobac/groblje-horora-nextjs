import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/header/Header";
import Footer from "../components/footer/footer";
import BackToTopButton from "@/components/backToTopButton/BackToTopButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: {
        default: "Groblje Horora - Recenzije Horor Filmova",
        template: "%s | Groblje Horora",
    },
    description: "Blog ''Groblje horrora'' napravljen je negdje u lipnju 2007. godine, a njegova namjena je prikaz dnevnika autora koji kako pogleda neki horror, tako baci omanji osvrt ili recenziju na određeni film. Moje ime je Bruno Koić i po struci sam magistar medijske kulture i kulturologije. Nadam se da će ti se svidjeti koncept onoga što radim i tebi prikazujem, hvala ti na posjeti!",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <BackToTopButton />
            <body suppressHydrationWarning={true} className={inter.className}>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
