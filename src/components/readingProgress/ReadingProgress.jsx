'use client'

import styles from './readingProgress.module.scss'
import { useReadingProgress } from '@/hooks/useReadingProgress';
import React from 'react'

export default function ReadingProgress() {
    const completion = useReadingProgress();
    // console.log(completion)

    if (completion > 0) {
        return (
            <div className={styles.readingProgressContainer}>
                <div className={styles.progress} style={{width: `${completion}%`}}></div>
            </div>
        )
    }
    
}
