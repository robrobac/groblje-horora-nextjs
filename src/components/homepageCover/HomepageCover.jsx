import styles from '@/components/homepageCover/homepageCover.module.scss';
import Image from 'next/image';
import cover from '../../../public/images/1920-groblje-horora-home-page-cover.jpg'

import { Creepster } from "next/font/google";

const creepster = Creepster({ subsets: ["latin"], weight: '400' });

export const HomepageCover = () => {
    return (
        <>
        <div className={styles.coverImage}>
            <Image priority={true} src={cover} alt='main background, a graveyard silhouette'/>
            <div className={styles.coverImageTrees}>
                <Image className={styles.leftTree} priority={true} width={428} height={800} src={'/images/groblje-horora-cover-left-tree.svg'} alt='tree silhouette on the left side of the screen'/>
                <h1 className={`${creepster.className} ${styles.coverTitleDesktop}`}>Groblje Horora</h1>
                <Image className={styles.rightTree} priority={true} width={428} height={800} src={'/images/groblje-horora-cover-left-tree.svg'} alt='tree silhouette on the right side of the screen'/>
            </div>
            
        </div>
        <h1 className={`${creepster.className} ${styles.coverTitleMobile}`}>Groblje Horora</h1>
        </>
    )
}