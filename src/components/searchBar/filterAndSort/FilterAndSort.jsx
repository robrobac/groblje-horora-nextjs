import React, { useEffect, useRef, useState } from 'react'
import buttonStyles from '@/components/buttons/buttons.module.scss'
import SortAndFilterIcon from '@/components/svgComponents/SortAndFilterIcon'
import styles from './filterAndSort.module.scss'
import Filter from '../Filter'
import { SORT_OPTIONS } from '@/lib/sortOptions'
import Sort from '../Sort'

export default function FilterAndSort({handleFilter, filter, search, count, handleSortAndOrder, sort, order}) {
    const [optionsOpen, setOptionsOpen] = useState(false)
    const filterAndSortControlsRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (optionsOpen) {
                if (filterAndSortControlsRef.current && !filterAndSortControlsRef.current.contains(event.target)) {
                    setOptionsOpen(false);
                }
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [optionsOpen]);

    return (
        <div className={styles.filterAndSortContainer}>
            <button className={`${buttonStyles.button} ${buttonStyles.sortAndFilterButton} ${optionsOpen && buttonStyles.active}`} onClick={(e) => setOptionsOpen(!optionsOpen)}>
                Filtriranje i Sortiranje
                <SortAndFilterIcon />
            </button>
            {optionsOpen && (
                <div className={styles.filterAndSortControls} ref={filterAndSortControlsRef}>
                    <div className={styles.filterOptions}>
                        <p>Filtriraj</p>
                        <Filter clickFunction={handleFilter} title='Sve' label='' filter={filter} search={search} count={count} counting={count?.numberOfReviews}/>
                        <Filter clickFunction={handleFilter} title='Kratki Pregledi' label='quad' filter={filter} search={search} count={count} counting={count?.quadReviews}/>
                        <Filter clickFunction={handleFilter} title='Recenzije' label='single' filter={filter} search={search} count={count} counting={count?.singleReviews}/>
                    </div>
                    
                    <div className={styles.sortOptions}>
                        <p>Sortiraj</p>
                        <Sort clickFunction={handleSortAndOrder} title='Datum' sortOption={SORT_OPTIONS.CREATED} sort={sort} order={order} search={search}/>
                        <Sort clickFunction={handleSortAndOrder} title='Ocjena' sortOption={SORT_OPTIONS.RATING} sort={sort} order={order} search={search}/>
                        <Sort clickFunction={handleSortAndOrder} title='Naslov' sortOption={SORT_OPTIONS.TITLE} sort={sort} order={order} search={search}/>
                        
                        
                    </div>
                </div>
            )}
        </div>
    )
}
