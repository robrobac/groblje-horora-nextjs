'use client'
import { Links } from "./links/Links";
import styles from '@/components/header/header.module.scss';
import { Logo } from "./svg/Logo";
import Link from "next/link";
import { XIcon } from "./svg/XIcon";
import { HambIcon } from "./svg/HambIcon";
import { Suspense, useEffect, useState } from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { handleLastVisitedURL } from "@/lib/utils";
import HeaderAuth from "./headerAuth/HeaderAuth";


export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const currentPath = usePathname();
    useEffect(() => {
        setIsMenuOpen(false);
    }, [currentPath])

    return (
        <header className={styles.header}>
            <div className={styles.headerWrap}>
                <div className={styles.navLogo}>
                    <Link href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}`} aria-label="Idi na Groblje Horora Naslovnu">
                        <Logo/>
                    </Link>
                </div>
                <div className={`${styles.mainNav} ${isMenuOpen && styles.isOpen}`}>
                    <Links />
                    <Suspense>
                        <HeaderAuth />
                    </Suspense>
                </div>
                <div className={`${styles.menuIcon} ${isMenuOpen && styles.isOpen}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? (
                        <XIcon/>
                    ) : (
                        <HambIcon />
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header;