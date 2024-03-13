import styles from '@/components/homepageCover/homepageCover.module.scss';
import Image from 'next/image';
import cover from '../../../public/images/1920-groblje-horora-home-page-cover.jpg'

export const HomepageCover = () => {
    

    return (
        <div className={styles.coverImage}>
            <Image priority={true} width={2560} height={800}
                sizes='(max-width: 425px) 640w, (max-width: 630px) 1280w, (max-width: 768px) 1536w, (max-width: 1024px) 2240w, (max-width: 1920px) 2560w'
                src={'/images/1920-groblje-horora-home-page-cover.jpg'} alt='main background, a graveyard silhouette'/>
            {/* <Image priority={true} src={cover} alt='main background, a graveyard silhouette'/> */}
            <div className={styles.coverImageTrees}>
                <Image className={styles.leftTree} priority={true} width={428} height={800} src={'/images/groblje-horora-cover-left-tree.svg'} alt='tree silhouette on the left side of the screen'/>
                <Image className={styles.rightTree} priority={true} width={428} height={800} src={'/images/groblje-horora-cover-left-tree.svg'} alt='tree silhouette on the right side of the screen'/>
            </div>
        </div>
    )
}