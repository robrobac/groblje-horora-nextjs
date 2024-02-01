import styles from '@/components/homepageCover2/homepageCover2.module.scss';
import Image from 'next/image';
import coverImage from '../../../public/images/groblje-horora-home-page-cover.webp';
import leftTree from '../../../public/images/groblje-horora-cover-left-tree.png';
import rightTree from '../../../public/images/groblje-horora-cover-right-tree.png';



export const HomepageCover2 = () => {

    return (
        <div className={styles.coverImage}>
            <Image src={coverImage} alt='tree silhouette on the left side of the screen'/>
            <div className={styles.coverImageTrees}>
                <Image src={leftTree} alt='tree silhouette on the left side of the screen'/>
                <Image src={rightTree} alt='tree silhouette on the right side of the screen'/>
            </div>
        </div>
    )
}