
import styles from '@/components/homepageCover/homepageCover.module.scss';
import Image from 'next/image';
import cover from '../../../public/images/1920-groblje-horora-home-page-cover.jpg'
import cover2 from '../../../public/images/500-groblje-horora-home-page-cover.jpg'

import { Creepster } from "next/font/google";
import { headers } from 'next/headers';
import { UAParser } from 'ua-parser-js';

const creepster = Creepster({ subsets: ["latin"], weight: '400' });



export const HomepageCover = async () => {
    const headersList = headers().get('user-agent')
    let parser = new UAParser(headersList);
    let parserResults = parser.getResult();
    console.log(parserResults);
    return (
        <>
        <div className={styles.coverImage}>
            <Image priority={true} src={parserResults.device.type == "mobile" ? cover2 : cover} alt='main background, a graveyard silhouette'/>
            <div className={styles.coverImageTrees}>
                <Image className={styles.leftTree} priority={true} width={428} height={800} src={'/images/groblje-horora-cover-left-tree.svg'} alt='tree silhouette on the left side of the screen'/>
                <div className={styles.coverTitleDesktopWrap}>
                    <h1 className={`${creepster.className} ${styles.coverTitleDesktop}`}>Groblje Horora</h1>
                    <h2 className={styles.coverSubtitleDesktop}>Recenzije Horor Filmova i Serija</h2>
                </div>
                
                <Image className={styles.rightTree} priority={true} width={428} height={800} src={'/images/groblje-horora-cover-left-tree.svg'} alt='tree silhouette on the right side of the screen'/>
            </div>
        </div>
            
        </>
    )
}