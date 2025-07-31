import { Lexend } from "next/font/google";
// Pocetni font je bio Inter
import "./globals.scss";
import Header from "../components/header/Header";
import dynamic from "next/dynamic";
import BackToTopButton from "@/components/backToTopButton/BackToTopButton";
import Script from "next/script";

const lexend = Lexend({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    return (
        <html lang="hr">
            <body suppressHydrationWarning={true} className={`${lexend.className} mainBody`}>
                <Header />
                {children}
                <BackToTopButton />
            </body>
            <Script src="https://analytics.roberto-vukomanovic.com/script.js" data-website-id="b8e49143-346b-42d4-8dac-1c228a387cc0"/>
        </html>
    );
}
