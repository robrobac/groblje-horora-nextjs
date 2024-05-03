import Link from "next/link";
import styles from '@/components/footer/footer.module.scss';
import { getYear } from 'date-fns';
import { Logo } from "../header/svg/Logo";

const links = [
    { name: 'Naslovna', path: '/', activeLink: '/', prefetch: false },
    { name: 'Top 25', path: '/top25', activeLink: '/top25', prefetch: false },
    { name: 'Recenzije', path: '/recenzije', activeLink: '/recenzije', prefetch: false },
    { name: 'Top 20 smeća', path: '/top20smeca', activeLink: '/top20smeca', prefetch: false },
    { name: 'O Blogu', path: '/o-blogu', activeLink: '/o-blogu', prefetch: false },
    { name: 'Oznake', path: '/tags', activeLink: '/tags', prefetch: true },
];

export const Footer = () => {
    return (
        <footer className={styles.footerContainer}> 
            <div className={styles.footerWrap}>

                <div className={styles.footerLogoContainer}>

                    <Link href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}`} aria-label="Idi na Groblje Horora Naslovnu" >
                        <Logo />
                    </Link>
                    <p>Recenzije horor filmova i serija</p>

                </div>

                <div className={styles.footerNavContainer}>

                    <nav className={styles.footerNav}>
                        {links.map((link => (
                            <Link prefetch={link.prefetch} href={link.path} key={link.name} className={styles.footerNavLink}>{link.name}</Link>
                        )))}
                    </nav>

                    <p className={styles.copyright}>
                        Copyright © 2023. - {getYear(new Date())}.
                        <br></br>
                        <Link target='_blank' href={'https://www.behance.net/robertov'}>Roberto Vukomanović</Link> & <Link target='_blank' href={'https://www.behance.net/tenavuksani'}> Tena Vuksanić </Link>
                    </p>

                </div>

            </div>
        </footer>
    )
}

export default Footer;