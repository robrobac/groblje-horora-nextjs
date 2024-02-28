'use server'

import styles from '@/components/homepageCover/homepageCover.module.scss';
import Image from 'next/image';

export const HomepageCover = () => {

    return (
        <div className={styles.coverImage}>
            <Image priority={true} width={2560} height={800} src={'/images/groblje-horora-home-page-cover.webp'} alt='main background, a graveyard silhouette'
                sizes="(max-width: 425px) 100vw"
            />
            <div className={styles.coverImageTrees}>
                <Image className={styles.leftTree} priority={true} width={428} height={800} src={'/images/groblje-horora-cover-left-tree.svg'} alt='tree silhouette on the left side of the screen'/>
                <Image className={styles.rightTree} priority={true} width={428} height={800} src={'/images/groblje-horora-cover-left-tree.svg'} alt='tree silhouette on the right side of the screen'/>
            </div>
        </div>
    )
}