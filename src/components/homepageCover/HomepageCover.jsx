import styles from '@/components/homepageCover/homepageCover.module.scss';
import Image from 'next/image';

export const HomepageCover = () => {

    return (
        <div className={styles.coverImage} style={{backgroundImage: 'url(/images/groblje-horora-home-page-cover.webp)'}}>
            <div className={styles.coverImageTrees}>
                <img src='/images/groblje-horora-cover-left-tree.png' alt='tree silhouette on the left side of the screen'/>
                <img src='/images/groblje-horora-cover-right-tree.png' alt='tree silhouette on the right side of the screen'/>
            </div>
        </div>
    )
}