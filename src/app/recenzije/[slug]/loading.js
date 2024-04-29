import styles from '@/app/loading.module.scss'
import GhostSpinner from "@/components/ghostSpinner/GhostSpinner";

export default function Loading() {
    return <div className={styles.rootLoadingContainer}><GhostSpinner size={50} /></div>
}