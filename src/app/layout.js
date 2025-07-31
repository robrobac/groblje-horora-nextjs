import { Lexend } from "next/font/google";
// Pocetni font je bio Inter
import "./globals.scss";
import Header from "../components/header/Header";
import dynamic from "next/dynamic";
import BackToTopButton from "@/components/backToTopButton/BackToTopButton";

const lexend = Lexend({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    return (
        <html lang="hr">
            <body suppressHydrationWarning={true} className={`${lexend.className} mainBody`}>
                <Header />
                {children}
                <BackToTopButton />
            </body>
        </html>
    );
}
