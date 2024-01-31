import styles from '@/components/header/header.module.scss';
import { NavLink } from "./NavLink";

export const Links = () => {
    const links = [
        { name: 'Naslovna', path: '/' },
        { name: 'Top 25', path: '/top25' },
        { name: 'Recenzije', path: '/recenzije' },
        { name: 'Top 20 smeća', path: '/top20smeca' },
        { name: 'O Blogu', path: '/o-blogu' },
    ];

    return (
        <div className={styles.navRoutes}>
            {links.map((link => (
                <NavLink link={link} key={link.name}/>
            )))}
        </div>
    );
}