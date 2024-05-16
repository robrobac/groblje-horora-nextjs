import styles from '@/components/header/header.module.scss';
import { NavLink } from "./NavLink";

export const Links = () => {
    const links = [
        { name: 'Naslovna', path: `${process.env.NEXT_PUBLIC_DOMAIN_URL}`, activeLink: '/', prefetch: false },
        { name: 'Top 25', path: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/top25`, activeLink: '', prefetch: false },
        { name: 'Recenzije', path: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/recenzije`, activeLink: '/recenzije', prefetch: false },
        { name: 'Top 20 smeća', path: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/top20smeca`, activeLink: '/top20smeca', prefetch: false },
        { name: 'O Blogu', path: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/o-blogu`, activeLink: '/o-blogu', prefetch: false },
        { name: 'Oznake', path: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/tags`, activeLink: '/tags', prefetch: true },
    ];

    return (
        <nav className={styles.navRoutes}>
            {links.map((link => (
                <NavLink link={link} key={link.name}/>
            )))}
        </nav>
    );
}