import styles from '@/components/buttons/buttons.module.scss';

export default function Filter({clickFunction, title, label, filter, search, count, counting}) {
    return (
        <button className={`${styles.filterButton} ${filter === label && !search ? 'active' : ''}`}
            onClick={() => clickFunction(label)}
            style={{pointerEvents: search ? 'none' : 'auto', opacity: search ? .25 : 1}}>
                {title} <span>{counting}</span>
        </button>
    )
}