'use client'

import React, { useState } from 'react'
import styles from './socialShare.module.scss'
import copyLinkIcon from '../../../../public/images/copyLinkIcon.png';
import {
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
    ViberShareButton,
    ViberIcon,
  } from 'next-share'
import CopyToClipboard from 'react-copy-to-clipboard';
import Image from 'next/image';

export default function SocialShare({slug, reviewType, index, title, additionalPadding}) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, '1000')
    }

    return (
        <div className={`${styles.socialShareSection} ${additionalPadding && styles.additionalPadding}`}>
            <p>Podijeli <span>{`"${title}"`}</span></p>
            <div className={styles.socialShareIcons}>
                <FacebookShareButton
                    url={ reviewType === 'single' ? `https://www.groblje-horora.com/recenzije/${slug}` : `https://www.groblje-horora.com/recenzije/${slug}?movie=${index + 1}`}
                >
                    <FacebookIcon size={36} round/>
                </FacebookShareButton>

                <WhatsappShareButton
                    url={ reviewType === 'single' ? `https://www.groblje-horora.com/recenzije/${slug}` : `https://www.groblje-horora.com/recenzije/${slug}?movie=${index + 1}`}
                    appId={''}
                >
                    <WhatsappIcon size={36} round />
                </WhatsappShareButton>

                <ViberShareButton
                    url={ reviewType === 'single' ? `https://www.groblje-horora.com/recenzije/${slug}` : `https://www.groblje-horora.com/recenzije/${slug}?movie=${index + 1}`}
                    appId={''}
                >
                    <ViberIcon size={36} round />
                </ViberShareButton>
                <CopyToClipboard text={reviewType === 'single' ? `https://www.groblje-horora.com/recenzije/${slug}` : `https://www.groblje-horora.com/recenzije/${slug}?movie=${index + 1}`} onCopy={handleCopy}>
                    <div className={styles.copyLinkButton}>
                        <Image width={36} height={36} src={copyLinkIcon.src} alt="copy link icon" />
                    </div>
                </CopyToClipboard>
                {copied && (
                    <div className={styles.copied}>
                        <span>Link kopiran</span>
                    </div>
                )}
            </div>
        </div>
    )
}
