import styles from './tagDisplay.module.scss'
import Link from 'next/link';

export default function TagDisplay(tags) {
  console.log(tags)

  return (
    <div className={styles.tagDisplaySection}>
        <p>Tagovi:</p>
        <div className={styles.tags}>
            {tags.tags.map(tag => <Link href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/tags/${tag.tagValue}`} target='_blank' key={tag.tagValue} className={`${styles.tag} ${styles.selected}`}>{tag.tagLabel}</Link>)}
        </div>
        
    </div>
  )
}
