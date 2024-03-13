'use client'

import Image from 'next/image'
import React from 'react'

export default function CoverImage() {
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const coverImage = () => {
        if (windowWidth <= 425) {
            return {
                src: '/images/425-groblje-horora-home-page-cover.webp',
                height: 200,
                width: 640,
            };
        } else if (windowWidth <= 630) {
            return {
                src: '/images/630-groblje-horora-home-page-cover.webp',
                height: 400,
                width: 1280,
            };
        } else if (windowWidth <= 768) {
            return {
                src: '/images/768-groblje-horora-home-page-cover.webp',
                height: 480,
                width: 1536,
            };
        } else if (windowWidth - 16 <= 1024) {
            return {
                src: '/images/1024-groblje-horora-home-page-cover.webp',
                height: 700,
                width: 2240,
            };
        } else if (windowWidth <= 1920) {
            return {
                src: '/images/1920-groblje-horora-home-page-cover.jpg',
                height: 800,
                width: 2560,
            };
        }
    }

  return (
    <Image priority={true} width={coverImage().width} height={coverImage().height} src={coverImage().src} alt='main background, a graveyard silhouette'/>
  )
}
