// import { Lexend } from "next/font/google";
// Pocetni font je bio Inter
import "./globals.scss";
import Header from "../components/header/Header";
import dynamic from "next/dynamic";
import BackToTopButton from "@/components/backToTopButton/BackToTopButton";
import Script from "next/script";
import localFont from "next/font/local";

const lexend = localFont({
    src: "../../public/Lexend-VariableFont_wght.ttf",
    variable: "--font-lexend",
});


export default function RootLayout({ children }) {
    return (
        <html lang="hr">
            <body suppressHydrationWarning={true} className={`${lexend.className} mainBody`}>
                <Header />
                {children}
                <BackToTopButton />
            </body>
            <script defer src="https://analitika.robac.site/script.js" data-website-id="c579a2ae-427a-49c9-86ff-ff20b3133e4b"></script>
            <script data-goatcounter="https://www.groblje-horora.com/count" async src="//www.groblje-horora.com/count.js"></script>
        </html>
    );
}
