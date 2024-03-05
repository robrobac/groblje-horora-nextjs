'use client'

import React, { useState } from 'react'
import styles from './socialShare.module.scss'
import copyLinkIcon from '../../../../public/images/copyLinkIcon.png';
import {
    FacebookShareButton,
    FacebookIcon,
    EmailShareButton,
    EmailIcon,
    WhatsappShareButton,
    WhatsappIcon,
    ViberShareButton,
    ViberIcon,
  } from 'next-share'
import CopyToClipboard from 'react-copy-to-clipboard';

export default function SocialShare({slug, reviewType, index}) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, '1000')
    }

    return (
        <div className={styles.socialShareSection}>
            <p>Share: </p>
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
                        <img src={copyLinkIcon.src} alt="copy link icon" />
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

    // return (
    //     <div>
    //         {reviewType === 'single' && (
    //             <FacebookShareButton
    //                 url={`https://groblje-horora-nextjs.vercel.app/recenzije/${slug}`}
    //                 quote={'next-share is a social share buttons for your next React apps.'}
    //                 hashtag={'#nextshare'}
    //             >
    //             <FacebookIcon size={32} round/>
    //             </FacebookShareButton>
    //         )}
    //         {reviewType === 'quad' && (
    //             <>
    //                 <FacebookShareButton
    //                     url={`https://groblje-horora-nextjs.vercel.app/recenzije/${slug}?movie=${index + 1}`}
    //                     quote={'next-share is a social share buttons for your next React apps.'}
    //                     hashtag={'#nextshare'}
    //                 >
    //                     <FacebookIcon size={32} round/>
    //                 </FacebookShareButton>
    //                 <ViberShareButton
    //                     url={`https://groblje-horora-nextjs.vercel.app/recenzije/${slug}?movie=${index + 1}`}
    //                     title={'next-share is a social share buttons for your next React apps.'}
    //                 >
    //                     <ViberIcon size={32} round />
    //                 </ViberShareButton>
    //             </>
    //         )}
    //     </div>
    // )
}
