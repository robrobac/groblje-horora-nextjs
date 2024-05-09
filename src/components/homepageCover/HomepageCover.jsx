
import styles from '@/components/homepageCover/homepageCover.module.scss';
import Image from 'next/image';
import graves from '../../../public/images/groblje-horora-graves.svg'

import { Creepster } from "next/font/google";
import { headers } from 'next/headers';
import { UAParser } from 'ua-parser-js';

const creepster = Creepster({ subsets: ["latin"], weight: '400' });



export const HomepageCover = async () => {
    const headersList = headers().get('user-agent')
    let parser = new UAParser(headersList);
    let parserResults = parser.getResult();
    console.log(parserResults.device.type);

    // Dynamically import the appropriate cover image based on device type
    let coverModule;
    if (parserResults.device.type === "mobile") {
        coverModule = await import('../../../public/images/425-groblje-horora-home-page-cover.webp');
    } else if (parserResults.device.type === "tablet") {
        coverModule = await import('../../../public/images/1440-groblje-horora-home-page-cover.webp');
    } else {
        coverModule = await import('../../../public/images/1920-groblje-horora-home-page-cover.webp');
    }
    const coverImage = coverModule.default;

    return (
        <>
            <div className={styles.coverImage}>
                <Image className={styles.coverImageGraves} src={graves} alt='graves' style={{position: "absolute"}}/>
                <Image priority={true} src={coverImage} alt='main background, a graveyard silhouette'/>
                <div className={styles.coverImageTrees}>
                    <Image className={styles.leftTree} width={428} height={800} src={'/images/groblje-horora-cover-left-tree.svg'} alt='tree silhouette on the left side of the screen'/>
                    <div className={styles.coverTitleDesktopWrap}>
                        <h1 className={`${creepster.className} ${styles.coverTitleDesktop}`}>Groblje Horora</h1>
                        <h2 className={styles.coverSubtitleDesktop}>Recenzije Horor Filmova i Serija</h2>
                    </div>
                    <Image className={styles.rightTree} width={428} height={800} src={'/images/groblje-horora-cover-left-tree.svg'} alt='tree silhouette on the right side of the screen'/>
                </div>
            </div>
        </>
    )
}