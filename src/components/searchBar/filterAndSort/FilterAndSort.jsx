import React, { useContext, useEffect, useRef, useState } from 'react'
import buttonStyles from '@/components/buttons/buttons.module.scss'
import SortAndFilterIcon from '@/components/svgComponents/SortAndFilterIcon'
import styles from './filterAndSort.module.scss'
import Filter from '../Filter'
import { FILTERING_OPTIONS, SORTING_OPTIONS } from '@/lib/sortOptions'
import Sort from '../Sort'
import { ReviewsGalleryContext } from '@/components/reviewsGallery/ReviewsGallery'

export default function FilterAndSort() {
    const filterAndSortControlsRef = useRef(null);
    const [optionsOpen, setOptionsOpen] = useState(false)

    const handleOpenOptions = () => {
        setOptionsOpen(!optionsOpen);
    }

    const {
        search,
        handleFilter,
        selectedFilterKey,
        selectedFilterVal,
        handleSortAndOrder,
        sort,
        order,
        totalItems,
        loading,
    } = useContext(ReviewsGalleryContext)


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
            <button
                className={`${buttonStyles.button} ${buttonStyles.sortAndFilterButton} ${optionsOpen && buttonStyles.active}`}
                onClick={handleOpenOptions}
                style={{pointerEvents: search ? 'none' : 'auto', opacity: search ? .25 : 1}}
            >
                Filtriranje i Sortiranje
                <SortAndFilterIcon />
            </button>
            {optionsOpen && (
                <div className={styles.filterAndSortControls} ref={filterAndSortControlsRef}>
                    <div className={styles.filterOptions}>
                        <p>Filtriraj</p>
                        <Filter clickFunction={handleFilter} title='Sve' filterValue='' filterKey='' selectedFilterKey={selectedFilterKey} selectedFilterVal={selectedFilterVal} search={search} count={totalItems} loading={loading}/>
                        {Object.keys(FILTERING_OPTIONS).map(optionKey => {
                            const option = FILTERING_OPTIONS[optionKey];
                            return (
                                <React.Fragment key={option.dbValue}>
                                    {option.categories && Object.keys(option.categories).map(categoryKey => {
                                        const category = option.categories[categoryKey];
                                        return (
                                            <Filter key={category.dbValue} clickFunction={handleFilter} title={category.label} filterValue={category.dbValue} filterKey={category.dbKey} selectedFilterKey={selectedFilterKey} selectedFilterVal={selectedFilterVal} search={search} count={totalItems} loading={loading}/>
                                        );
                                    })}
                                </React.Fragment>
                            );
                        })}
                    </div>
                    
                    <div className={styles.sortOptions}>
                        <p>Sortiraj</p>
                        {Object.keys(SORTING_OPTIONS).map(option => (
                            <Sort
                                key={SORTING_OPTIONS[option].dbKey}
                                title={SORTING_OPTIONS[option].label}
                                sortOption={SORTING_OPTIONS[option].dbKey}
                                search={search}
                                clickFunction={handleSortAndOrder}
                                sort={sort}
                                order={order}
                                />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
