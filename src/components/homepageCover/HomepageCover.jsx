import styles from '@/components/homepageCover/homepageCover.module.scss';
import Image from 'next/image';
import coverImage from '../../../public/images/groblje-horora-home-page-cover.webp';
import leftTree from '../../../public/images/groblje-horora-cover-left-tree.png';
import rightTree from '../../../public/images/groblje-horora-cover-right-tree.png';

export const HomepageCover = () => {

    return (
        <div className={styles.coverImage}>
            <Image priority={true} width={2560} height={800} src={coverImage} alt='main background, a graveyard silhouette'
                sizes="(max-width: 425px) 100%"
            />
            <div className={styles.coverImageTrees}>
                <Image priority={true} width={428} height={800} src={leftTree} alt='tree silhouette on the left side of the screen'/>
                <Image priority={true} width={428} height={800} src={rightTree} alt='tree silhouette on the right side of the screen'/>
            </div>
        </div>
    )
}