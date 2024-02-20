'use client'

import React from 'react'
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

export default function SocialShare({slug, reviewType, index}) {

    return (
        <div>
            <p>Share: </p>
            <FacebookShareButton
                url={ reviewType === 'single' ? `https://www.groblje-horora.com/recenzije/${slug}` : `https://www.groblje-horora.com/recenzije/${slug}?movie=${index + 1}`}
            >
                <FacebookIcon size={48} round/>
            </FacebookShareButton>

            <WhatsappShareButton
                url={ reviewType === 'single' ? `https://www.groblje-horora.com/recenzije/${slug}` : `https://www.groblje-horora.com/recenzije/${slug}?movie=${index + 1}`}
                appId={''}
            >
                <WhatsappIcon size={48} round />
            </WhatsappShareButton>

            <ViberShareButton
                url={ reviewType === 'single' ? `https://www.groblje-horora.com/recenzije/${slug}` : `https://www.groblje-horora.com/recenzije/${slug}?movie=${index + 1}`}
                appId={''}
            >
                <ViberIcon size={48} round />
            </ViberShareButton>

            <EmailShareButton
                url={ reviewType === 'single' ? `https://www.groblje-horora.com/recenzije/${slug}` : `https://www.groblje-horora.com/recenzije/${slug}?movie=${index + 1}`}
                appId={''}
            >
                <EmailIcon size={48} round />
            </EmailShareButton>
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
