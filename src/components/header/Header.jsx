"use client"
import { Links } from "./links/Links";
import styles from '@/components/header/header.module.scss';
import { Logo } from "./svg/Logo";
import Link from "next/link";
import { XIcon } from "./svg/XIcon";
import { HambIcon } from "./svg/HambIcon";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { handleLastVisitedURL } from "@/lib/utils";


export const Header = () => {
    const currentPath = usePathname();
    const searchParams = useSearchParams();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                        <p className={styles.navAuth}>
                            Imaš komentar?
                            <Link href='/prijava' className={styles.authButton} onClick={(e) => handleLastVisitedURL(currentPath, searchParams)}>
                                Prijavi se
                            </Link>
                        </p>
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