'use client'

import GhostSpinner from '@/components/ghostSpinner/GhostSpinner';
import styles from './scrollToSection.module.scss'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function ScrollToSection() {
    const [loading, setLoading] = useState(true)
    const searchParams = useSearchParams();
    const movieParam = searchParams.get('movie')

    useEffect(() => {
        setLoading(true)
        if (movieParam) {
            const scrollTarget = document.getElementById(`movie${movieParam}`)
            if (scrollTarget) {
                scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })
                window.scrollBy(0, -100); // Adjust the offset value as needed
            }
        }
        console.log("scrolled")
        setLoading(false)
    })

    if (loading) {
        return (
            <div className={styles.scrollToSectionLoader}>
                <GhostSpinner size={50}/>
            </div>
        )
    } else return null
}
