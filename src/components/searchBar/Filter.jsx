import styles from '@/components/buttons/buttons.module.scss';

export default function Filter({clickFunction, title, filterKey, filterValue, selectedFilterKey, selectedFilterVal, search, count, loading}) {

    return (
        <button className={`${styles.filterButton} ${filterValue === selectedFilterVal && !search ? styles.active : ''}`}
            onClick={() => clickFunction(filterKey, filterValue)}
            style={{pointerEvents: search ? 'none' : 'auto', opacity: search ? .25 : 1}}>
                {title} <span>{!loading && count}</span>
        </button>
    )
}