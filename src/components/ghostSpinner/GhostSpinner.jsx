import React from 'react'
import styles from '@/components/ghostSpinner/ghostSpinner.module.scss';
import GhostSpinnerIcon from './svg/GhostSpinnerIcon';


export default function GhostSpinner() {
    return (
        <div className={styles.spinnerContainer} style={{width: '50px', height: '50px'}}>
            <GhostSpinnerIcon />
        </div>
    )
}
