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


    const session = false;
    const isAdmin = false;
    return (
        <>
        <header className={styles.header}>
            <div className={styles.headerWrap}>
                <div className={styles.navLogo}>
                    <Link href={'/'} >
                        <Logo />
                    </Link>
                </div>
                <nav className={`${styles.mainNav} ${isMenuOpen && styles.isOpen}`}>
                    <Links />
                    {session ? (
                        <p className={styles.navAuth}>
                            Robac
                            <button className={styles.authButton}>
                                Odjavi se
                            </button>
                        </p>
                    ) : (
                        <Suspense>
                            <HeaderAuth />
                        </Suspense>
                    )}
                </nav>
                <div className={`${styles.menuIcon} ${isMenuOpen && styles.isOpen}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? (
                        <XIcon/>
                    ) : (
                        <HambIcon />
                    )}
                </div>
            </div>
        </header>
        </>
    )
}

export default Header;