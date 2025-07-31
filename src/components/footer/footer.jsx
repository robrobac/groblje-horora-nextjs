import Link from "next/link";
import styles from '@/components/footer/footer.module.scss';
import { getYear } from 'date-fns';
import { Logo } from "../header/svg/Logo";

const links = [
    { name: 'Naslovna', path: `${process.env.NEXT_PUBLIC_DOMAIN_URL}`, activeLink: '/', prefetch: false },
    { name: 'Top 25', path: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/top25`, activeLink: '', prefetch: false },
    { name: 'Recenzije', path: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/recenzije`, activeLink: '/recenzije', prefetch: false },
    { name: 'Top 20 smeća', path: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/top20smeca`, activeLink: '/top20smeca', prefetch: false },
    { name: 'O Blogu', path: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/o-blogu`, activeLink: '/o-blogu', prefetch: false },
    { name: 'Oznake', path: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/tags`, activeLink: '/tags', prefetch: true },
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

                    <p className={styles.copyright}>
                        <Link href={'/politika-privatnosti'}>Politika privatnosti</Link>
                    </p>

                </div>

            </div>
        </footer>
    )
}

export default Footer;