import React from 'react'
import styles from '@/components/buttons/buttons.module.scss';
import DownIcon from './svg/DownIcon'
import UpIcon from './svg/UpIcon'

export default function Sort({clickFunction, title, sortOption, sort, order, search }) {
    return (
        <button className={`${styles.filterButton} ${styles.sortButton} ${sort === sortOption && !search ? 'active' : ''}`}
            onClick={() => clickFunction(sortOption, order)}
            style={{pointerEvents: search ? 'none' : 'auto', opacity: search ? .25 : 1}}>
                {title}
                {sort === sortOption && !search ? (order === 'desc' ? <DownIcon /> : <UpIcon />) : ''}
        </button>
    )
}
