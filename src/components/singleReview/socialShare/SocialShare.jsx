'use client'

import React, { useState } from 'react'
import styles from './socialShare.module.scss'
import copyLinkIcon from '../../../../public/images/copyLinkIcon.png';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const FacebookShareButton = dynamic(() => import('next-share').then(mod => mod.FacebookShareButton));
const FacebookIcon = dynamic(() => import('next-share').then(mod => mod.FacebookIcon));
const WhatsappShareButton = dynamic(() => import('next-share').then(mod => mod.WhatsappShareButton));
const WhatsappIcon = dynamic(() => import('next-share').then(mod => mod.WhatsappIcon));
const ViberShareButton = dynamic(() => import('next-share').then(mod => mod.ViberShareButton));
const ViberIcon = dynamic(() => import('next-share').then(mod => mod.ViberIcon));

const CopyToClipboard = dynamic(() => import("react-copy-to-clipboard"), { ssr: false })

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
