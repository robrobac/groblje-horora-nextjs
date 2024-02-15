'use client'

import React, { useState, useEffect } from 'react'

import styles from './backToTopButton.module.scss'
import UpIcon from '../svgComponents/UpIcon'
import { scrollToTop } from '@/lib/utils'


export default function BackToTopButton() {
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 1000) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <>
            {showButton && (
                <button className={styles.styledBackToTopButton} onClick={scrollToTop}>
                    <UpIcon />
                </button>
            )}
        </>
    )
}
