"use client"

import Link from "next/link";
import styles from '@/components/header/header.module.scss';
import { usePathname } from "next/navigation";

export const NavLink = ({link}) => {
    
    const currentPath = usePathname();

    return (
            <Link
            href={link.path}
            className={`${styles.navLink} ${currentPath === link.path && styles.active}`}
            >
                {link.name}
            </Link>
    );
}