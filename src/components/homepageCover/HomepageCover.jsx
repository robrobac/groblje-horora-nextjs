'use client'

import styles from '@/components/homepageCover/homepageCover.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const HomepageCover = () => {

    const [windowWidth, setWindowWidth] = useState(0);
    console.log(windowWidth)

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Initial call to set window width
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={styles.coverImage}>
            {windowWidth > 768 ? (
                <Image loading='eager' priority={true} width={2560} height={800} src={'/images/groblje-horora-home-page-cover.webp'} alt='main background, a graveyard silhouette'/>
            ) : (
                <Image loading='eager' priority={true} width={2560} height={800} src={'/images/middle-groblje-horora-home-page-cover.webp'} alt='main background, a graveyard silhouette'/>
            )}
            <div className={styles.coverImageTrees}>
                <Image loading='eager' className={styles.leftTree} priority={true} width={428} height={800} src={'/images/groblje-horora-cover-left-tree.svg'} alt='tree silhouette on the left side of the screen'/>
                <Image loading='eager' className={styles.rightTree} priority={true} width={428} height={800} src={'/images/groblje-horora-cover-left-tree.svg'} alt='tree silhouette on the right side of the screen'/>
            </div>
        </div>
    )
}