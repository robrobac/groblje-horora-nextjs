import styles from '@/components/buttons/buttons.module.scss';
import Link from "next/link"
import GhostSpinner from '../ghostSpinner/GhostSpinner';

// In case you want to use a standard button with clickEvent instead of linking to a path, pass clickEvent and don't pass path.
export const LoadingBtn = ({ content, loading, size, width, span, type, label, htmlFor, onClick}) => {

    if (label) {
        return (
            <label className={`${styles.button} ${styles.loadingButton}`} style={{width: width || '150px'}} htmlFor={htmlFor}>
                {loading ? <GhostSpinner size={size}/> : content}
            </label>
        )
    }

    if (onClick) {
        return (
            <button onClick={onClick} className={`${styles.button} ${styles.loadingButton}`} style={{width: width || '150px'}} type={type}>
                {loading ? <GhostSpinner size={size}/> : content}
            </button>
        )
    }

    return (
        <button className={`${styles.button} ${styles.loadingButton}`} style={{width: width || '150px'}} type={type}>
            {loading ? <GhostSpinner size={size}/> : content}
        </button>
    )
}

