import React from 'react'
import styles from '@/components/ghostSpinner/ghostSpinner.module.scss';
import GhostSpinnerIcon from './svg/GhostSpinnerIcon';


export default function GhostSpinner({size}) {
    return (
        <div className={styles.spinnerContainer} style={{width: size || '50px', height: size || '50px'}}>
            <GhostSpinnerIcon />
        </div>
    )
}
