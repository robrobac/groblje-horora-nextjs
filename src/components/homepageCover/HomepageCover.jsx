'use server'

import styles from '@/components/homepageCover/homepageCover.module.scss';
import Image from 'next/image';
// import coverImage from '../../../public/images/groblje-horora-home-page-cover.webp'
import coverImage2 from '../../../public/images/test.jpg'

export const HomepageCover = () => {

    return (
        <div className={styles.coverImage}>
            <Image priority={true} src={coverImage2} alt='main background, a graveyard silhouette'
                
            />
            <div className={styles.coverImageTrees}>
                <Image className={styles.leftTree} priority={true} width={428} height={800} src={'/images/groblje-horora-cover-left-tree.svg'} alt='tree silhouette on the left side of the screen'/>
                <Image className={styles.rightTree} priority={true} width={428} height={800} src={'/images/groblje-horora-cover-left-tree.svg'} alt='tree silhouette on the right side of the screen'/>
            </div>
        </div>
    )
}