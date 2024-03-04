'use client'
import styles from './tagDisplay.module.scss'

export default function TagDisplay(tags) {
    console.log(tags.tags)
  return (
    <div className={styles.tagDisplaySection}>
        <p>Oznake:</p>
        <div className={styles.tags}>
            {tags.tags.map(tag => <p key={tag.tagValue} className={`${styles.tag} ${styles.selected}`}>{tag.tagLabel}</p>)}
        </div>
        
    </div>
  )
}
