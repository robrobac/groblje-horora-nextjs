import styles from '@/components/buttons/buttons.module.scss';
import Link from "next/link"
import GhostSpinner from '../ghostSpinner/GhostSpinner';

// In case you want to use a standard button with clickEvent instead of linking to a path, pass clickEvent and don't pass path.
export const LoadingBtn = ({ content, loading, size, span}) => {

    return (
        <button className={`${styles.button} ${styles.loadingButton}`} style={{width: '150px'}}>
            {loading ? <GhostSpinner size={size}/> : content}
        </button>
    )
}
