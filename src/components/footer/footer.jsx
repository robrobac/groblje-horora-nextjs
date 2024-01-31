import Link from "next/link";
import styles from '@/components/footer/footer.module.scss';
import { getYear } from 'date-fns'

const Footer = () => {
    return (
        <footer className={styles.footerContainer}>
            <p className={styles.copyright}>
                Copyright © 2023. - {getYear(new Date())}.
                <br></br>
                <Link target='_blank' href={'https://www.behance.net/robertov'}>Roberto Vukomanović</Link> & <Link target='_blank' href={'https://www.behance.net/tenavuksani'}> Tena Vuksanić </Link>
                <br></br>
                Sva prava pridržana
            </p>
        </footer>
    )
}

export default Footer;